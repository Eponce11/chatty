import React, { useState } from "react";
import { useRegisterMutation } from "../../../api/authApiSlice";
import { months, days, years } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { setCredentials } from "../../../app/features/authSlice";

const RegisterForm = (props: any) => {
  const { setPage } = props;
  const [formData, setFormData] = useState<any>({
    email: "",
    displayName: "",
    username: "",
    password: "",
    year: "",
    month: "",
    day: "",
  });
  const [register, { error }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { email, displayName, username, password, year, month, day } = formData;

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    e.preventDefault();
    setFormData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    let dob = "";
    if (month && day && year) dob = `${month}-${day}-${year}`;

    const sentData = {
      email,
      displayName,
      username,
      password,
      dob,
      profilePicture: null,
    };
    const returnData = await register(sentData).unwrap();
    console.log(returnData);
    dispatch(setCredentials(returnData));
    setPage(1);
  };
  return (
    <div className="w-[480px] h-[646px] bg-[#313338] p-8 rounded-md">
      <h2 className="text-[#F2F3F5] text-center text-[22px] font-bold mb-3">
        Create an account
      </h2>
      <label
        className={`text-[${
          !error?.email ? "#B2B7BD" : "#F9767B"
        }] text-[11px] tracking-wide font-bold`}
      >
        EMAIL
        {!error?.email ? (
          <span className="text-[red]"> *</span>
        ) : (
          <span className="text-[#F9767B] italic font-medium">
            {` - ${error.email.message}`}
          </span>
        )}
      </label>
      <input
        type="text"
        className="w-full h-[40px] bg-[#1E1F22] text-[#F2F3F5] outline-none pl-2 rounded-sm mt-1 mb-3"
        name="email"
        onChange={handleOnChange}
        value={email}
      />
      <label className="text-[#B2B7BD] text-[11px] tracking-wide font-bold">
        DISPLAY NAME
      </label>
      <input
        type="text"
        className="w-full h-[40px] bg-[#1E1F22] text-[#F2F3F5] outline-none pl-2 rounded-sm mt-1 mb-3"
        name="displayName"
        onChange={handleOnChange}
        value={displayName}
      />
      <label
        className={`text-[${
          !error?.username ? "#B2B7BD" : "#F9767B"
        }] text-[11px] tracking-wide font-bold`}
      >
        USERNAME
        {!error?.username ? (
          <span className="text-[red]"> *</span>
        ) : (
          <span className="text-[#F9767B] italic font-medium">
            {` - ${error.username.message}`}
          </span>
        )}
      </label>
      <input
        type="text"
        className="w-full h-[40px] bg-[#1E1F22] text-[#F2F3F5] outline-none pl-2 rounded-sm mt-1 mb-3"
        name="username"
        onChange={handleOnChange}
        value={username}
      />
      <label
        className={`text-[${
          !error?.password ? "#B2B7BD" : "#F9767B"
        }] text-[11px] tracking-wide font-bold`}
      >
        PASSWORD
        {!error?.password ? (
          <span className="text-[red]"> *</span>
        ) : (
          <span className="text-[#F9767B] italic font-medium">
            {` - ${error.password.message}`}
          </span>
        )}
      </label>
      <input
        type="text"
        className="w-full h-[40px] bg-[#1E1F22] text-[#F2F3F5] outline-none pl-2 rounded-sm mt-1 mb-3"
        name="password"
        onChange={handleOnChange}
        value={password}
      />
      <label
        className={`text-[${
          !error?.dob ? "#B2B7BD" : "#F9767B"
        }] text-[11px] tracking-wide font-bold`}
      >
        DATE OF BIRTH
        {!error?.dob ? (
          <span className="text-[red]"> *</span>
        ) : (
          <span className="text-[#F9767B] italic font-medium">
            {` - ${error.dob.message}`}
          </span>
        )}
      </label>
      <div className="flex justify-between mt-1">
        <select
          className="bg-[#1E1F22] text-[#B2B7BD] h-[40px] w-[130px] rounded-sm"
          name="month"
          onChange={handleOnChange}
          value={month}
        >
          <option value="" disabled hidden>
            Month
          </option>
          {months.map((month: string, idx: number) => {
            return <option key={idx}>{month}</option>;
          })}
        </select>
        <select
          className="bg-[#1E1F22] text-[#B2B7BD] h-[40px] w-[130px] rounded-sm"
          name="day"
          onChange={handleOnChange}
          value={day}
        >
          <option value="" disabled hidden>
            Day
          </option>
          {days.map((day: number, idx: number) => {
            return <option key={idx}>{day}</option>;
          })}
        </select>
        <select
          className="bg-[#1E1F22] text-[#B2B7BD] h-[40px] w-[130px] rounded-sm"
          name="year"
          onChange={handleOnChange}
          value={year}
        >
          <option value="" disabled hidden>
            Year
          </option>
          {years.map((year: number, idx: number) => {
            return <option key={idx}>{year}</option>;
          })}
        </select>
      </div>
      <button
        className="w-full h-[44px] bg-[#5865F2] rounded-sm text-[#F2F3F5] font-semibold mt-5 mb-1"
        onClick={handleRegister}
      >
        Continue
      </button>
      <span className="text-[#94999F] text-[12px]">
        By registering, you agree to Discord's
        <span className="text-[12px] text-[#069AE4]"> Terms of Service </span>
        and
        <span className="text-[12px] text-[#069AE4]"> Privacy Policy</span>
      </span>
      <p className="text-[14px] text-[#069AE4] mt-5">
        <Link to="/login">Already have an account?</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
