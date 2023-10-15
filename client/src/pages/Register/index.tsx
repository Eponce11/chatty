import React, { useState } from "react";
import { months, days, years } from "./constants";

const Register = () => {
  const [formData, setFormData] = useState<any>({
    email: "",
    displayName: "",
    username: "",
    password: "",
    year: "",
    month: "",
    day: "",
  });

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
    const DOB = `${month}-${day}-${year}`;
    const sentData = {
      email,
      displayName,
      username,
      password,
      DOB
    }
    console.log(sentData)
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[480px] h-[646px] bg-[#313338] p-8 rounded-md">
        <h2 className="text-[#F2F3F5] text-center text-[22px] font-bold mb-3">
          Create an account
        </h2>
        <label className="text-[#B2B7BD] text-[11px] tracking-wide font-bold">
          EMAIL <span className="text-[red]">*</span>
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
        <label className="text-[#B2B7BD] text-[11px] tracking-wide font-bold">
          USERNAME <span className="text-[red]">*</span>
        </label>
        <input
          type="text"
          className="w-full h-[40px] bg-[#1E1F22] text-[#F2F3F5] outline-none pl-2 rounded-sm mt-1 mb-3"
          name="username"
          onChange={handleOnChange}
          value={username}
        />
        <label className="text-[#B2B7BD] text-[11px] tracking-wide font-bold">
          PASSWORD <span className="text-[red]">*</span>
        </label>
        <input
          type="text"
          className="w-full h-[40px] bg-[#1E1F22] text-[#F2F3F5] outline-none pl-2 rounded-sm mt-1 mb-3"
          name="password"
          onChange={handleOnChange}
          value={password}
        />
        <label className="text-[#B2B7BD] text-[11px] tracking-wide font-bold">
          DATE OF BIRTH <span className="text-[red]">*</span>
        </label>
        <div className="flex justify-between">
          <select
            className="bg-[#1E1F22] text-[#B2B7BD] h-[40px] w-[130px]"
            name="month"
            onChange={handleOnChange}
            value={month}
          >
            {months.map((month: string) => {
              return <option>{month}</option>;
            })}
          </select>
          <select
            className="bg-[#1E1F22] text-[#B2B7BD] h-[40px] w-[130px]"
            name="day"
            onChange={handleOnChange}
            value={day}
          >
            {days.map((day: number) => {
              return <option>{day}</option>;
            })}
          </select>
          <select
            className="bg-[#1E1F22] text-[#B2B7BD] h-[40px] w-[130px]"
            name="year"
            onChange={handleOnChange}
            value={year}
          >
            {years.map((year: number) => {
              return <option>{year}</option>;
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
        <span className="text-[12px] text-[#069AE4]">
          Already have an account?
        </span>
      </div>
    </div>
  );
};

export default Register;
