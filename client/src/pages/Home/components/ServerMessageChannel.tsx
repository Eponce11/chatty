import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Header, ServerMembersSidePanel } from ".";
import { DefaultProfileSvg, AddSvg, SendSvg } from "../../../common/static/svg";
import { useGetOneServerChatMutation } from "../../../api/serverChatApiSlice";
import { useCreateServerMessageMutation } from "../../../api/serverMessageApiSlice";
import { useAppSelector } from "../../../app/hooks";
import {
  selectAuthId,
  selectAuthUsername,
} from "../../../app/features/authSlice";
import { useGetOneServerMutation } from "../../../api/serverApiSlice";

const ServerMessageChannel = () => {
  const chatInfo = { username: "Username", userProfilePicture: null };
  const placeHolderBottom = useRef<any>();
  const profilePicture = null;
  const { _channelId, _serverId } = useParams();

  const [message, setMessage] = useState<string>("");
  const [channelMessages, setChannelMessages] = useState<any>([]);
  const [getOneServerChat] = useGetOneServerChatMutation();
  const [createServerMessage] = useCreateServerMessageMutation();
  const [getOneServer] = useGetOneServerMutation();
  const userId = useAppSelector(selectAuthId);
  const username = useAppSelector(selectAuthUsername);

  const [members, setMembers] = useState<any>([]);
  const [channelData, setChannelData] = useState<any>({ title: "" });
  const isLoading = false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOneServerChat(_channelId).unwrap();
        console.log(res);
        setChannelData({ title: res.title });
        setChannelMessages([...res.messages]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [_channelId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOneServer(_serverId).unwrap();
        console.log(res);

        const membersObj: any = {};

        for (const member of res.members) {
          membersObj[member._id] = {
            username: member.username,
            profilePicture: member.profilePicture,
          };
        }
        setMembers(membersObj);
        console.log(membersObj);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [_serverId]);

  const handleNewMessage = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!userId) return;
    const data = {
      channelId: _channelId,
      from: userId,
      message: message,
    };
    const res = await createServerMessage(data).unwrap();
    setChannelMessages((prev: any[]) => [...prev, res]);
    console.log(res);
  };

  return isLoading ? null : (
    <div className="w-full h-full relative">
      <Header
        title={`${channelData.title}`}
        image={chatInfo.userProfilePicture}
      />
      <div className="w-full top-[48px] bottom-0 absolute flex">
        <div className="grow relative">
          <section
            className="w-full top-0 px-3 bottom-[68px] absolute overflow-y-auto"
            ref={placeHolderBottom}
          >
            {channelMessages.map((message: any, idx: number) => {
              return idx !== 0 &&
                channelMessages[idx - 1].sender === message.sender ? (
                <div
                  className={`flex ${
                    idx === channelMessages.length - 1 ? "mb-3" : null
                  }`}
                  key={message._id}
                >
                  <div className="w-[40px] rounded-full mr-3 mb-4" />
                  <p className="text-[#C1C5C7]">{message.text}</p>
                </div>
              ) : (
                <div
                  className={`flex mt-5 ${
                    idx === channelMessages.length - 1 ? "mb-5" : null
                  }`}
                  key={message._id}
                >
                  {message.sender === userId ? (
                    profilePicture === null ? (
                      <DefaultProfileSvg className="w-[40px] h-[40px] mr-3" />
                    ) : (
                      <img
                        src={profilePicture}
                        alt="profile picture"
                        className="w-[40px] h-[40px] mr-3 rounded-full"
                      />
                    )
                  ) : members[message.sender].profilePicture === null ? (
                    <DefaultProfileSvg className="w-[40px] h-[40px] mr-3" />
                  ) : (
                    <img
                      src={members[message.sender].profilePicture}
                      alt="profile picture"
                      className="w-[40px] h-[40px] mr-3 rounded-full"
                    />
                  )}
                  <div>
                    <span className="text-[#CBCBCE] font-semibold">
                      {message.sender === userId
                        ? username
                        : members[message.sender].username}
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
                placeholder={`Message @${channelData.title}`}
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
