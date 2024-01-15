import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultProfileSvg } from "../../../common/static/svg";
import { useSetProfilePictureMutation } from "../../../api/userApiSlice";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectAuthId } from "../../../app/features/authSlice";
import { setAuthProfilePicture } from "../../../app/features/authSlice";

const ProfilePictureSelect = () => {
  const [currentImage, setCurrentImage] = useState<any>(null);
  const inputSelect = useRef<any>();
  const [currentFile, setCurrentFile] = useState<any>(null);
  const [setProfilePicture, { error }] = useSetProfilePictureMutation();
  const id = useAppSelector(selectAuthId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFileUpload = (e: any): void => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    convertFileToBase64(file);
  };

  const convertFileToBase64 = (file: any): void => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setCurrentImage(fileReader.result);
      setCurrentFile(file);
    };
    fileReader.onerror = (error) => {
      console.log(error);
    };
  };

  const handleSubmitProfilePicture = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();

    if (currentFile) {
      const response = await setProfilePicture({
        image: currentFile,
        id: id,
      }).unwrap();
      console.log(response.profilePicture);
      dispatch(setAuthProfilePicture(response.profilePicture));
    }
    navigate("/home");
  };

  const handleRemoveProfilePicture = (
    e: React.MouseEvent<HTMLElement>
  ): void => {
    e.preventDefault();
    inputSelect.current.value = null;
    setCurrentImage(null);
    setCurrentFile(null);
  };

  return (
    <div className="w-[480px] bg-[#313338] p-8 rounded-md flex flex-col items-center">
      {currentImage !== null ? (
        <img
          src={currentImage}
          alt=""
          className="w-36 aspect-square rounded-full"
        />
      ) : (
        <DefaultProfileSvg className="w-36 aspect-square rounded-full" />
      )}

      <div className="w-full flex mt-6 justify-center">

        <label className="w-1/3 h-[44px] mr-4 rounded-sm flex items-center justify-center font-semibold bg-[white] ">
          <input
            type="file"
            accept=".jpeg, .png, .jpg"
            onChange={handleFileUpload}
            ref={inputSelect}
            className="hidden"
          />
          <span>Select File</span>
        </label>

        <button
          onClick={handleRemoveProfilePicture}
          className="h-[44px] w-1/3 bg-[red] rounded-sm font-semibold"
        >
          Remove
        </button>
      </div>
      <button
        className="w-full h-[44px] bg-[#5865F2] rounded-sm text-[#F2F3F5] font-semibold mt-10 mb-1"
        onClick={handleSubmitProfilePicture}
      >
        Continue
      </button>
    </div>
  );
};

export default ProfilePictureSelect;
