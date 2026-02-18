import About from "@/components/About";
import Contact from "@/components/Contact";
import RecentEventsPreview from "@/components/Events";
import GalleryPreview from "@/components/Gallery";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ServicesPreview from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ServicesPreview />
      <GalleryPreview />
      <RecentEventsPreview />
      <Testimonials />
      <Contact />
      {/* We will build these next */}
     
    </main>
  );
}