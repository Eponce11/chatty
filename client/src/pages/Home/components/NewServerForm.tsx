import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectAuthUsername } from "../../../app/features/authSlice";

const NewServerForm = (props: any) => {
  const { setCurrentSection } = props;
  const username = useAppSelector(selectAuthUsername);
  const [serverName, setServerName] = useState<string>(`${username} server`);

  return (
    <>
      <div className="w-full p-4 mt-2 text-center">
        <h2 className="text-white text-[25px] font-semibold mb-2">
          Customize Your Server
        </h2>
        <p className="text-center mb-3 text-[#94999F]">
          Give your new server a personality with a name and an icon. You can
          always change it later.
        </p>

        <div className="w-full text-left">
          <label className="text-[#B2B7BD] text-[11px] tracking-wide font-bold">
            SERVER NAME
          </label>
          <input
            type="text"
            className="w-full h-[40px] bg-[#1E1F22] text-[#F2F3F5] outline-none pl-2 rounded-sm mt-1"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-[#2B2D31] w-full p-4 text-center flex items-center justify-between">
        <span
          className="text-white cursor-pointer"
          onClick={() => {
            setCurrentSection("CREATEORJOINSERVER");
          }}
        >
          Back
        </span>
        <button className="bg-[#5865F2] text-white rounded-sm hover:bg-[#64656d] px-4 py-2">
          Create
        </button>
      </div>
    </>
  );
};

export default NewServerForm;
