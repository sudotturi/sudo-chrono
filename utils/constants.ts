import { MODULES } from "@prisma/client";
import { NextPage } from "next";
import { Session } from "next-auth";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export interface ISudoTodo {
  text?: string;
  dateTime?: Date;
  done?: boolean;
}

interface ModuleItem {
  [key: string]: {
    name: string;
    icon: string;
  };
}

export const modulesMap: ModuleItem = {
  [MODULES.DASHBOARD]: { "name": "Dashboard", icon: 'Dashboard' },
  [MODULES.TEAMS]: { "name": "Team", icon: 'Dashboard' },
  [MODULES.PROJECTS]: { "name": "Projects", icon: 'Dashboard' },
  [MODULES.TRACKING]: { "name": "Tracking", icon: 'Dashboard' }
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout;
};


export type LayoutProps = {
  children: React.ReactNode
}
export function formatDateToCustomString(date: Date) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const dayOfWeek = days[date.getUTCDay()];
  const month = months[date.getUTCMonth()];
  const dayOfMonth = date.getUTCDate();

  return `${dayOfWeek}, ${month} ${dayOfMonth}`;
}

export function getLastWeekDates() {
  const today = new Date();
  const dates = [];

  for (let i = 6; i >= 0; i--) {
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - i);
    dates.push(formatDateToCustomString(previousDate));
  }
  return dates;
}

export function formatTimeToHHMM(date: Date) {
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

export function getTotalTime(start:Date, end:Date) {
  // Calculate the time difference in milliseconds
  const timeDiff = Math.abs(end.getTime() - start.getTime());

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  // Format the result as hh:mm:ss
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return formattedTime;
}

export function isProjectAssigned(projectUser:Array<any>, projectId: String) {
  if(!projectUser){
    return false
  }
  return projectUser.map((i)=> i.projectId).includes(projectId);
}


export function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

export function getRandomHexColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function darkenColor(hex: String, factor: number) {
  // Ensure the factor is between 0 and 1
  factor = Math.min(1, Math.max(0, factor));

  // Parse the hex color to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // Darken the color by applying the factor
  r = Math.round(r * (1 - factor));
  g = Math.round(g * (1 - factor));
  b = Math.round(b * (1 - factor));

  // Convert the new RGB values back to hex
  const newHex = '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);

  return newHex;
}
