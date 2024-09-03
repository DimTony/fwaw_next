import { useEffect, useState } from "react";

export default function ContactDetailsForm({
  applicationData,
  setApplicationData,
  handleChange,
  handleSave,
  handleNext,
}) {
  const [daysInMonth, setDaysInMonth] = useState(31);
  // Function to calculate the number of days in the selected month and year
  const calculateDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  // Update daysInMonth whenever month or year changes
  useEffect(() => {
    if (applicationData.month && applicationData.year) {
      const days = calculateDaysInMonth(
        applicationData.month,
        applicationData.year
      );
      setDaysInMonth(days);

      // Ensure the selected day is valid
      if (applicationData.day > days) {
        setApplicationData((prevData) => ({
          ...prevData,
          day: "",
        }));
      }
    }
  }, [applicationData.month, applicationData.year]);

  return (
    <>
      <form className="w-full ">
        {/* Contact Details Fields */}
        <div className="w-full flex flex-col lg:flex-row mb-4 gap-5 overflow-y-scroll h55vh">
          <div className="lg:w-1/4 flex flex-col">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={applicationData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-2 mb-1 border border-gray-300 rounded"
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={applicationData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-2 mb-1 border border-gray-300 rounded"
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={applicationData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 mb-1 border border-gray-300 rounded"
            />
            <label htmlFor="confirmEmail">Confirm Email:</label>
            <input
              type="email"
              name="confirmEmail"
              value={applicationData.confirmEmail}
              onChange={handleChange}
              placeholder="Confirm Email"
              className="w-full p-2 mb-1 border border-gray-300 rounded"
            />
          </div>
          <div className="lg:w-1/4 flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={applicationData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 mb-1 border border-gray-300 rounded"
            />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={applicationData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-2 mb-1 border border-gray-300 rounded"
            />

            <label htmlFor="addressLine1">Address Line 1:</label>
            <input
              type="text"
              name="addressLine1"
              value={applicationData.addressLine1}
              onChange={handleChange}
              placeholder="Address Line 1"
              className="w-full p-2 mb-1 border border-gray-300 rounded"
            />

            <label htmlFor="addressLine1">Address Line 2:</label>
            <input
              type="text"
              name="addressLine2"
              value={applicationData.addressLine2}
              onChange={handleChange}
              placeholder="Address Line 2"
              className="w-full p-2 mb-1 border border-gray-300 rounded"
            />
          </div>
          <div className="lg:w-1/4 flex flex-col">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              name="city"
              value={applicationData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-2 mb-1 border border-gray-300 rounded"
            />

            <div className="w-full flex gap-2">
              <div>
                <label htmlFor="state">State:</label>
                <input
                  type="text"
                  name="state"
                  value={applicationData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full p-2 mb-1 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label htmlFor="zipcode">Zipcode:</label>
                <input
                  type="text"
                  name="zipcode"
                  value={applicationData.zipcode}
                  onChange={handleChange}
                  placeholder="Zipcode"
                  className="w-full p-2  border border-gray-300 rounded"
                />
              </div>
            </div>

            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="text"
              name="mobileNumber"
              value={applicationData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full p-2 mb-1 border border-gray-300 rounded"
            />

            <label htmlFor="workNumber">Work Number:</label>
            <input
              type="text"
              name="workNumber"
              value={applicationData.workNumber}
              onChange={handleChange}
              placeholder="Work Number"
              className="w-full p-2 mb-1 border border-gray-300 rounded"
            />

            <label htmlFor="occupation">Occupation:</label>
            <input
              type="text"
              name="occupation"
              value={applicationData.occupation}
              onChange={handleChange}
              placeholder="Occupation"
              className="w-full p-2 mb-1 border border-gray-300 rounded"
            />
          </div>
          <div className="lg:w-1/4 flex flex-col">
            <label>Gender:</label>
            <div className="flex lg:gap-3 gap-4 justify-between lg:mb-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="gender"
                  value="Male"
                  checked={applicationData.gender === "Male"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="gender" className="lg:text-xs text-xl">
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="gender"
                  value="Female"
                  checked={applicationData.gender === "Female"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="gender" className="lg:text-xs text-xl">
                  Female
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="gender"
                  value="Not Specified"
                  checked={applicationData.gender === "Not Specified"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="gender" className="lg:text-xs text-xl">
                  Not Specified
                </label>
              </div>
            </div>

            <label htmlFor="age">Age:</label>
            <input
              type="number"
              name="age"
              value={applicationData.age}
              onChange={handleChange}
              placeholder="Age"
              className="w-full p-2 mb-1 border border-gray-300 rounded"
            />

            <div className="w-full flex justify-between items-center gap-2">
              <div className="w-1/3">
                <label>
                  Day:
                  <select
                    name="day"
                    value={applicationData.day}
                    onChange={handleChange}
                    className="w-full p-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="">Day</option>
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                      (day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      )
                    )}
                  </select>
                </label>
              </div>
              <div className="w-1/3">
                <label>
                  Month:
                  <select
                    name="month"
                    value={applicationData.month}
                    onChange={handleChange}
                    className="w-full p-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="">Month</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(
                      (month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      )
                    )}
                  </select>
                </label>
              </div>
              <div className="w-1/3">
                <label>
                  Year:
                  <select
                    name="year"
                    value={applicationData.year}
                    onChange={handleChange}
                    className="w-full p-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="">Year</option>
                    {Array.from(
                      { length: 100 },
                      (_, i) => new Date().getFullYear() - i
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <label htmlFor="isAustralianCitizen">
              Are you an Australian citizen or permanent resident:
              <select
                name="isAustralianCitizen"
                value={applicationData.isAustralianCitizen}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded text-sm"
              >
                <option value="">select</option>
                <option value="Australian Citizen">Australian Citizen</option>
                <option value="Australian Permanent Resident">
                  Australian Permanent Resident
                </option>
                <option value="Neither">Neither</option>
              </select>
            </label>

            <label htmlFor="whereYouHeardSelect">
              Where did you hear about applying for Farmer Wants A Wife:
              <select
                name="whereYouHeardSelect"
                value={applicationData.whereYouHeardSelect}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded text-sm"
              >
                <option value="">Select</option>
                <option value="Facebook">Facebook</option>
                <option value="Television">Television</option>
                <option value="Word of Mouth">Word of Mouth</option>
                <option value="Instagram">Instagram</option>
                <option value="Email">Email</option>
                <option value="Producer">Producer</option>
                <option value="Other">Other</option>
                <option value="TikTok">TikTok</option>
              </select>
            </label>

            <label htmlFor="whereYouHeardOther">
              If other, please specify:
            </label>
            <input
              type="text"
              name="whereYouHeardOther"
              value={applicationData.whereYouHeardOther}
              onChange={handleChange}
              className="w-full p-2 mb-1 border border-gray-300 rounded"
            />
          </div>
        </div>

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
