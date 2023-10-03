import "leaflet/dist/leaflet.css";


import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ChatFeature from "./components/ChatFeature";

export default function ClientLayout({ children }) {
  return (
    <div>
      
      <Navbar/>
      <ChatFeature/>
      
      {children}
      <Footer/>
    </div>
  )
}
