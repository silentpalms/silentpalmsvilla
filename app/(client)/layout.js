import "leaflet/dist/leaflet.css";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function ClientLayout({ children }) {
  return (
    <div>
      
      <Navbar/>
      <TawkMessengerReact
          propertyId="651bac2110c0b2572487f618"
          widgetId="1hbq1gpbi"
        />
      
      {children}
      <Footer/>
    </div>
  )
}
