const Login = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[480px] h-[404px] bg-[#313338] p-8 rounded-md">
        <h2 className="text-[#F2F3F5] text-center text-[22px] font-bold mb-1">
          Welcome Back!
        </h2>
        <h3 className="text-center text-[#94999F] text-[16px] mb-3">
          We're so excited to see you again!
        </h3>
        <label className="text-[#B2B7BD] text-[11px] tracking-wide font-bold">
          EMAIL OR PHONE NUMBER <span className="text-[red]">*</span>
        </label>
        <input
          type="text"
          className="w-full h-[40px] bg-[#1E1F22] text-[#F2F3F5] outline-none pl-2 rounded-sm mt-1 mb-2"
        />
        <label className="text-[#B2B7BD] text-[11px] tracking-wide font-bold">
          PASSWORD <span className="text-[red]">*</span>
        </label>
        <input
          type="text"
          className="w-full h-[40px] bg-[#1E1F22] text-[#F2F3F5] outline-none pl-2 rounded-sm mt-1"
        />
        <span className="text-[13px] text-[#069AE4]">Forgot your password?</span>
        <button className="w-full h-[44px] bg-[#5865F2] rounded-sm text-[#F2F3F5] font-semibold mt-5 mb-1">
          Log In
        </button>
        <span className="text-[#94999F] text-[13px]">Need an account? <span className="text-[13px] text-[#069AE4]">Register</span></span>
      </div>
    </div>
  );
};

export default Login;

/*
  - Make links change routes
  - use theme colors
*/
