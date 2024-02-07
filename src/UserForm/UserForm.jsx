import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import 'react-toastify/dist/ReactToastify.css';

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullNameError, setFullNameError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedYear , setSelectedYear] = useState("")
  const days = Array.from({length:31} , (_,index) => index + 1)
  const [nameError , setNameError] = useState("")
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    if (fullNameError) {
      setFullNameError(false);
    }
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
    if (contactNumberError) {
      setContactNumberError(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError(false);
    }
  };
  
  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };
  
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (confirmPasswordError) {
      setConfirmPasswordError(false);
    }
  };
  
  const handleCancel = () => {
    setFullName("");
    setContactNumber("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };



  const handleSubmit = (e) => {
    e.preventDefault();
  
    let errorMessage = "";
    const regex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@.#$!%?&])[A-Za-z\d@.#$!%?&]{8,15}$/; 
    const patternNotSymbol = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    const patternNotSpace = /^[A-Za-z]+ [A-Za-z]+$/;

    if (!fullName.trim() || !patternNotSymbol.test(fullName) || !patternNotSpace.test(fullName)) {
      errorMessage = "Please enter your full name.\n" + "Not empty, no symbols, no spaces around.";
      setFullNameError(true);
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(contactNumber.trim())) {
      errorMessage = "Please enter a valid Canadian phone number format (XXX) XXX-XXXX.";
      setContactNumberError(true);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errorMessage = "Please enter a valid email address.";
      setEmailError(true);
    } else if (password !== confirmPassword ) {
      errorMessage = "Passwords do not match.";
      setPasswordError(true);
      setConfirmPasswordError(true);
    } else if (!regex.test(password)) {
      errorMessage = "Password must contain:\n" + 
        "- At least one lowercase alphabet (a-z)\n" +
        "- At least one uppercase alphabet (A-Z)\n" +
        "- At least one numeric digit (0-9)\n" +
        "- At least one special character (@, $, ., #, !, %, *, ?, &, ^)\n" +
        "- Length must be between 8 and 15 characters";
      setPasswordError(true);
    }

    if(fullName.length < 3){
      setNameError(true)
    }
    else{
      setNameError(false)
    }
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }
  
    toast.success('Your details have been successfully submitted.', { fullName, contactNumber, email});
  };
  

  return (
    <>
    <form onSubmit={handleSubmit} className="flex flex-col px-6 justify-center max-w-md mx-auto mt-14 bg-white rounded-2xl space-y-5">
    <div className='text-black text-left font-sans'>
    Create User Account 
    </div>
      <div className='font-sans md:shadow-2xl w-[500px] h-[650px] mx-auto mt-8 ml-45 p-12 pb-0 bg-white rounded-md space-y-5'>
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-gray-800 text-sm font-bold mb-2 text-left font-sans">
          Full Name:
        </label>
        <TextField
        required
        error = {fullNameError}
          type="text"
          label = "Full Name"
          id="fullName"
          name="fullName"
          value={fullName}
          onChange={handleFullNameChange}
          className={"w-full p-2 border ${fullNameError ? 'border-red-700 border-2' : 'border-gray-300'} rounded-md bg-white text-black"}
          placeholder="Enter your full name"
          helperText = {fullNameError ? "Please enter your full name.\n" + "Not empty, no symbols, no spaces around." : ""}
        />

      </div>
      <div className="mb-4">
        <label htmlFor="contactNumber" className="block text-gray-800 text-sm font-bold mb-2 text-left">
          Contact Number:
        </label>
        <TextField
        required
        error = {contactNumberError}
          type="text"
          id="contactNumber"
          label = "Contact Number"
          name="contactNumber"
          value={contactNumber}
          onChange={handleContactNumberChange}
          className={"w-full p-2 border ${contactNumberError ? 'border-red-700 border-2' : 'border-gray-300'} rounded-md bg-white text-black"}
          placeholder="Enter your contact number"
          helperText = {contactNumberError ? "Please enter a valid Canadian phone number format (XXX) XXX-XXXX." : ""  }
        />
      </div>
      <div className='flex-between space-x-10'>
      <select className='bg-white text-black border-black' id="month" name="month">
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
        <select className='bg-white text-black border-black' id="date" name="date" value={selectedDay} onChange={handleDayChange}>
          {days.map((day) => {
           return <option key = {day} value={day}>{day}</option>
          })}
        </select>
        <select className='bg-white text-black border-black' id="year" name="year" value={selectedYear} onChange={handleYearChange}>
          {Array.from({length: 55}, (_, index) => {
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
        <TextField
        required
        error = {emailError}
          type="email"
          id="email"
          label = "Email Address"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className={"w-full p-2 border ${emailError ? 'border-red-700 border-2' : 'border-gray-300'} rounded-md bg-white text-black"}
          placeholder="Enter your email"
          helperText = {emailError ? "Please enter a valid email address." : ""}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="userPassword" className="block text-gray-700 text-sm font-bold mb-2 text-left font-sans">
          Password:
        </label>
        <TextField
        required
        error = {passwordError}
          type="password"
          id="password"
          label= "Create Password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          className={"w-full p-2 border ${passwordError ? 'border-red-700 border-2' : 'border-gray-300'} rounded-md bg-white text-black"}
          placeholder="Create Password"
          helperText = {passwordError ? "Password must contain:\n" + 
          "- At least one lowercase alphabet (a-z)\n" +
          "- At least one uppercase alphabet (A-Z)\n" +
          "- At least one numeric digit (0-9)\n" +
          "- At least one special character (@, $, ., #, !, %, *, ?, &, ^)\n" +
          "- Length must be between 8 and 15 characters" : ""}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2 text-left">
          Confirm Password:
        </label>
        <TextField
        required
        error = {confirmPasswordError}
          type="password"
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={"w-full p-2 border ${confirmPasswordError ? 'border-red-700 border-2' : 'border-gray-300'} rounded-md bg-white text-black"}
          placeholder="Confirm Password"
        />
      </div>
      </div>
      <div  className="flex flex-col shadow-2xl md:shadow-none items-center ml-20 md:flex-row md:justify-center gap-x-4 md:ml-0">
        <Button
        variant='outlined'
          className="bg-teal-600 sha border-blue text-blue p-2 rounded-md hover:bg-blue-700 focus:outline-blue w-full h-12 md:w-36 md:h-12 "
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
        variant='contained'
          type="submit"
          className="bg-teal-600 border-blue-700 text-white p-2 rounded-md hover:bg-blue-700 w-full focus:outline-none md:w-36 md:h-12 ml-3"
        >
          Submit
        </Button>
      </div>
      <ToastContainer/>
    </form>
    </>
  );
};

// export default UserForm;
// <div class="container flex:column" >

// <div clasname="firstnameLastnameDate">

//     <div classname="firstnameLastname">
//         <div class="firstname"></div>
//         <div class="lastname"></div>
//     </div>
//     <div class="date"></div>

// </div>

// </div>



// .firstnameLastname {
// greaterthan 480px {
//     flex-direction: row
// }
// }

// .firstnameLastnameDate {
//  greaterthan 1080px {
//     flex-direction: row
// }
// }