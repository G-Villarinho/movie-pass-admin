import {
    AlarmClock,
    AlignJustify,
    Armchair,
    ChartLine,
    ChevronsUpDown,
    CirclePlus,
    CircleUser,
    Clapperboard,
    CloudUpload,
    Cog,
    Copy,
    FilePenLine,
    Film,
    Inbox,
    LogOut,
    LucideAngularModule,
    PlusCircle,
    Server,
    Settings,
    Store,
    Trash,
    Trash2,
    TriangleAlert,
    X,
} from 'lucide-angular';
import { importProvidersFrom } from '@angular/core';

export const lucideIconsProviders = importProvidersFrom(
    LucideAngularModule.pick({
        AlignJustify,
        CircleUser,
        Cog,
        LogOut,
        Inbox,
        CirclePlus,
        Store,
        ChevronsUpDown,
        Trash,
        Server,
        Copy,
        TriangleAlert,
        ChartLine,
        Clapperboard,
        Film,
        AlarmClock,
        Armchair,
        Settings,
        X,
        PlusCircle,
        FilePenLine,
        CloudUpload,
        Trash2,
    })
);
