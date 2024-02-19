import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Header, ServerMembersSidePanel } from ".";
import { DefaultProfileSvg, AddSvg, SendSvg } from "../../../common/static/svg";
import { useGetOneServerChatQuery } from "../../../api/serverChatApiSlice";
import { useCreateServerMessageMutation } from "../../../api/serverMessageApiSlice";
import { useAppSelector } from "../../../app/hooks";
import { selectAuthId } from "../../../app/features/authSlice";

const ServerMessageChannel = () => {
  const { _channelId } = useParams();
  const chatInfo = { username: "Username", userProfilePicture: null };
  const messages: any[] = [];
  const placeHolderBottom = useRef<any>();
  const profilePicture = null;
  const username = "SignedInUserUsername";

  const [message, setMessage] = useState<string>("");
  const { currentData: serverChatData, isLoading } =
    useGetOneServerChatQuery(_channelId);
  const [createServerMessage] = useCreateServerMessageMutation();
  const userId = useAppSelector(selectAuthId);

  const handleNewMessage = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!userId) return;
    const data = {
      channelId: _channelId,
      from: userId,
      message: message,
    };
    const res = await createServerMessage(data).unwrap();
    console.log(res);
  };

  return isLoading ? null : (
    <div className="w-full h-full relative">
      <Header
        title={`${serverChatData.title}`}
        image={chatInfo.userProfilePicture}
      />
      <div className="w-full top-[48px] bottom-0 absolute flex">
        <div className="grow relative">
          <section
            className="w-full top-0 px-3 bottom-[68px] absolute overflow-y-auto"
            ref={placeHolderBottom}
          >
            {messages.map((message: any, idx: number) => {
              return idx !== 0 &&
                messages[idx - 1].fromSelf === message.fromSelf ? (
                <div
                  className={`flex ${
                    idx === messages.length - 1 ? "mb-3" : null
                  }`}
                  key={message.messageId}
                >
                  <div className="w-[40px] rounded-full mr-3 mb-4" />
                  <p className="text-[#C1C5C7]">{message.text}</p>
                </div>
              ) : (
                <div
                  className={`flex mt-5 ${
                    idx === messages.length - 1 ? "mb-5" : null
                  }`}
                  key={message.messageId}
                >
                  {message.fromSelf ? (
                    profilePicture === null ? (
                      <DefaultProfileSvg className="w-[40px] h-[40px] mr-3" />
                    ) : (
                      <img
                        src={profilePicture}
                        alt="profile picture"
                        className="w-[40px] h-[40px] mr-3 rounded-full"
                      />
                    )
                  ) : chatInfo.userProfilePicture === null ? (
                    <DefaultProfileSvg className="w-[40px] h-[40px] mr-3" />
                  ) : (
                    <img
                      src={chatInfo.userProfilePicture}
                      alt="profile picture"
                      className="w-[40px] h-[40px] mr-3 rounded-full"
                    />
                  )}
                  <div>
                    <span className="text-[#CBCBCE] font-semibold">
                      {message.fromSelf ? username : chatInfo.username}
                    </span>
                    <p className="text-[#C1C5C7]">{message.text}</p>
                  </div>
                </div>
              );
            })}
          </section>
          <section className="h-[68px] w-full px-3 bottom-0 absolute">
            <div className="h-[44px] w-full bg-[#383A40] px-4 rounded-lg flex items-center">
              <AddSvg />
              <input
                type="text"
                className="h-full w-full outline-none bg-transparent text-[white]"
                placeholder={`Message @${serverChatData.title}`}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMessage(e.target.value)
                }
              />
              <SendSvg handleNewMessage={handleNewMessage} />
            </div>
          </section>
        </div>
        <ServerMembersSidePanel />
      </div>
    </div>
  );
};

export default ServerMessageChannel;
