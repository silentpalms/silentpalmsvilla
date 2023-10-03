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

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
  setTimeout(()=>{
    setLoading(false)
  }, 5000)
  },[])
  return (
    <main>
      {loading?(<Loading/>):(
        <>

<div>
        <Navbar />
        <Hero/>
        <Story/>
        <Featured/>
        <Why/>
        <Video/>
        <Testimonials/>
        <Review/>
        <Footer/>
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
