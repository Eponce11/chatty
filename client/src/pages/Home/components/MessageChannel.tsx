import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { selectAuthId } from "../../../app/features/authSlice";
import {
  useCreateMessageMutation,
  useGetChatMessagesQuery,
} from "../../../api/messageApiSlice";
import { Header, UserSidePanel } from ".";

const MessageChannel = () => {
  const [message, setMessage] = useState<string>("");
  const [createMessage, { error }] = useCreateMessageMutation();

  const { _chatId } = useParams();
  const userId = useAppSelector(selectAuthId);
  const { currentData, isLoading } = useGetChatMessagesQuery({
    chatId: _chatId,
    userId: userId,
  });

  const handleNewMessage = async (
    e: React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    if (!userId) return
    const data = {
      to: currentData.userId,
      from: userId,
      message: message,
    };
    const res = await createMessage(data).unwrap();
    // const response = await createMessage(data)
  };

  return isLoading ? null : (
    <div className="w-full h-full relative">
      <Header title={`${currentData.username}`} image="imgGoesHere" />
      <div className="w-full top-[48px] bottom-0 absolute flex">
        <div className="grow relative">
          <section className="w-full top-0 px-3 bottom-[68px] absolute overflow-y-auto">
            {currentData.messages.map((message: any, idx: number) => {
              return (
                <div className="flex" key={message.messageId}>
                  <div className="bg-[red] aspect-square h-[40px] rounded-full mr-3 mb-4" />
                  <div>
                    <span className="text-[#CBCBCE] font-semibold">
                      Username
                    </span>
                    <p className="text-[#C1C5C7]">Hello World</p>
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
                placeholder={`Message @${currentData.username}`}
                value={message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMessage(e.target.value)
                }
              />
              <div className="bg-[green] h-[24px] aspect-square ml-4" />
            </div>
          </section>
        </div>
        <UserSidePanel />
      </div>
    </div>
  );
};

export default MessageChannel;
