import { ISidebarItem } from '@core/components/sidebar/sidebar-item.interface';
import { DashBoardRoutesEnum } from '@shared/enums/routes/dashboard-routes.enum';

const PATH = `/${DashBoardRoutesEnum.PATH}`;

export const SidebarItems: ISidebarItem[] = [
    {
        label: 'Overview',
        iconName: 'chart-line',
        href: [PATH, DashBoardRoutesEnum.OVERVIEW],
        color: 'text-sky-500',
    },
    {
        label: 'Cinemas',
        iconName: 'clapperboard',
        href: [PATH, DashBoardRoutesEnum.CINEMA],
        color: 'text-violet-500',
    },
    {
        label: 'Movies',
        iconName: 'film',
        href: [PATH, DashBoardRoutesEnum.MOVIE],
        color: 'text-pink-700',
    },
    {
        label: 'Sessions',
        iconName: 'alarm-clock',
        href: [PATH, DashBoardRoutesEnum.SESSION],
        color: 'text-orange-700',
    },
    {
        label: 'Rooms',
        iconName: 'armchair',
        href: [PATH, DashBoardRoutesEnum.ROOM],
        color: 'text-emerald-500',
    },
    {
        label: 'Settings',
        iconName: 'settings',
        href: [PATH, DashBoardRoutesEnum.SETTING],
    },
];
