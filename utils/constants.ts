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