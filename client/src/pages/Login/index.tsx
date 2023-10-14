import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../../api/authApiSlice";
import { useAppDispatch } from "../../app/hooks";
import { setCredentials } from "../../app/features/authSlice";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [login, { error }] = useLoginMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    const loginCred = await login({ email, password }).unwrap();
    console.log(loginCred);
    dispatch(setCredentials(loginCred));
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[480px] h-[404px] bg-[#313338] p-8 rounded-md">
        <h2 className="text-[#F2F3F5] text-center text-[22px] font-bold mb-1">
          Welcome Back!
        </h2>
        <h3 className="text-center text-[#94999F] text-[16px] mb-3">
          We're so excited to see you again!
        </h3>
        <label
          className={`text-[${
            !error ? "#B2B7BD" : "#F9767B"
          }] text-[11px] tracking-wide font-bold`}
        >
          EMAIL OR PHONE NUMBER
          {!error ? (
            <span className="text-[red]"> *</span>
          ) : (
            <span className="text-[#F9767B] italic font-medium">{error}</span>
          )}
        </label>
        <input
          type="text"
          className="w-full h-[40px] bg-[#1E1F22] text-[#F2F3F5] outline-none pl-2 rounded-sm mt-1 mb-3"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          value={email}
        />
        <label
          className={`text-[${
            !error ? "#B2B7BD" : "#F9767B"
          }] text-[11px] tracking-wide font-bold`}
        >
          PASSWORD
          {!error ? (
            <span className="text-[red]"> *</span>
          ) : (
            <span className="text-[#F9767B] italic font-medium">{error}</span>
          )}
        </label>
        <input
          type="text"
          className="w-full h-[40px] bg-[#1E1F22] text-[#F2F3F5] outline-none pl-2 rounded-sm mt-1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          value={password}
        />
        <span className="text-[13px] text-[#069AE4]">
          Forgot your password?
        </span>
        <button
          className="w-full h-[44px] bg-[#5865F2] rounded-sm text-[#F2F3F5] font-semibold mt-5 mb-1"
          onClick={handleLogin}
        >
          Log In
        </button>
        <span className="text-[#94999F] text-[13px]">
          Need an account?{" "}
          <Link className="text-[13px] text-[#069AE4]" to="/register">
            Register
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;

/*
  - Make links change routes
  - use theme colors
*/
