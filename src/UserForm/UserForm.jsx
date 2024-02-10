import { useState, useEffect } from 'react';
import {useForm , Controller} from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import 'react-toastify/dist/ReactToastify.css';

const UserForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const register = useForm();
  // const [fullNameError, setFullNameError] = useState(false);
  // const [contactNumberError, setContactNumberError] = useState(false);
  // const [emailError, setEmailError] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);
  // const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i));
  const [leapYear, setLeapYear] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  // const [nameError, setNameError] = useState("");
  let errorMessage = "";
  const regex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@.#$!%?&])[A-Za-z\d@.#$!%?&]{8,15}$/;
  const patternNotSymbol = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
  const patternNotSpace = /^[A-Za-z]+ [A-Za-z]+$/;

  // const handleFullNameChange = (e) => {
  //   if (!fullName.trim() || !patternNotSymbol.test(fullName) || !patternNotSpace.test(fullName)) {
  //     setFullNameError(true);
  //   } else {
  //     setFullNameError(false)
  //   }
  //   setFullName(e.target.value);
  //   // if (fullNameError) {
  //   //   setFullNameError(false);
  //   // }
  // };

  // const handleContactNumberChange = (e) => {
  //   if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(contactNumber.trim())) {
  //     errorMessage = "Please enter a valid Canadian phone number format (XXX) XXX-XXXX.";
  //     setContactNumberError(true);
  //   }
  //   setContactNumber(e.target.value);
  //   if (contactNumberError) {
  //     setContactNumberError(false);
  //   }
  // };

  // const handleEmailChange = (e) => {
  //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
  //     errorMessage = "Please enter a valid email address.";
  //     setEmailError(true);
  //   }
  //   setEmail(e.target.value);
  //   if (emailError) {
  //     setEmailError(false);
  //   }
  // };

  // const handleDayChange = (e) => {
  //   setSelectedDay(e.target.value);
  // };

  // const handleMonthChange = (e) => {
  //   setSelectedMonth(e.target.value);
  // };

  // const handleYearChange = (e) => {
  //   setSelectedYear(e.target.value);
  //   console.log(e.target.value);
  //   if (isLeapYear(e.target.value)) {
  //     setLeapYear(true);
  //   }
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  //   if (passwordError) {
  //     setPasswordError(false);
  //   }
  // };

  // const handleConfirmPasswordChange = (e) => {
  //   if (password !== confirmPassword) {
  //     errorMessage = "Passwords do not match.";
  //     setConfirmPasswordError(true);
  //   }
  //   setConfirmPassword(e.target.value);
  //   if (confirmPasswordError) {
  //     setConfirmPasswordError(false);
  //   }
  // };

  // const handleCancel = () => {
  //   setFullName("");
  //   setContactNumber("");
  //   setEmail("");
  //   setPassword("");
  //   setConfirmPassword("");
  // };

  // const isLeapYear = (year) => {
  //   return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!fullName.trim() || !patternNotSymbol.test(fullName) || !patternNotSpace.test(fullName)) {
  //     errorMessage = "Please enter your full name.\n" + "Not empty, no symbols, no spaces around.";
  //     setFullNameError(true);
  //   } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(contactNumber.trim())) {
  //     errorMessage = "Please enter a valid Canadian phone number format (XXX) XXX-XXXX.";
  //     setContactNumberError(true);
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
  //     errorMessage = "Please enter a valid email address.";
  //     setEmailError(true);
  //   } else if (password !== confirmPassword) {
  //     errorMessage = "Passwords do not match.";
  //     setPasswordError(true);
  //     setConfirmPasswordError(true);
  //   } else if (!regex.test(password)) {
  //     errorMessage = "Password must contain:\n" +
  //       "- At least one lowercase alphabet (a-z)\n" +
  //       "- At least one uppercase alphabet (A-Z)\n" +
  //       "- At least one numeric digit (0-9)\n" +
  //       "- At least one special character (@, $, ., #, !, %, *, ?, &, ^)\n" +
  //       "- Length must be between 8 and 15 characters";
  //     setPasswordError(true);
  //   }

  //   if (fullName.length < 3) {
  //     setNameError(true);
  //   } else {
  //     setNameError(false);
  //   }
  //   if (errorMessage) {
  //     toast.error(errorMessage);
  //     return;
  //   }

  //   toast.success('Your details have been successfully submitted.', { fullName, contactNumber, email });
  // };

  // useEffect(() => {
  //   if (selectedYear && selectedMonth === '2' && isLeapYear(selectedYear)) {
  //     setLeapYear(true);
  //     setDays(Array.from({ length: 30 }, (_, i) => i));
  //   } else if (selectedMonth === '1' || selectedMonth === '3' || selectedMonth === '5' || selectedMonth === '7' || selectedMonth === "9" || selectedMonth === "11") {
  //     setDays(Array.from({ length: 32 }, (_, i) => i));
  //   } else if (selectedMonth === '2') {
  //     setDays(Array.from({ length: 29 }, (_, i) => i));
  //   } else {
  //     setLeapYear(false);
  //     setDays(Array.from({ length: 31 }, (_, i) => i));
  //   }
  // }, [selectedYear, selectedMonth]);

  return (
    <>
      <form className="flex flex-col px-6 justify-center md:w-[502px] mx-auto mt-14 bg-white rounded-2xl space-y-5">
        <div className='text-black flex font-sans'>Create User Account</div>
        <div className='font-sans mb-[36px] md:shadow-2xl w-full h-[650px] mx-auto md:mt-8 ml-45 p-12 pb-0 bg-white rounded-md space-y-5'>
        <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-800 text-sm font-bold mb-2 text-left font-sans">
              Full Name:
            </label>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{ required: 'Full Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label={<>Full Name<span style={{ color: "red" }}>*</span></>}
                  id="fullName"
                  className={`w-full p-2 border rounded-md bg-white text-black`}
                  placeholder="Enter your full name"
                />
              )}
            />
            {errors.fullName && <span style={{ color: 'red' }}>{errors.fullName.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="contactNumber" className="block text-gray-800 text-sm font-bold mb-2 text-left">
              Contact Number:
            </label>
            <Controller
              name="contactNumber"
              control={control}
              defaultValue=""
              rules={{ required: 'Contact Number is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label={<>Contact Number<span style={{ color: "red" }}>*</span></>}
                  id="contactNumber"
                  className={`w-full p-2 border rounded-md bg-white text-black`}
                  placeholder="Enter your contact number"
                />
              )}
            />
            {errors.contactNumber && <span style={{ color: 'red' }}>{errors.contactNumber.message}</span>}
          </div>
          <div className='flex-between space-x-10'>
            <select className='bg-white text-date border-black' id="date" name="date">
              <option value="">Day</option>
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <select className='bg-white text-date border-date' id="month" name="month">
              <option value="">Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <select className='bg-white text-date border-black' id="year" name="year">
              <option value="">Year</option>
              {Array.from({ length: 55 }, (_, index) => {
                const year = 2024 - index;
                return (
                  <option key={year} value={year}>{year}</option>
                );
              })}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="userEmail" className="block text-gray-700 text-sm font-bold mb-2 text-left font-sans">
              Email:
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label={<>Email Address<span style={{ color: "red" }}>*</span></>}
                  id="email"
                  className={`w-full p-2 border ${errors.email ? 'border-red-700 border-2' : 'border-gray-300'} rounded-md bg-white text-black`}
                  placeholder="Enter your email"
                />
              )}
            />
            {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="userPassword" className="block text-gray-700 text-sm font-bold mb-2 text-left font-sans">
              Password:
            </label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label={<>Create Password<span style={{ color: "red" }}>*</span></>}
                  id="password"
                  className={`w-full p-2 border ${errors.password ? 'border-red-700 border-2' : 'border-gray-300'} rounded-md bg-white text-black`}
                  placeholder="Create Password"
                />
              )}
            />
            {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2 text-left">
              Confirm Password:
            </label>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{ required: 'Confirm Password is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label={
                    <>
                      Confirm Password<span style={{ color: 'red' }}>*</span>
                    </>
                  }
                  id="confirmPassword"
                  className={`w-full p-2 border ${errors.confirmPassword ? 'border-red-700 border-2' : 'border-gray-300'} rounded-md bg-white text-black`}
                  placeholder="Confirm Password"
                />
              )}
            />
            {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword.message}</span>}
          </div>
        </div>
        <div className="flex flex-col shadow-2xl mt-65 md:shadow-none items-center md:flex-row md:justify-center gap-x-4">
          <button
            className="bg-white hover:bg-gray-100 text-teal-600 py-2 px-4 border border-gray-400 rounded shadow sm:w-[450px] md:w-36 md:h-12"
          >
            Cancel
          </button>
          <button type="submit" className="bg-[#127C95]  border-blue-2 text-blue p-2 rounded-md hover:bg-blue-700 focus:outline-blue w-full h-12 md:w-36 md:h-12">
            Submit
          </button>
        </div>
        <ToastContainer />
      </form>
    </>
  );
};

export default UserForm;
