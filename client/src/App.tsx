import Header from "./assets/header/header";
import JobSearchForm from "./assets/JobSearchForm";
import "./App.css";
import Listings from "./assets/listings";

function App() {
  return (
    <>
      <Header />
      <JobSearchForm />
      <Listings />
      <button
        onClick={async () => {
          const response = await fetch("/api/v1/test");
          const data = await response.json();
          console.log(data);
        }}
      >
        {" "}
        test the backend{" "}
      </button>
    </>
  );
}

export default App;
