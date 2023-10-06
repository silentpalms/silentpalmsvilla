import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Inter, Karla } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Provider from "./context/client-provider";


const inter = Inter({ subsets: ["latin"] });
const karla = Karla({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata = {
  title: "Silent Palms Villas",
  description: "Accomodations website in Diani",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={karla.className}>
        <Provider session={session}>{children}</Provider>
              
        </body>
    </html>
  );
}
