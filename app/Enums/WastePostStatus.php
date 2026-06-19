<?php

namespace App\Enums;

enum WastePostStatus: string
{
    case Available = 'available';
    case Pending = 'pending';
    case Reserved = 'reserved';
    case InProcess = 'in_process';
    case Completed = 'completed';
    case Cancelled = 'cancelled';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
