//type component
import { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "../../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      {
        //closing in 3 s
      }
      <ToastContainer autoClose={3000} />
    </AuthProvider>
  );
}
