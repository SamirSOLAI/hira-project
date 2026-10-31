import type { JobOverview } from "./jobCard";
import JobCard from "./jobCard";

export type Job = JobOverview & {
  id: number;
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer Intern - React",
    entreprise: "Mock Studio",
    location: "Paris, France - Hybrid",
    duration: "6 months",
    contrat: "Stage",
  },
  {
    id: 2,
    title: "Junior Full Stack Developer",
    entreprise: "Demo Labs",
    location: "Lyon, France - Remote",
    contrat: "CDI",
  },
  {
    id: 3,
    title: "Java Backend Developer Intern",
    entreprise: "Sample Systems",
    location: "Paris, France - On-site",
    duration: "4 months",
    contrat: "Stage",
  },
  {
    id: 4,
    title: "TypeScript Developer",
    entreprise: "Fictional Cloud",
    location: "Bordeaux, France - Hybrid",
    duration: "12 months",
    contrat: "CDD",
  },
  {
    id: 5,
    title: "Junior React Developer",
    entreprise: "Placeholder Digital",
    location: "Nantes, France - Remote",
    contrat: "CDI",
  },
];

const Listings = () => {
  return (
    <section className="job-listings" aria-labelledby="listings-title">
      <div className="listings-heading">
        <h2 id="listings-title">Explore opportunities</h2>
        <span>{jobs.length} sample jobs</span>
      </div>
      <p className="listings-note">Fictional listings for preview. Apply and save are coming later.</p>
      <div className="job-grid">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </section>
  );
};

export default Listings;
