import { useState } from "react";

const JobSearchForm = () => {
  const [description, setDescription] = useState<string>("");

  return (
    <main className="search-page">
      <p className="search-eyebrow">A smarter way to find your next role</p>
      <h1>Describe the job you are looking for</h1>
      <form className="search-bar" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="job-description">
          What does your next chapter look like?
        </label>
        <textarea
          id="job-description"
          name="description"
          rows={2}
          value={description}
          onChange={(event) => {
            setDescription(event.currentTarget.value);
          }}
          placeholder="A developer internship in Paris, using Java or JavaScript..."
        />
        <div className="search-toolbar">
          <span className="ai-caption">
            <span className="ai-badge">AI</span> You describe. We find the fit.
          </span>
          <button
            type="submit"
            aria-label="Find matching jobs"
            title="Find matching jobs"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 19V5m-6 6 6-6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>
      <p id="search-hint" className="search-hint">
        Your skills, preferred location, salary, dealbreakers. Make it yours.
      </p>
    </main>
  );
};

export default JobSearchForm;
