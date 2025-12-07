import "./globals.css";
import BlobMorph from "./components/BlobMorph";
import Cursor from "./components/Cursor";
import AnimatedBackground from "./components/AnimatedBackground";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Silas.dev",
  description: "Modern web portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#040404] text-white overflow-x-hidden cursor-none">
        <LoadingScreen />
        <BlobMorph />
        <Cursor />
        <AnimatedBackground />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
