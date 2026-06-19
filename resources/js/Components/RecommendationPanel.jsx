export default function RecommendationPanel({ recommendations }) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Rekomendasi pemanfaatan</h3>
            {recommendations.length === 0 ? (
                <p className="mt-3 text-sm text-gray-600">
                    Belum ada rekomendasi pemanfaatan aktif untuk kategori limbah ini.
                </p>
            ) : (
                <div className="mt-4 space-y-4">
                    {recommendations.map((recommendation) => (
                        <div key={recommendation.id} className="rounded-xl border border-green-100 bg-green-50/50 p-4">
                            <div className="flex items-center justify-between gap-3">
                                <h4 className="text-sm font-semibold text-gray-900">{recommendation.title}</h4>
                                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-green-700">
                                    {recommendation.usage_type}
                                </span>
                            </div>
                            <p className="mt-2 text-xs font-medium text-emerald-700">
                                {recommendation.summary_label}
                            </p>
                            <p className="mt-2 text-sm text-gray-700">{recommendation.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
