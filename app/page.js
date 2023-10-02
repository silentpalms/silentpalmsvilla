"use client"
import Featured from "./(client)/components/Featured";
import Footer from "./(client)/components/Footer";
import Hero from "./(client)/components/Hero";
import Navbar from "./(client)/components/Navbar";
import Review from "./(client)/components/Review";
import Story from "./(client)/components/Story";
import Testimonials from "./(client)/components/Testimonials";
import Video from "./(client)/components/Video";
import Why from "./(client)/components/Why";

export default function Home() {
  return (
    <main>
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
    </main>
  );
}
