/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { FunctionComponent } from 'react';

import academy from './academy.svg';
import battery from './battery.svg';
import circlePlus from './circlePlus.svg';
import hangar from './hangar.svg';
import lightning from './lightning.svg';
import mapLocation from './mapLocation.svg';
import navBars from './navBars.svg';
import powerOn from './powerOn.svg';
import rebel from './rebel.svg';
import star from './star.svg';
import user from './user.svg';

export type IconType = FunctionComponent<{ height?: number; width?: number; title?: string }>;

export const AcademyIcon: IconType = academy;
export const BatteryIcon: IconType = battery;
export const CirclePlusIcon: IconType = circlePlus;
export const HangarIcon: IconType = hangar;
export const LightningIcon: IconType = lightning;
export const MapLocationIcon: IconType = mapLocation;
export const NavBarsIcon: IconType = navBars;
export const PowerOnIcon: IconType = powerOn;
export const RebelIcon: IconType = rebel;
export const StarIcon: IconType = star;
export const UserIcon: IconType = user;
