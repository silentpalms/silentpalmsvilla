import { Karla } from "next/font/google";
import Footer from "./Footer";
import Navbar from "./Navbar";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

const karla = Karla({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export default function ClientLayout({ children, open }) {
  return (
    <div className={`${karla.className} text-[16px]`}>
      {!open && (
        <div className="fixed top-0 w-full z-10 bg-white border-b-[1px] border-green-800 shadow-md">
          <Navbar />
        </div>
      )}

      <div>
        <TawkMessengerReact
          propertyId="649dbd1494cf5d49dc6096af"
          widgetId="1h442l6l7"
        />
      </div>

      <div className="relative mt-[110px]  h-full">{children}</div>

      <Footer />
    </div>
  );
}
