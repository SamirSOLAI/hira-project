type ContractType = "CDI" | "CDD" | "Stage";

export type JobOverview = {
  title: string;
  entreprise: string;
  location: string;
  duration?: string;
  contrat: ContractType;
};

const JobCard = (props: JobOverview) => {
  return (
    <article className="job-card">
      <div className="job-card-heading">
        <span className="job-company-icon" aria-hidden="true">{props.entreprise.charAt(0)}</span>
        <p className="job-company">{props.entreprise}</p>
        <span className="job-contract">{props.contrat}</span>
      </div>
      <h3 className="job-title">{props.title}</h3>
      <div className="job-details">
        <p>{props.location}</p>
        {props.duration && <p>Duration: {props.duration}</p>}
      </div>
      <div className="job-actions">
        <button type="button" className="job-apply" disabled>Apply</button>
        <button type="button" className="job-save" disabled>Save job</button>
      </div>
    </article>
  );
};

export default JobCard;
import "./JobCard.css";

