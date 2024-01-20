import { useState } from "react";

const JoinServer = (props: any) => {
  const { setCurrentSection } = props;
  const [inviteLink, setInviteLink] = useState<string>("");

  return (
    <>
      <div className="w-full p-4 mt-2 text-center">
        <h2 className="text-white text-[25px] font-semibold mb-2">
          Join a Server
        </h2>
        <p className="text-center mb-3 text-[#94999F] text-[15px]">
          Enter an invite link below to join an existing server
        </p>

        <div className="w-full text-left">
          <label className="text-[#B2B7BD] text-[11px] tracking-wide font-bold">
            INVITE LINK <span className="text-[red]"> *</span>
          </label>
          <input
            type="text"
            className="w-full h-[40px] bg-[#1E1F22] text-[#F2F3F5] outline-none pl-2 rounded-sm mt-1"
            value={inviteLink}
            onChange={(e) => setInviteLink(e.target.value)}
            placeholder="hTKzmak"
          />
        </div>
        <div className="w-full text-left mt-3">
          <p className="text-[#B2B7BD] text-[12px] tracking-wide font-bold text-left mb-2">
            INVITES SHOULD LOOK LIKE
          </p>
          <p className="text-[#ffffff] text-[13px] tracking-wide text-left">
            hTKzmak
          </p>
          <p className="text-[#ffffff] text-[13px] tracking-wide text-left my-1">
            qVerMw
          </p>
          <p className="text-[#ffffff] text-[13px] tracking-wide text-left">
            PSciRwz
          </p>
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
          Join Server
        </button>
      </div>
    </>
  );
};

export default JoinServer;
