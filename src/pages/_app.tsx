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

const heading = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "dark",
      }}
    >
      <section>
        <Component {...pageProps} />
      </section>
      <style jsx global>{`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${heading.style.fontFamily} !important;
        }

        p,
        a {
          font-family: ${p.style.fontFamily} !important;
        }
      `}</style>
    </MantineProvider>
  );
}
