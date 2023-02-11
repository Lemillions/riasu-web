import "@/styles/globals.css";
import { ConfigProvider, theme } from "antd";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        >
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
