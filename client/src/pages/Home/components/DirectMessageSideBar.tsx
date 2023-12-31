import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { directMessageSideBarChannels } from "../constants";
import { DefaultProfileSvg } from "../../../common/static/svg";
import { ChannelWrapper, CreateDm } from ".";
import { useGetChatsQuery } from "../../../api/dmChatApiSlice";
import { useAppSelector } from "../../../app/hooks";
import { selectAuthId } from "../../../app/features/authSlice";

const DirectMessageSideBar = () => {
  const id = useAppSelector(selectAuthId);
  const [isCreateDmOpen, setIsCreateDmOpen] = useState<boolean>(false);

  const { currentData, isFetching } = useGetChatsQuery(id);

  const navigate = useNavigate();

  return (
    <div className="h-full w-full bg-[#2B2D31]">
      <div className="w-full h-[48px] border-b border-b-[#1F2023] flex items-center justify-center">
        <div className="w-[224px] h-[28px] bg-[#1E1F22] text-[#949BA0] text-[13px] pl-2 flex items-center rounded-sm">
          <p>Find or start a conversation</p>
        </div>
      </div>

      <div className="w-full px-2 mt-2">
        <ul>
          {directMessageSideBarChannels.map((channel, idx) => {
            return (
              <ChannelWrapper
                key={idx}
                Icon={channel.icon}
                label={channel.label}
                route={channel.route}
              />
            );
          })}
        </ul>

        <ul className="w-full text-[#949BA0] mt-4">
          <span
            className="pl-3 text-[11px] tracking-wider hover:text-[white] cursor-default relative"
            onClick={() => setIsCreateDmOpen((prev: boolean) => !prev)}
          >
            DIRECT MESSAGES
          </span>
          {isFetching
            ? null
            : currentData.map((dmChat: any) => {
                return (
                  <li
                    className="w-full h-[40px] mb-[2px] flex items-center px-2 rounded-sm hover:bg-[#34363b] hover:text-[white] cursor-pointer"
                    key={dmChat.chatId}
                    onClick={() => navigate(`message/${dmChat.chatId}`)}
                  >
                    {dmChat.userProfilePicture ? (
                      <></>
                    ) : (
                      <DefaultProfileSvg className="w-[35px] h-[35px] mr-2" />
                    )}
                    <span>{dmChat.username}</span>
                  </li>
                );
              })}
        </ul>
        {isCreateDmOpen ? <CreateDm chats={currentData} /> : null}
      </div>
    </div>
  );
};

export default DirectMessageSideBar;

// 34363b
