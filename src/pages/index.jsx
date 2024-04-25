import React from "react";
import CallToAction from "../components/CallToAction";
import Category from "../components/Category";
import Clients from "../components/Clients";
import ScrollUp from "../components/Common/ScrollUp";
import Faq from "../components/Faq";
import Hero from "../components/Hero";
import RecentTender from "../components/RecentTender";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import Service from "@/components/Service";
import Process from "@/components/Process";
import ProjectsNumber from "@/components/ProjectsNumber";

export default function Home() {
  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      document.getElementById("root").classList.add("debug-screens");
    }
  }, []);

  return (
    <main id="root">
      <Hero />
      <Clients />
      <Category />
      <RecentTender />
      <ProjectsNumber />
      <WhyChooseUs />
      <Process />
      <CallToAction />
      <Service />
      <Testimonials />
      <Faq />
      <ScrollUp />
    </main>
  );
}
