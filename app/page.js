"use client"
import { useEffect,useState } from "react";
import Featured from "./(client)/components/Featured";
import Footer from "./(client)/components/Footer";
import Hero from "./(client)/components/Hero";
import Navbar from "./(client)/components/Navbar";
import Review from "./(client)/components/Review";
import Story from "./(client)/components/Story";
import Testimonials from "./(client)/components/Testimonials";
import Video from "./(client)/components/Video";
import Why from "./(client)/components/Why";
import Loading from "./(client)/components/Loading";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import Poster from "./(client)/components/Poster";

export default function Home() {
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
  setTimeout(()=>{
    setLoading(false)
  }, 5)
  },[])
  return (
    <main>
      {loading?(<Loading/>):(
        <>

      <div>
      <div className="fixed top-0 w-full z-10 bg-white border-b-[1px] border-green-800 shadow-md">
      <Navbar />
      </div>

      <div className="relative mt-[110px] pt-2 h-full">
      <Hero/>
        <Story/>
        <Featured/>
        <Why/>
        <Video/>
        <Testimonials/>
        <Review/>
        <Poster/>
        <Footer/>
      
      </div>
      
      
      </div>
        <TawkMessengerReact
          propertyId="651bac2110c0b2572487f618"
          widgetId="1hbq1gpbi"
        />
        </>
       
      )}    
    </main>
  );
}
