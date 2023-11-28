import { NextPage } from "next";
import { Session } from "next-auth";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export interface ISudoTodo {
    text?: string;
    dateTime?: Date;
    done?: boolean;
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
  
export type AppPropsWithLayout = AppProps<{ session: Session }> & {
    Component: NextPageWithLayout;
  };