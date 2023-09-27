import {
  ServerSelect,
  DirectMessageSideBar,
  MessageChannel,
  Header,
} from "./components";

const Home = () => {
  return (
    <div className="h-full w-full bg-[#1E1F22] flex px-1">
      <ServerSelect />
      <div className="w-[240px] h-full relative">
        <DirectMessageSideBar />
        <div className="w-full h-[53px] bg-[red] absolute bottom-0"></div>
      </div>

      <div className="grow bg-[#313338] relative">
        <Header />
        <div className="absolute top-[48px] bottom-0 w-full flex">
          <MessageChannel />
          <div className="w-[340px] h-full bg-[red]"></div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
