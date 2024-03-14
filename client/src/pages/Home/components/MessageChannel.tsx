import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import {
  selectAuthId,
  selectAuthUsername,
  selectAuthProfilePicture,
} from "../../../app/features/authSlice";
import {
  useCreateMessageMutation,
  useGetChatMessagesMutation,
} from "../../../api/messageApiSlice";
import { SendSvg, DefaultProfileSvg, UserInfoSvg } from "../../../common/static/svg";
import { Header, UserSidePanel } from ".";
import { NewMessageResponse } from "../../../api/messageApiSlice/types";
interface ChatInfo {
  userId: string;
  username: string;
  userProfilePicture: string | null;
  createdAt: string;
}

const MessageChannel = (props: any) => {
  const { socket } = props;

  const [message, setMessage] = useState<string>("");
  const [createMessage] = useCreateMessageMutation();
  const { _chatId } = useParams();
  const userId = useAppSelector(selectAuthId);
  const username = useAppSelector(selectAuthUsername);
  const profilePicture = useAppSelector(selectAuthProfilePicture);
  const [getChatMessages] = useGetChatMessagesMutation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chatInfo, setChatInfo] = useState<ChatInfo>({
    userId: "",
    username: "",
    userProfilePicture: null,
    createdAt: "",
  });
  const [messages, setMessages] = useState<NewMessageResponse[]>([]);
  const [isUserSidePanelOpen, setIsUserSidePanelOpen] =
    useState<boolean>(false);
  const placeHolderBottom = useRef<any>();
  const messageRef = useRef<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getChatMessages({
          chatId: _chatId,
          from: userId,
        }).unwrap();
        console.log(res);
        setChatInfo({
          userId: res.userId,
          username: res.username,
          userProfilePicture: res.userProfilePicture,
          createdAt: res.createdAt,
        });
        setMessages([...res.messages]);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        placeHolderBottom.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    fetchData();
  }, [_chatId, placeHolderBottom]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("add-user", userId);
    });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("msg-receive", (messageData: any) => {
        setMessages((prev: NewMessageResponse[]) => [...prev, messageData]);
        console.log(chatInfo);
      });
    }
  }, [socket]);

  const handleNewMessage = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!userId) return;
    try {
      const data = {
        chatId: _chatId,
        to: chatInfo.userId,
        from: userId,
        message: message,
      };
      const res: NewMessageResponse = await createMessage(data).unwrap();
      setMessages((prev: NewMessageResponse[]) => [...prev, res]);
      socket.emit("send-msg", {
        messageId: res.messageId,
        to: chatInfo.userId,
        message: res.text,
      });
      console.log(res);
      setMessage("");
    } catch (error) {
      console.log(error);
    } finally {
      placeHolderBottom.current.lastElementChild.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return isLoading ? null : (
    <div className="w-full h-full relative">
      <Header
        title={`${chatInfo.username}`}
        image={chatInfo.userProfilePicture}
      >
        <UserInfoSvg onClick={() => setIsUserSidePanelOpen((prev: boolean) => !prev)}/>
      </Header>
      <div className="w-full top-[48px] bottom-0 absolute flex">
        <div className="grow relative">
          <section
            className="w-full top-0 px-3 bottom-[68px] absolute overflow-y-auto scrollbar"
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
            <p className="h-[12px] w-[10px]" />
          </section>
          <section className="h-[68px] w-full px-3 bottom-0 absolute">
            <div className="h-[44px] w-full bg-[#383A40] px-4 rounded-lg flex items-center">
              <input
                type="text"
                className="h-full w-full outline-none bg-transparent text-[white]"
                placeholder={`Message @${chatInfo.username}`}
                value={message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMessage(e.target.value)
                }
                ref={messageRef}
              />
              <SendSvg handleNewMessage={handleNewMessage} />
            </div>
          </section>
        </div>
        {isUserSidePanelOpen && (
          <UserSidePanel
            chatUsername={chatInfo.username}
            chatProfilePicture={chatInfo.userProfilePicture}
            createdAt={chatInfo.createdAt}
          />
        )}
      </div>
    </div>
  );
};

export default MessageChannel;
