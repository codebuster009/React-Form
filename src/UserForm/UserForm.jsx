import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import "react-toastify/dist/ReactToastify.css";
import monthsData from "../assets/MonthData";
const UserForm = () => {
  //Controlled inputs
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i));
  const [leapYear, setLeapYear] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  //Error States
  const [fullNameError, setFullNameError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  let errorMessage = "";

  //Regex for validations
  const regex =
    /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@.#$!%?&])[A-Za-z\d@.#$!%?&]{8,15}$/;
  const patternNotSymbol = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
  const patternNotSpace = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/;

  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const [months, setMonths] = useState(monthsData);
  const day = date.getDate();
  const currentYear = date.getFullYear().toString();
  //console.log(day, currentMonth);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    if (
      !/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/.test(
        password
      )
    ) {
      setPasswordError(true);
    }
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    if (password !== confirmPassword) {
      errorMessage = "Passwords do not match.";
      setConfirmPasswordError(true);
    }
    setConfirmPassword(e.target.value);
    if (confirmPasswordError) {
      setConfirmPasswordError(false);
    }
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    //console.log(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    //console.log(e.target.value);
    if (isLeapYear(e.target.value)) {
      setLeapYear(true);
    }
  };

  const handleCancel = () => {
    setFullName("");
    setContactNumber("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  // const contactInput = (contact) => {
  //   // Remove all non-digit characters from the contact number
  //   const cleanedContact = contact.replace(/\D/g, "");

  //   // Check if the cleaned contact number has at most 10 digits
  //   if (cleanedContact.length <= 10) {
  //     let formattedContact = "(" + cleanedContact.substr(0, 3) + ")";
  //     if (cleanedContact.length > 3) {
  //       formattedContact += " " + cleanedContact.substr(3, 3);
  //     }
  //     if (cleanedContact.length > 6) {
  //       formattedContact += "-" + cleanedContact.substr(6);
  //     }
  //     // Update the state with the formatted contact number
  //     setContactNumber(formattedContact);
  //   }
  // };

  const handleContactNumberChange = (e) => {
    const contact = e.target.value
    console.log(contact , "contact")
    const cleanedContact = contact.replace(/\D/g, "");
    console.log(cleanedContact , "clean contact")
    let formattedContact = "";
    if (cleanedContact.length > 10) return;
    if (contact.includes("(") && cleanedContact.length === 1) {
      formattedContact = "";
    } else if (contact.includes("(") && !contact.includes(")")) {
      formattedContact =
        "(" + cleanedContact.substr(0, cleanedContact.length - 1) + ")";
    } else if(cleanedContact.length === 0) {
      return
    } else {
      formattedContact = "(" + cleanedContact.substr(0, 3) + ")";
    }
    if (cleanedContact.length > 3) {
      formattedContact += " " + cleanedContact.substr(3, 3);
    }
    if (cleanedContact.length > 6) {
      formattedContact += "-" + cleanedContact.substr(6);
    }
    setContactNumber(formattedContact)
  };


  const isLeapYear = (year) => {
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !fullName.trim() ||
      !patternNotSymbol.test(fullName) ||
      !patternNotSpace.test(fullName)
    ) {
      errorMessage =
        "Please enter your full name.\n" +
        "Not empty, no symbols, no spaces around.";
      setFullNameError(true);
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(contactNumber.trim())) {
      errorMessage =
        "Please enter a valid Canadian phone number format (XXX) XXX-XXXX.";
      setContactNumberError(true);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errorMessage = "Please enter a valid email address.";
      setEmailError(true);
    } else if (password !== confirmPassword) {
      errorMessage = "Passwords do not match.";
      setPasswordError(true);
      setConfirmPasswordError(true);
    } else if (!regex.test(password)) {
      errorMessage =
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:";
      setPasswordError(true);
    }

    if (fullName.length < 3) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    toast.success("Your details have been successfully submitted.", {
      fullName,
      contactNumber,
      email,
    });
  };

  //Side-Effects
  useEffect(() => {
    const patternNotSymbol = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    const patternNotSpace = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/;
    if (fullName != "") {
      setFullNameError(
        !fullName.trim() ||
          !patternNotSymbol.test(fullName.trim()) ||
          !patternNotSpace.test(fullName.trim())
      );
    } else if (fullName.trim() === "") {
      setFullNameError(false);
    }
  }, [fullName]);

  useEffect(() => {
    if (email != "") {
      setEmailError(
        !/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email.trim())
      );
    } else if (email.trim() === "") {
      setEmailError(false);
    }
  }, [email]);

  useEffect(() => {
    const canadianPhoneNumberRegex = /^[\d()-.\s]+$/;
    if (contactNumber != "") {
      setContactNumberError(
        !canadianPhoneNumberRegex.test(contactNumber.trim())
      );
    } else if (contactNumber.trim() === "" || contactNumber.length > 10) {
      setContactNumberError(false);
    }
  }, [contactNumber]);

  //console.log(selectedMonth, "your selected month");
  //console.log(typeof selectedMonth, "selected type");
  //console.log(selectedYear, "selected");
  //console.log(typeof selectedYear);
  //console.log(typeof currentYear, "year");
  //console.log(isLeapYear(currentYear));
  //console.log(selectedYear === currentYear, "equality check");
  //console.log(selectedMonth === "February", "equal cehck");
  //console.log(selectedYear < currentYear, "is it less or not");

  useEffect(() => {
    if (selectedYear === currentYear) {
      setMonths(months.filter((month) => month.id <= currentMonth));
      if (isLeapYear(selectedYear) && selectedMonth === "February") {
        setDays(Array.from({ length: 30 }, (_, i) => i));
      }
      if (!isLeapYear(selectedYear) && selectedMonth === "February") {
        setDays(Array.from({ length: 29 }, (_, i) => i));
      }
      if (
        selectedMonth === "January" ||
        selectedMonth === "March" ||
        selectedMonth === "May" ||
        selectedMonth === "July" ||
        selectedMonth === "September" ||
        selectedMonth === "November"
      ) {
        setDays(Array.from({ length: 32 }, (_, i) => i));
      }
      if (
        selectedMonth === "April" ||
        selectedMonth === "June" ||
        selectedMonth === "August" ||
        selectedMonth === "October" ||
        selectedMonth === "December"
      ) {
        setDays(Array.from({ length: 31 }, (_, i) => i));
      }
    } else if (selectedYear < currentYear) {
      setMonths(monthsData);
      if (isLeapYear(selectedYear) && selectedMonth === "February") {
        setDays(Array.from({ length: 30 }, (_, i) => i));
      }
      if (!isLeapYear(selectedYear) && selectedMonth === "February") {
        setDays(Array.from({ length: 29 }, (_, i) => i));
      }
      if (
        selectedMonth === "January" ||
        selectedMonth === "March" ||
        selectedMonth === "May" ||
        selectedMonth === "July" ||
        selectedMonth === "September" ||
        selectedMonth === "November"
      ) {
        setDays(Array.from({ length: 32 }, (_, i) => i));
      }
      if (
        selectedMonth === "April" ||
        selectedMonth === "June" ||
        selectedMonth === "August" ||
        selectedMonth === "October" ||
        selectedMonth === "December"
      ) {
        setDays(Array.from({ length: 31 }, (_, i) => i));
      }
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (password != "") {
      setPasswordError(
        !/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/.test(
          password
        )
      );
    }
  }, [password]);
  useEffect(() => {
    setConfirmPasswordError(password !== confirmPassword);
  }, [password, confirmPassword]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col px-6 justify-center md:w-[502px] mx-auto mt-14 bg-white rounded-2xl space-y-5"
      >
        <div className="text-black flex font-sans">Create User Account</div>
        <div className="font-sans mb-[36px] md:shadow-2xl w-full mx-auto md:mt-8 ml-45 p-[52px] bg-white rounded-md space-y-5 overflow-hidden h-fit flex-row">
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-800 text-sm font-bold mb-2 text-left font-sans"
            >
              Full Name:
            </label>
            <TextField
              error={fullNameError}
              type="text"
              label={
                <>
                  Full Name<span style={{ color: "red" }}>*</span>
                </>
              }
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={handleFullNameChange}
              className={`w-full p-2 border ${
                fullNameError ? "border-red-700 border-2" : "border-gray-300"
              } rounded-md bg-white text-black`}
              placeholder="Enter your full name"
              helperText={
                fullNameError
                  ? "Please enter your full name.\n" +
                    "Not empty, no symbols, no spaces around."
                  : ""
              }
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contactNumber"
              className="block text-gray-800 text-sm font-bold mb-2 text-left"
            >
              Contact Number:
            </label>
            <TextField
              error={contactNumberError}
              type="text"
              id="contactNumber"
              label={
                <>
                  Contact Number<span style={{ color: "red" }}>*</span>
                </>
              }
              name="contactNumber"
              value={contactNumber}
              onChange={handleContactNumberChange}
              className={`w-full p-2 border ${
                contactNumberError
                  ? "border-red-700 border-2"
                  : "border-gray-300"
              } rounded-md bg-white text-black`}
              placeholder="Enter your contact number"
              helperText={
                contactNumberError
                  ? "Please enter a valid Canadian phone number format (XXX) XXX-XXXX."
                  : ""
              }
            />
          </div>
          <div className=" text-gray-800 text-sm font-bold text-left">
            Birthdate
          </div>
          <div className="flex-between space-x-10 mb-0">
            <select
              className="bg-white text-date border border-gray-300 pl-2 pr-2 pt-4 pb-4 focus:outline-none rounded "
              id="date"
              name="date"
              value={selectedDay}
              onChange={handleDayChange}
            >
              <option value="">Day</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              className="bg-white text-date border border-gray-300 pl-2 pr-2 pt-4 pb-4 focus:outline-none rounded"
              id="month"
              name="month"
              onChange={handleMonthChange}
            >
              <option value="">Month</option>
              {months.map((month) => {
                return <option key={month.id}>{month.monthName}</option>;
              })}
            </select>
            <select
              className="bg-white text-date border border-gray-300 pl-2 pr-2 pt-4 pb-4 focus:outline-none rounded"
              id="year"
              name="year"
              value={selectedYear}
              onChange={handleYearChange}
            >
              <option value="">Year</option>
              {Array.from({ length: 55 }, (_, index) => {
                const year = currentYear - index;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="userEmail"
              className="block text-gray-700 text-sm font-bold mb-2 text-left font-sans"
            >
              Email:
            </label>
            <TextField
              error={emailError}
              type="text"
              id="email"
              label={
                <>
                  Email Address<span style={{ color: "red" }}>*</span>
                </>
              }
              name="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full p-2 border ${
                emailError ? "border-red-700 border-2" : "border-gray-300"
              } rounded-md bg-white text-black`}
              placeholder="Enter your email"
              helperText={
                emailError ? "Please enter a valid email address." : ""
              }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="userPassword"
              className="block text-gray-700 text-sm font-bold mb-2 text-left font-sans"
            >
              Password:
            </label>
            <TextField
              error={passwordError}
              type="password"
              id="password"
              label={
                <>
                  Create Password<span style={{ color: "red" }}>*</span>
                </>
              }
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full p-2 border ${
                passwordError ? "border-red-700 border-2" : "border-gray-300"
              } rounded-md bg-white text-black`}
              placeholder="Create Password"
              helperText={
                passwordError
                  ? "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
                  : ""
              }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2 text-left"
            >
              Confirm Password:
            </label>
            <TextField
              error={confirmPasswordError}
              type="password"
              label={
                <>
                  Confirm Password<span style={{ color: "red" }}>*</span>
                </>
              }
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`w-full p-2 border ${
                confirmPasswordError
                  ? "border-red-700 border-2"
                  : "border-gray-300"
              } rounded-md bg-white text-black`}
              placeholder="Confirm Password"
              helperText={confirmPasswordError ? "Passwords do not match" : ""}
            />
          </div>
        </div>
        <div className="flex flex-col shadow-2xl mt-65 md:shadow-none items-center md:flex-row md:justify-center gap-x-4">
          <button
            className="bg-white hover:bg-gray-100 text-teal-600 py-2 px-4 border border-gray-400 rounded shadow sm:w-[450px] md:w-36 md:h-12"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#127C95]  border-blue-2 text-blue p-2 rounded-md hover:bg-blue-700 focus:outline-blue w-full h-12 md:w-36 md:h-12"
          >
            Submit
          </button>
        </div>
        <ToastContainer />
      </form>
    </>
  );
};

export default UserForm;