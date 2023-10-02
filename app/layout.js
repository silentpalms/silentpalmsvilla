import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Inter, Karla } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const karla = Karla({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata = {
  title: "Silent Palms Villas",
  description: "Accomodations website in Diani",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={karla.className}>{children}</body>
    </html>
  );
}
