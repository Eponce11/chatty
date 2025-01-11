import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAllServerChatsQuery } from "../../../api/serverChatApiSlice";
import { CreateTextChannel } from ".";
import { HashTag } from "../../../common/static/svg";

const ServerChatSidebar = () => {
  const { _serverId } = useParams();
  const { currentData: serverData, isLoading } =
    useGetAllServerChatsQuery(_serverId);
  const navigate = useNavigate();
  const [isCreateChannelOpen, setIsCreateChannelOpen] =
    useState<boolean>(false);

  return (
    <div className="h-full w-full bg-[#2B2D31]">
      {isLoading ? null : (
        <>
          <div className="w-full h-[48px] border-b border-b-[#1F2023] flex items-center justify-center text-left">
            <span className="text-white font-medium w-full ml-4">
              {serverData.title}
            </span>
          </div>

          <ul className="w-full text-[#949BA0] mt-4 px-2">
            <div className="flex items-center justify-between px-2 mb-3">
              <span className="text-[12px] tracking-wider relative">
                TEXT CHANNELS
              </span>
              <div
                className="text-[30px] hover:text-white cursor-pointer"
                onClick={() => setIsCreateChannelOpen(true)}
              >+</div>
            </div>

            {serverData.textChannels.map((channel: any) => {
              return (
                <li
                  className="w-full h-[35px] mb-[2px] flex items-center px-2 rounded-sm hover:bg-[#34363b] hover:text-[white] cursor-pointer"
                  key={channel._id}
                  onClick={() =>
                    navigate(`/home/server/${_serverId}/${channel._id}`)
                  }
                >
                  <HashTag />
                  <span className="ml-1">{channel.title}</span>
                </li>
              );
            })}
          </ul>
          {isCreateChannelOpen ? <CreateTextChannel setIsCreateChannelOpen={setIsCreateChannelOpen}/> : null}
        </>
      )}
    </div>
  );
};

export default ServerChatSidebar;
