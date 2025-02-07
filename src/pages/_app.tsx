import { GeistSans } from "geist/font/sans";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import "~/styles/globals.css";
import { ThemeProvider } from "~/components/ui/theme-provider";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";

const queryClient = new QueryClient()

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  theme: "string";
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <style jsx global>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
          }
        `}</style>
        <div className={GeistSans.className}>
          {layout}
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
