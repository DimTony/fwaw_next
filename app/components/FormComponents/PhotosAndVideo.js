export default function PhotosAndVideoForm({
  applicationData,
  handleChange,
  handleSave,
  handleNext,
  setCurrentStep,
  isFormComplete,
  handleSubmit,
}) {
  return (
    <>
      <form className="w-full max-w-md">
        {/* Photos and Video Fields */}
        <input
          type="file"
          name="frontHeadshotPhoto"
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        {/* Add other file inputs similarly */}
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="w-full p-2 bg-gray-500 text-white rounded"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="w-full p-2 bg-gray-500 text-white rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              handleSave();
              if (isFormComplete()) {
                handleSubmit();
              }
            }}
            className={`w-full p-2 rounded ${
              isFormComplete() ? "bg-blue-500" : "bg-gray-500"
            } text-white`}
            disabled={!isFormComplete()}
          >
            {isFormComplete() ? "Submit" : "Complete Your Application"}
          </button>
        </div>
      </form>
    </>
  );
}
