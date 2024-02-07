import { useRef } from "react";
import { Header, ServerMembersSidePanel } from ".";
import { DefaultProfileSvg, AddSvg, SendSvg } from "../../../common/static/svg";


const ServerMessageChannel = () => {

  const isLoading = false;
  const chatInfo = { username: "Username", userProfilePicture: null }
  const messages: any[] = []
  const placeHolderBottom = useRef<any>();
  const profilePicture = null;
  const username = "SignedInUserUsername"

  return isLoading ? null : (
    <div className="w-full h-full relative">
      <Header
        title={`${chatInfo.username}`}
        image={chatInfo.userProfilePicture}
      />
      <div className="w-full top-[48px] bottom-0 absolute flex">
        <div className="grow relative">
          <section className="w-full top-0 px-3 bottom-[68px] absolute overflow-y-auto" ref={placeHolderBottom}>
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
                placeholder={`Message @${chatInfo.username}`}
              />
              <SendSvg  />
            </div>
          </section>
        </div>
        <ServerMembersSidePanel/>
      </div>
    </div>
  );
};


export default ServerMessageChannel;