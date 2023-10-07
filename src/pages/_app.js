import { AuthProvider } from "@/firebase/AuthContext";
import Navbar from "@/components/Navbar/Navbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
