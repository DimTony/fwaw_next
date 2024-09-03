export default function ContactDetailsForm({
  applicationData,
  handleChange,
  handleSave,
  handleNext,
}) {
  return (
    <>
      <form className="w-full max-w-md">
        {/* Contact Details Fields */}
        <input
          type="text"
          name="firstName"
          value={applicationData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        {/* Add other input fields similarly */}
        <div className="flex space-x-2">
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
