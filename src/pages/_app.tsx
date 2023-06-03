import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { Merriweather, Poppins } from "next/font/google";
import "highlight.js/styles/github-dark.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const p = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "dark",
        fontFamily: p.style.fontFamily,
      }}
    >
      <section>
        <Component {...pageProps} />
      </section>
    </MantineProvider>
  );
}
