import { GeistSans } from "geist/font/sans";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "~/styles/globals.css";
import { ThemeProvider } from "~/components/ui/theme-provider";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { Toaster } from "~/components/ui/sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/next/pages";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000, // 1 second
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});
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
        <NuqsAdapter>
          <style jsx global>{`
            html {
              font-family: ${GeistSans.style.fontFamily};
            }
          `}</style>
          <div className={GeistSans.className}>{layout}</div>
          <Toaster />
          <ReactQueryDevtools />
        </NuqsAdapter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
