import { useState, useRef } from "react";
import { DefaultProfileSvg } from "../../../common/static/svg";

const ProfilePictureSelect = () => {
  const [currentImage, setCurrentImage] = useState<any>(null);
  const inputSelect = useRef<any>();

  const handleFileUpload = (e: any): void => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file)
    convertFileToBase64(file);
  };

  const convertFileToBase64 = (file: any): void => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setCurrentImage(fileReader.result);
    };
    fileReader.onerror = (error) => {
      console.log(error);
    };
  };

  const handleSubmitProfilePicture = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    const file = inputSelect.current.target.files[0]
  };

  const handleRemoveProfilePicture = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    inputSelect.current.value = null;
    setCurrentImage(null);
  }

  return (
    <div className="w-[480px] h-[646px] bg-[#313338] p-8 rounded-md flex flex-col items-center">
      {currentImage !== null ? (
        <img
          src={currentImage}
          alt=""
          className="w-36 aspect-square rounded-full"
        />
      ) : (
        <DefaultProfileSvg className="w-36 aspect-square rounded-full" />
      )}
      <input
        type="file"
        accept=".jpeg, .png, .jpg"
        onChange={handleFileUpload}
        ref={inputSelect}
      />
      <button onClick={handleRemoveProfilePicture}>Remove</button>
      <button className="w-full h-[44px] bg-[#5865F2] rounded-sm text-[#F2F3F5] font-semibold mt-5 mb-1" onClick={handleSubmitProfilePicture}>
        Continue
      </button>
      
    </div>
  );
};

export default ProfilePictureSelect;
