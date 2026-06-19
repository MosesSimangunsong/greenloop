const statusClassMap = {
    available: 'bg-green-100 text-green-700',
    pending: 'bg-amber-100 text-amber-700',
    reserved: 'bg-blue-100 text-blue-700',
    in_process: 'bg-sky-100 text-sky-700',
    completed: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
};

const statusLabelMap = {
    available: 'Available',
    pending: 'Pending',
    reserved: 'Reserved',
    in_process: 'In Process',
    completed: 'Completed',
    cancelled: 'Cancelled',
    approved: 'Approved',
    rejected: 'Rejected',
};

export default function StatusBadge({ status }) {
    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusClassMap[status] ?? 'bg-gray-100 text-gray-700'}`}
        >
            {statusLabelMap[status] ?? status.replaceAll('_', ' ')}
        </span>
    );
}
