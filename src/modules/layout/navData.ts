import { FunctionComponent } from 'react';

import { IconAcademy } from 'src/assets/icons/IconAcademy';
import { IconCirclePlus } from 'src/assets/icons/IconCirclePlus';
import { IconHangar } from 'src/assets/icons/IconHangar';
import { IconPowerOn } from 'src/assets/icons/IconPowerOn';
import { IconRebel } from 'src/assets/icons/IconRebel';

export interface INavItem {
  href: string;
  icon: FunctionComponent;
  name: string;
  text: string;
}
export const navItems: INavItem[] = [
  {
    href: '/',
    icon: IconRebel,
    name: 'Home',
    text: 'common:navHome',
  },
  {
    href: '/knowledge',
    icon: IconAcademy,
    name: 'KnowledgeBase',
    text: 'common:navKnowledgeBase',
  },
  {
    href: '/hangar',
    icon: IconHangar,
    name: 'Hangar',
    text: 'common:navHangar',
  },
  {
    href: '/hangar/add',
    icon: IconCirclePlus,
    name: 'AddNew',
    text: 'common:navAddNew',
  },
  {
    href: '/users/login',
    icon: IconPowerOn,
    name: 'Login',
    text: 'common:navLogin',
  },
];
