import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import {
  selectAuthId,
  selectAuthUsername,
} from "../../../app/features/authSlice";
import {
  useCreateMessageMutation,
  useGetChatMessagesMutation,
} from "../../../api/messageApiSlice";
import { Header, UserSidePanel } from ".";
import { NewMessageResponse } from "../../../api/messageApiSlice/types";
import { io } from "socket.io-client";
interface ChatInfo {
  userId: string;
  username: string;
}

const MessageChannel = () => {
  const [message, setMessage] = useState<string>("");
  const [createMessage] = useCreateMessageMutation();
  const { _chatId } = useParams();
  const userId = useAppSelector(selectAuthId);
  const username = useAppSelector(selectAuthUsername);
  const [getChatMessages] = useGetChatMessagesMutation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chatInfo, setChatInfo] = useState<ChatInfo>({
    userId: "",
    username: "",
  });
  const [messages, setMessages] = useState<NewMessageResponse[]>([]);
  const [socket] = useState(() => io(':8000'))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getChatMessages({
          chatId: _chatId,
          from: userId,
        }).unwrap();
        setChatInfo({ userId: res.userId, username: res.username});
        setMessages([...res.messages])
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("add-user", userId)
    })
  }, [])

  useEffect( () => {
    if (socket) {
      socket.on("msg-receive", (messageData) => {
        setMessages((prev: NewMessageResponse[]) => [...prev, messageData]);
        console.log(chatInfo)
      })
    }
  }, [socket])

  const handleNewMessage = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!userId) return;
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
      message: res.text
    })
    console.log(res);
  };

  return isLoading ? null : (
    <div className="w-full h-full relative">
      <Header title={`${chatInfo.username}`} image="imgGoesHere" />
      <div className="w-full top-[48px] bottom-0 absolute flex">
        <div className="grow relative">
          <section className="w-full top-0 px-3 bottom-[68px] absolute overflow-y-auto">
            {messages.map((message: any, idx: number) => {
              return (
                <div className="flex" key={message.messageId}>
                  <div className="bg-[red] aspect-square h-[40px] rounded-full mr-3 mb-4" />
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
              <div className="bg-[green] h-[24px] aspect-square mr-4" />
              <input
                type="text"
                className="h-full w-full outline-none bg-transparent text-[white]"
                placeholder={`Message @${chatInfo.username}`}
                value={message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMessage(e.target.value)
                }
              />
              <div
                className="bg-[green] h-[24px] aspect-square ml-4"
                onClick={handleNewMessage}
              />
            </div>
          </section>
        </div>
        <UserSidePanel />
      </div>
    </div>
  );
};

export default MessageChannel;
