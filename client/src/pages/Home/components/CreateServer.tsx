import { CancelSvg, RightArrowSvg } from "../../../common/static/svg";
import { CreateServerImg } from "../../../common/static/img";

const CreateServer = (props: any) => {
  const { setIsCreateServerOpen } = props;

  return (
    <div className="bg-[black] w-screen h-screen fixed top-0 left-0 z-10 flex items-center justify-center bg-opacity-70">
      <div className="bg-[#313338] w-[470px] shadow-xl border border-[#242628] relative flex flex-col items-center">
        <CancelSvg
          className="h-5 w-5 absolute right-5 top-5"
          onClick={() => {
            setIsCreateServerOpen(false);
          }}
        />

        <div className="w-full p-4 mt-2 text-center">
          <h2 className="text-white text-[25px] font-semibold mb-2">
            Create Your Server
          </h2>
          <p className="text-center mb-3 text-[#94999F]">
            Your server is where you and your friends hang out. Make yours and
            start talking.
          </p>

          <div className="w-full h-[70px] border border-[#3F4147] rounded-lg p-3 flex items-center justify-between hover:bg-[#34363b] cursor-pointer">
            <div className="h-full flex items-center">
              <img src={CreateServerImg} alt="" className="h-full mr-3"/>
              <h6 className="text-white font-medium">Create My Own</h6>
            </div>
            <RightArrowSvg color={"#4F5660"} height={"35px"} width={"35px"} />
          </div>
        </div>

        <div className="bg-[#2B2D31] w-full p-4 text-center">
          <h3 className="text-white text-[20px] font-medium mb-2">
            Have an invite ready?
          </h3>
          <button className="w-full bg-[#4E5058] text-white rounded-md p-2 hover:bg-[#64656d]">
            Join a Server
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateServer;
