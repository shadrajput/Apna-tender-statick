import Breadcrumb from "../../components/Common/Breadcrumb";
import Faq from "../../components/Faq";
import Pricing from "../../components/Pricing";

export const metadata = {
  title:
    "Pricing",
  description: "",
};

const PricingPage = () => {
  return (
    <>
      <Breadcrumb pageName="Pricing" />
      <Pricing />
      <Faq />
    </>
  );
};

export default PricingPage;
