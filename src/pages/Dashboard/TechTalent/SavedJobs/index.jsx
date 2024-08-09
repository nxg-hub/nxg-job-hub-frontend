import { useApiRequest } from "../../../../utils/functions/fetchEndPoint";
import spinner from "../../../../static/icons/spinner.svg";
import SavedJobCard from "./SavedJobCard";
import { useState } from "react";
import SavedJobDetails from "./SavedJobCard/SavedJobDetails";

const SavedJobs = () => {
  const {
    data: savedJob,
    loading,
    error,
  } = useApiRequest("/api/v1/tech-talent/my-jobs");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [successfull, setSuccessfull] = useState(false);

  const handleCardClick = (id) => {
    setSelectedCardId(id);
    setShowDetails(true);
  };

  const handleApply = () => {
    setSuccessfull(true);
  };

  const handleClose = () => {
    setShowDetails(false);
    setSuccessfull(true);
  };
  const saved = savedJob.content;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-20 px-2 lg:px-10 gap-6 w-full">
      {loading ? (
        <img
          className="w-[30%] absolute left-[45%]"
          src={spinner}
          alt="spinner"
        />
      ) : !loading && error ? (
        <div className="w-[80%] m-auto mt-[400px] text-xl md:text-2xl">
          <h2>Something went wrong, check internet connection and try again</h2>
        </div>
      ) : (
        saved?.map((job) => (
          <SavedJobCard
            job={job}
            key={job.id}
            onClick={() => handleCardClick(saved.id)}
            handleApply={handleApply}
          />
        ))
      )}
      {showDetails && (
        <div className="fixed lg:absolute z-50 w-full lg:w-1/2 h-full overflow-auto lg:top-[8%] bottom-[0%] lg:left-[25%]">
          <SavedJobDetails
            details={saved.find((details) => details.id === selectedCardId)}
            onClose={handleClose}
          />
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
