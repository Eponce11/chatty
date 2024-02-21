import { CancelSvg } from "../../../common/static/svg";

const CreateTextChannel = (props: any) => {
  const { setIsCreateChannelOpen } = props;

  return (
    <div className="bg-[black] w-screen h-screen fixed top-0 left-0 z-10 flex items-center justify-center bg-opacity-70">
      <div className="bg-[#313338] w-[470px] shadow-xl border border-[#242628] relative flex flex-col items-center rounded-md">
        <CancelSvg
          className="h-5 w-5 absolute right-5 top-5"
          onClick={() => {
            setIsCreateChannelOpen(false);
          }}
        />
        <div className="w-full p-4 mt-2 text-center">
          <h2 className="text-white text-[25px] font-semibold mb-2">
            Create Channel
          </h2>
          <p className="text-center mb-3 text-[#94999F]">
            Send messages, images, GIFs, emoji, opinions, and puns
          </p>
          <div className="w-full text-left">
            <label className="text-[#B2B7BD] text-[11px] tracking-wide font-bold">
              CHANNEL NAME
            </label>

            <input
              type="text"
              className="w-full h-[40px] bg-[#1E1F22] text-[#F2F3F5] outline-none pl-2 rounded-sm mt-1"
              placeholder="new-channel"
            />
          </div>
        </div>
        <div className="bg-[#2B2D31] w-full p-4 text-center flex items-center justify-end ">
          <span
            className="text-white cursor-pointer mr-6"
            onClick={() => setIsCreateChannelOpen(false)}
          >
            Cancel
          </span>
          <button className="bg-[#5865F2] text-white rounded-sm hover:bg-[#64656d] px-4 py-2">
            Create Channel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTextChannel;
