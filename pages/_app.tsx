import '../styles/globals.css'
import type { AppProps } from "next/app";
import { BagProvider } from "../contexts/bag";

if (typeof window === "object") {
  const { worker } = require("../__mocks__/browser");
  worker.start();
} else {
  const { server } = require("../__mocks__/server");
  server.listen();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BagProvider>
      <Component {...pageProps} />
    </BagProvider>
  );
}
export default MyApp
