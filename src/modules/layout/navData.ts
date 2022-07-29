import { AcademyIcon, CirclePlusIcon, HangarIcon, PowerOnIcon, RebelIcon } from 'src/assets/icons';
import type { IconType } from 'src/assets/icons';

export interface INavItem {
  href: string;
  icon: IconType;
  name: string;
  text: string;
}
export const navItems: INavItem[] = [
  {
    href: '/',
    icon: RebelIcon,
    name: 'Home',
    text: 'common:navHome',
  },
  {
    href: '/knowledge',
    icon: AcademyIcon,
    name: 'KnowledgeBase',
    text: 'common:navKnowledgeBase',
  },
  {
    href: '/hangar',
    icon: HangarIcon,
    name: 'Hangar',
    text: 'common:navHangar',
  },
  {
    href: '/hangar/add',
    icon: CirclePlusIcon,
    name: 'AddNew',
    text: 'common:navAddNew',
  },
  {
    href: '/users/login',
    icon: PowerOnIcon,
    name: 'Login',
    text: 'common:navLogin',
  },
];
