import { useState } from "react";
import { RegisterForm, ProfilePictureSelect } from "./components";
import { LoginRegisterBg } from "../../common/static/img";

const Register = () => {
  const [page, setPage] = useState<Number>(0);

  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-[#5865F2]`}
      style={{
        backgroundImage: `url('${LoginRegisterBg}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        width: "full",
        backgroundPosition: "center",
      }}
    >
      {page === 0 ? <RegisterForm setPage={setPage} /> : <ProfilePictureSelect />}
    </div>
  );
};

export default Register;
