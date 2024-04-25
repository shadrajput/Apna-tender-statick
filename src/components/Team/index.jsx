import SectionTitle from "../Common/SectionTitle";
import SingleTeam from "./SingleTeam";

const teamData = [
  {
    id: 1,
    name: "Asif Shaikh",
    designation: "Founder",
    image: "/images/team/founder.png",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 2,
    name: "Arpit Brahmbhatt",
    designation: "Co-Founder",
    image: "/images/team/founder.png",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 3,
    name: "Geeta Parmar",
    designation: "Co-Founder",
    image: "/images/team/founder.png",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
];

const Team = () => {
  return (
    <section
      id="team"
      className="overflow-hidden bg-gray-1 pb-12 pt-20 lg:pb-[70px] lg:pt-10 mx-20"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Our Team"
            title="Meet Our Team"
            paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
            width="640px"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {teamData.map((team, index) => (
            <SingleTeam key={index} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;