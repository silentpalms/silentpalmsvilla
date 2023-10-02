import "leaflet/dist/leaflet.css";


import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function ClientLayout({ children }) {
  return (
    <div>
      <Navbar/>
      {children}
      <Footer/>
    </div>
  )
}
