const CreateDm = () => {
  const tempArr = new Array(2).fill(0);

  return (
    <div className="bg-[#313338] h-[400px] w-[440px] absolute left-[210px] shadow-xl border border-[#242628] p-4 z-10">
      <div className="w-full h-full relative">
        <div>
          <h2 className="text-white text-[20px] font-semibold">
            Select or Create DM
          </h2>
          <input
            type="text"
            className="w-full bg-[#1E1F22] h-[34px] px-2 text-[15px] rounded-sm mt-3 text-[#F2F3F5] outline-none"
            placeholder="Type the username"
          />
        </div>
        <div className="bg-[red] top-[95px]  w-full bottom-[55px] absolute">

        </div>
          <button className="bg-[#5865F2] w-full text-white h-[38px] rounded-sm absolute bottom-0">
            Create DM
          </button>
      </div>
    </div>
  );
};

export default CreateDm;
