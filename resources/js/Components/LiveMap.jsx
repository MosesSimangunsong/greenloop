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

export default function LiveMap({ markers = [], height = '280px', zoom = 13 }) {
    const mapRef = useRef(null);
    const instanceRef = useRef(null);
    const markersRef = useRef([]);

   useEffect(() => {
    import('leaflet').then((L) => {
        window.L = L.default ?? L;
        fixLeafletIcon();

        if (!instanceRef.current && mapRef.current) {
            const center = markers[0]
                ? [markers[0].latitude, markers[0].longitude]
                : [-2.5, 99.1];

            instanceRef.current = window.L.map(mapRef.current).setView(center, zoom);
            window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
            }).addTo(instanceRef.current);
        }

        // Update marker yang sudah ada, jangan hapus-buat ulang
        markers.forEach(({ latitude, longitude, label, color = 'blue' }, i) => {
            if (!latitude || !longitude) return;
            const bg = color === 'green' ? '#0F3D2E' : color === 'lime' ? '#C6F135' : '#2563eb';
            const icon = window.L.divIcon({
                html: `<div style="background:${bg};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></div>`,
                className: '', iconSize: [14, 14], iconAnchor: [7, 7],
            });

            if (markersRef.current[i]) {
                // Update posisi marker yang sudah ada
                markersRef.current[i].setLatLng([latitude, longitude]);
            } else {
                // Buat marker baru kalau belum ada
                markersRef.current[i] = window.L.marker([latitude, longitude], { icon })
                    .addTo(instanceRef.current)
                    .bindPopup(`<b>${label}</b>`);
            }
        });

        // Pan map ke posisi terbaru
        if (markers[0]) {
            instanceRef.current.panTo([markers[0].latitude, markers[0].longitude]);
        }
    });
}, [markers]);

    return <div ref={mapRef} style={{ height, width: '100%', borderRadius: '12px', zIndex: 0 }} />;
}
