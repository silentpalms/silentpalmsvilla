import "leaflet/dist/leaflet.css";


import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ChatFeature from "./components/ChatFeature";

export default function ClientLayout({ children }) {
  return (
    <div>
      <div className="fixed top-0 w-full z-10 bg-white border-b-[1px] border-green-800 shadow-md">
      <Navbar/>
      </div>
     
      <ChatFeature/>


      <div className="relative mt-[110px] pt-2 h-full">
      {children}
      </div>
      
      
      <Footer/>
    </div>
  )
}
