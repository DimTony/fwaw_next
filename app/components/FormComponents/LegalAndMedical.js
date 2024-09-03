export default function LegalsAndMedicalForm({
  applicationData,
  handleChange,
  handleSave,
  handleNext,
  setCurrentStep,
}) {
  return (
    <>
      <form className="w-full max-w-md">
        {/* Legal and Medical Fields */}
        <input
          type="text"
          name="anyAllergies"
          value={applicationData.anyAllergies}
          onChange={handleChange}
          placeholder="Any allergies?"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        {/* Add other input fields similarly */}
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
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
            onClick={handleNext}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
}
