interface Props {
  onButtonClick: () => void;
}

const ReviewAndDownload = ({ onButtonClick }: Props) => {
  return (
    <>
      <div className="my-company-container">
        <div className="my-company-header">Your invoice is ready</div>
        <div className="my-company-form-message">
          Take a final look before downloading it.
        </div>
        {/* download button */}
        <button onClick={onButtonClick} className="review-download-button">
          <img
            className="review-download-button-icon"
            src="assets\MaterialSymbolsDownload.svg"
          />
          Download
        </button>
        {/* create new button */}
        <button className="review-create-new-button">
          <img
            className="review-create-new-button-icon"
            src="assets\MaterialSymbolsRefresh.svg"
          />
          Create New
        </button>
      </div>
    </>
  );
};

export default ReviewAndDownload;
