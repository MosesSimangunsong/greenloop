import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';

const fixLeafletIcon = () => {
    const L = window.L;
    if (!L) return;
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
};

const markerColors = {
    green: '#0F3D2E',
    blue: '#2563eb',
    lime: '#C6F135',
    red: '#dc2626',
};

async function fetchRoute(from, to) {
    try {
        const url = `https://router.project-osrm.org/route/v1/driving/${from.longitude},${from.latitude};${to.longitude},${to.latitude}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.code === 'Ok' && data.routes?.[0]) {
            return data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        }
    } catch (e) {
        console.warn('OSRM routing error:', e);
    }
    return null;
}

export default function LiveMap({
    markers = [],
    height = '280px',
    zoom = 13,
    showRoute = false,
}) {
    const mapRef = useRef(null);
    const instanceRef = useRef(null);
    const markersRef = useRef([]);
    const routeLayerRef = useRef(null);

    useEffect(() => {
        import('leaflet').then(async (L) => {
            window.L = L.default ?? L;
            fixLeafletIcon();

            // Init map
            if (!instanceRef.current && mapRef.current) {
                const center = markers[0]
                    ? [markers[0].latitude, markers[0].longitude]
                    : [-2.5, 99.1];

                instanceRef.current = window.L.map(mapRef.current).setView(center, zoom);
                window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors',
                }).addTo(instanceRef.current);
            }

            const map = instanceRef.current;

            // Update / buat marker
            markers.forEach(({ latitude, longitude, label, color = 'blue', sublabel }, i) => {
            if (!latitude || !longitude) return;

            const bg = markerColors[color] ?? markerColors.blue;
            const textColor = color === 'lime' ? '#0F3D2E' : 'white';
            const isMain = i === 0;

            const icon = window.L.divIcon({
                html: `
                    <div style="position:relative;display:flex;flex-direction:column;align-items:center;">
                        <!-- Label bubble -->
                        <div style="
                            background:${bg};
                            color:${textColor};
                            font-size:11px;
                            font-weight:700;
                            font-family:'Plus Jakarta Sans',sans-serif;
                            padding:4px 8px;
                            border-radius:8px;
                            white-space:nowrap;
                            box-shadow:0 2px 8px rgba(0,0,0,0.25);
                            margin-bottom:4px;
                            max-width:120px;
                            overflow:hidden;
                            text-overflow:ellipsis;
                        ">${label ?? ''}</div>
                        <!-- Garis penghubung -->
                        <div style="width:2px;height:6px;background:${bg};"></div>
                        <!-- Dot -->
                        <div style="
                            width:${isMain ? 14 : 12}px;
                            height:${isMain ? 14 : 12}px;
                            border-radius:50%;
                            background:${bg};
                            border:2.5px solid white;
                            box-shadow:0 2px 6px rgba(0,0,0,0.3);
                        "></div>
                    </div>`,
                className: '',
                iconSize: [120, 48],
                iconAnchor: [60, 48],
                popupAnchor: [0, -48],
            });

            if (markersRef.current[i]) {
                markersRef.current[i].setLatLng([latitude, longitude]);
                markersRef.current[i].setIcon(icon);
            } else {
                markersRef.current[i] = window.L.marker([latitude, longitude], { icon })
                    .addTo(map);
            }
        });

            // Fit bounds kalau 2+ marker
            if (markers.length >= 2) {
                const valid = markers.filter((m) => m.latitude && m.longitude);
                if (valid.length >= 2) {
                    map.fitBounds(
                        window.L.latLngBounds(valid.map((m) => [m.latitude, m.longitude])),
                        { padding: [40, 40] },
                    );
                }
            } else if (markers[0]) {
                map.panTo([markers[0].latitude, markers[0].longitude]);
            }

            // Routing — gambar garis jalan
            if (showRoute && markers.length >= 2) {
                const from = markers.find((m) => m.color === 'blue'); // receiver
                const to = markers.find((m) => m.color === 'green');  // producer

                if (from?.latitude && to?.latitude) {
                    const routeCoords = await fetchRoute(from, to);

                    // Hapus rute lama
                    if (routeLayerRef.current) {
                        routeLayerRef.current.remove();
                        routeLayerRef.current = null;
                    }

                    if (routeCoords) {
                        routeLayerRef.current = window.L.polyline(routeCoords, {
                            color: '#2563eb',
                            weight: 4,
                            opacity: 0.75,
                            dashArray: null,
                        }).addTo(map);
                    }
                }
            }
        });

        return () => {
            if (instanceRef.current) {
                instanceRef.current.remove();
                instanceRef.current = null;
                markersRef.current = [];
                routeLayerRef.current = null;
            }
        };
    }, [markers, showRoute]);

    return (
        <div ref={mapRef} style={{ height, width: '100%', borderRadius: '12px', zIndex: 0 }} />
    );
}
