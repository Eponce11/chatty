import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { selectAuthId } from "../../../app/features/authSlice";
import { useCreateMessageMutation } from "../../../api/messageApiSlice";
import { Header, UserSidePanel } from ".";

const MessageChannel = () => {
  const tempMessages = new Array(20).fill(0);
  const {_id } = useParams();
  const [message, setMessage] = useState<string>("");
  const [createMessage, { error }] = useCreateMessageMutation();
  const id = useAppSelector(selectAuthId);
  
  const handleNewMessage = async (e:React.MouseEvent<HTMLElement>, toUserId: string) => {
    e.preventDefault();
    const data = {
      to: toUserId,
      from: id,
      message: message
    }

    // const response = await createMessage(data)
  }

  


  return (
    <div className="w-full h-full relative">
      <Header title="Username" image="imgGoesHere" />
      <div className="w-full top-[48px] bottom-0 absolute flex">
        <div className="grow relative">
          <section className="w-full top-0 px-3 bottom-[68px] absolute overflow-y-auto">
            {tempMessages.map((message, idx) => {
              return (
                <div className="flex">
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
                placeholder="Message @username"
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
