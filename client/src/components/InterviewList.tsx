import { Interview } from "../types";
import InterviewCard from "./InterviewCard";

const interviews: Interview[] = [
  {
    key: 1,
    title: "Backend Developer Intern",
    company: "Forescribe",
    type: "Technical Interview",
    date: "22 Jun, 20024",
    duration: "1hr",
    link: "https://meet.google.com/vze-razj-poh",
    guest: "",
  },
  {
    key: 2,
    title: "Backend Developer Intern",
    company: "Forescribe",
    type: "Technical Interview",
    date: "22 Jun, 20024",
    duration: "1hr",
    link: "https://meet.google.com/vze-razj-poh",
    guest: "",
  },
  {
    key: 3,
    title: "Backend Developer Intern",
    company: "Forescribe",
    type: "Technical Interview",
    date: "22 Jun, 20024",
    duration: "1hr",
    link: "https://meet.google.com/vze-razj-poh",
    guest: "",
  },
  {
    key: 4,
    title: "Backend Developer Intern",
    company: "Forescribe",
    type: "Technical Interview",
    date: "22 Jun, 20024",
    duration: "1hr",
    link: "https://meet.google.com/vze-razj-poh",
    guest: "",
  },
  {
    key: 5,
    title: "Backend Developer Intern",
    company: "Forescribe",
    type: "Technical Interview",
    date: "22 Jun, 20024",
    duration: "1hr",
    link: "https://meet.google.com/vze-razj-poh",
    guest: "",
  },
  {
    key: 6,
    title: "Backend Developer Intern",
    company: "Forescribe",
    type: "Technical Interview",
    date: "22 Jun, 20024",
    duration: "1hr",
    link: "https://meet.google.com/vze-razj-poh",
    guest: "Harsh Gupta, Prateek Agarwal",
  },
  {
    key: 7,
    title: "Backend Developer Intern",
    company: "Forescribe",
    type: "Technical Interview",
    date: "22 Jun, 20024",
    duration: "1hr",
    link: "https://meet.google.com/vze-razj-poh",
    guest: "",
  },
];
const InterviewList = () => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-wrap justify-around">
      {interviews.length === 0 ? (
        <p>No interviews data available!! </p>
      ) : (
        interviews.map((interview) => {
          return <InterviewCard data={interview} />;
        })
      )}
    </div>
  );
};

export default InterviewList;
