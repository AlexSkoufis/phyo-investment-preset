import site from "@/content/site.json";
import home from "@/content/home.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import Hero from "@/components/Hero";
import Audience from "@/components/Audience";
import Capabilities from "@/components/Capabilities";
import FitCheck from "@/components/FitCheck";
import Principles from "@/components/Principles";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Regional from "@/components/Regional";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <div id="top" />
      <Header site={site} />
      <main id="main">
        <Hero content={home} />
        <Audience content={home} />
        <Capabilities content={home} />
        <FitCheck content={home} />
        <Principles content={home} />
        <Process content={home} />
        <Portfolio content={home} />
        <Regional content={home} />
        <Contact content={home} site={site} />
      </main>
      <Footer site={site} />
      <Motion />
    </>
  );
}
