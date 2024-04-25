import About from "../../components/About";
import CallToAction from "../../components/CallToAction";
import Breadcrumb from "../../components/Common/Breadcrumb";
import Process from "../../components/Process";
import ProjectsNumber from "../../components/ProjectsNumber";
import Team from "../../components/Team";
import Testimonials from "../../components/Testimonials";
import WhyChooseUs from "../../components/WhyChooseUs";
import Service from '@/components/Service';

export const metadata = {
  title:
    "About Us",
  description: "About Apna Tender",
};

const AboutPage = () => {
  return (
    <main>
      <About />
      <ProjectsNumber />
      <WhyChooseUs />
      <Service />
      <CallToAction />
      <Testimonials />
    </main>
  );
};

export default AboutPage;
