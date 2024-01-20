import { useState } from "react";
import { CancelSvg } from "../../../common/static/svg";
import { CreateOrJoinServer, NewServerForm } from ".";

type ServerSelectSection = "NEWSERVER" | "JOINSERVER" | "CREATEORJOINSERVER";

const CreateServer = (props: any) => {
  const { setIsCreateServerOpen } = props;
  const [currentSection, setCurrentSection] =
    useState<ServerSelectSection>("CREATEORJOINSERVER");

  return (
    <div className="bg-[black] w-screen h-screen fixed top-0 left-0 z-10 flex items-center justify-center bg-opacity-70">
      <div className="bg-[#313338] w-[470px] shadow-xl border border-[#242628] relative flex flex-col items-center rounded-md">
        <CancelSvg
          className="h-5 w-5 absolute right-5 top-5"
          onClick={() => {
            setIsCreateServerOpen(false);
          }}
        />

        {currentSection === "CREATEORJOINSERVER" && <CreateOrJoinServer setCurrentSection={setCurrentSection} />}

        {currentSection === "NEWSERVER" && <NewServerForm setCurrentSection={setCurrentSection} />}
      </div>
    </div>
  );
};

export default CreateServer;
