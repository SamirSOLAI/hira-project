type ContractType = "CDI" | "CDD" | "Stage";

type jobOverview = {
  title: string;
  entreprise: string;
  location: string;
  duration?: string;
  contrat: ContractType;
};
const JobCard = (props: jobOverview) => {
  return (
    <article>
      <h2>{props.title}</h2>
      <p>{props.entreprise}</p>
      <p>{props.location}</p>
      <p>{props.duration}</p>
    </article>
  );
};

export default JobCard;
