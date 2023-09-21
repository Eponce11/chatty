import { ServerSelect, DirectMessageSideBar, MessageChannel } from "./components";

const Home = () => {
  return (
    <div className="h-full w-full bg-[#1E1F22] flex p-1">
      <ServerSelect />
      <div className="w-[240px] h-full relative">
        <DirectMessageSideBar />
        <div className="w-full h-[53px] bg-[red] absolute bottom-0">
          
        </div>
      </div>
      <MessageChannel />
    </div>
  );
};

export default Home;
