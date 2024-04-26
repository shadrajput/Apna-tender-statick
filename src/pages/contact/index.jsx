import Breadcrumb from "../../components/Common/Breadcrumb";
import Contact from "../../components/Contact";
import Faq from "../../components/Faq";

export const metadata = {
  title:
    "Contact Us",
  description: "Contact Us",
};

const ContactPage = () => {
  return (
    <>
      <Contact />
      <Faq />
    </>
  );
};

export default ContactPage;
