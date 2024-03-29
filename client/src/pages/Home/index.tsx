import { useState, useEffect } from "react";
import {
  ServerSelect,
  DirectMessageSideBar,
  ServerChatSidebar,
  MessageChannel,
  Header,
  UserSidePanel,
  MessageRequestChannel,
  ServerMessageChannel,
} from "./components";
import { useAppSelector } from "../../app/hooks";
import {
  selectAuthId,
  selectAuthUsername,
  selectAuthProfilePicture,
} from "../../app/features/authSlice";
import { Route, Routes } from "react-router-dom";
import { SettingSvg, DefaultProfileSvg } from "../../common/static/svg";
import { io } from "socket.io-client";

const Home = () => {
  const userId = useAppSelector(selectAuthId);
  const username = useAppSelector(selectAuthUsername);
  const profilePicture = useAppSelector(selectAuthProfilePicture);
  const [socket] = useState(() => io(":8000"));

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("add-user", userId);
    });
  }, []);

  return (
    <div className="h-full w-full bg-[#1E1F22] flex px-1">
      <ServerSelect />
      <div className="w-[240px] h-full relative">
        <Routes>
          <Route path="/server/:_serverId/*" element={<ServerChatSidebar />} />
          <Route path="/*" element={<DirectMessageSideBar />} />
        </Routes>

        <div className="w-full h-[53px] bg-[#232428] absolute bottom-0 flex items-center p-2 justify-between">
          <div className="flex items-center">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="profile picture"
                className="w-[35px] h-[35px] mr-2 rounded-full"
              />
            ) : (
              <DefaultProfileSvg className="w-[35px] h-[35px] mr-2" />
            )}
            <span className="text-white">{username}</span>
          </div>
          <SettingSvg />
        </div>
      </div>
      <div className="grow bg-[#313338]">
        <Routes>
          <Route path="/message-request" element={<MessageRequestChannel />} />
          <Route path="/message/:_chatId" element={<MessageChannel socket={socket} />} />
          <Route
            path="/server/:_serverId/:_channelId"
            element={<ServerMessageChannel socket={socket} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
