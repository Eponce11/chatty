import { useState, useRef } from "react";
import { useAppSelector } from "../../../app/hooks";
import {
  selectAuthUsername,
  selectAuthId,
} from "../../../app/features/authSlice";
import { useConvertFileToBase64 } from "../../../common/hooks";
import { useCreateServerMutation } from "../../../api/serverApiSlice";

const NewServerForm = (props: any) => {
  const { setCurrentSection } = props;
  const username = useAppSelector(selectAuthUsername);
  const userId = useAppSelector(selectAuthId);
  const [serverName, setServerName] = useState<string>(`${username} server`);
  const [currentImage, setCurrentImage] = useState<any>(null);
  const [currentFile, setCurrentFile] = useState<any>(null);
  const [createServer] = useCreateServerMutation();
  const inputSelect = useRef<any>();

  const handleFileUpload = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      const base64File = await useConvertFileToBase64(file);
      setCurrentImage(base64File);
      setCurrentFile(file);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveProfilePicture = (
    e: React.MouseEvent<HTMLElement>
  ): void => {
    e.preventDefault();
    inputSelect.current.value = null;
    setCurrentImage(null);
    setCurrentFile(null);
  };

  const handleSubmitNewServer = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await createServer({
        userId: userId,
        title: serverName,
        image: currentFile,
      }).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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

        <input
          type="file"
          accept=".jpeg, .png, .jpg"
          onChange={handleFileUpload}
          ref={inputSelect}
          className=""
        />

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
        <button
          className="bg-[#5865F2] text-white rounded-sm hover:bg-[#64656d] px-4 py-2"
          onClick={handleSubmitNewServer}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default NewServerForm;
