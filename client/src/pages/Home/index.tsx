import { ServerSelect, DirectMessageSideBar } from "./components";

const Home = () => {
  return (
    <div className="h-full w-full bg-[#1E1F22] flex p-1">
      <ServerSelect />
      <DirectMessageSideBar />
    </div>
  );
};

export default Home;
