import TenderList from "@/components/TendersList";

export const metadata = {
  title:
    "Tenders",
  description: "Tenders",
};

const TenderListPage = () => {
  return (
    <>
      <section>
        <TenderList/>
      </section>
    </>
  );
};

export default TenderListPage;
