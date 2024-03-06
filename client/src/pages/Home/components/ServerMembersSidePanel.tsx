import { useState, useEffect } from "react";
import { DefaultProfileSvg } from "../../../common/static/svg";

const ServerMembersSidePanel = (props: any) => {
  const { socket, members } = props;

  const [onlineUsers, setOnlineUsers] = useState<any>([]);
  const [offlineUsers, setOfflineUsers] = useState<any>([]);
  console.log(members);
  useEffect(() => {
    if (socket) {
      const membersUserId = Object.keys(members);
      console.log(membersUserId);
      socket.emit("get-online-users-server", membersUserId, (response: any) => {
        console.log(response);
        setOnlineUsers(response.onlineUsers);
        setOfflineUsers(response.offlineUsers);
      });
    }
  }, []);

  return (
    <div className="w-[240px] h-full bg-[#2B2D31] px-2 pt-4">
      <ul>
        <li className="ml-2 text-[#949BA0] font-medium text-[12px] mb-2">
          ONLINE - {onlineUsers.length}
        </li>
        {onlineUsers.map((_userId: any, idx: number) => {
          return (
            <li className="w-full px-2 py-1 flex items-center hover:bg-[#34363b] cursor-pointer rounded-sm text-[#949BA0] hover:text-[white]">
              {members[_userId].profilePicture === null ? (
                <DefaultProfileSvg className="w-[40px] h-[40px] mr-2" />
              ) : (
                <img
                  src={members[_userId].profilePicture}
                  alt="profile picture"
                  className="w-[40px] h-[40px] mr-2 rounded-full"
                />
              )}
              <span>{members[_userId].username}</span>
            </li>
          );
        })}
      </ul>
      <ul>
        <li className="ml-2 text-[#949BA0] font-medium text-[12px] mb-2 mt-4">
          OFFLINE - {offlineUsers.length}
        </li>
        {offlineUsers.map((_userId: any, idx: number) => {
          return (
            <li className="w-full px-2 py-1 flex items-center hover:bg-[#34363b] cursor-pointer rounded-sm text-[#949BA0] hover:text-[white]">
              {members[_userId].profilePicture === null ? (
                <DefaultProfileSvg className="w-[40px] h-[40px] mr-2" />
              ) : (
                <img
                  src={members[_userId].profilePicture}
                  alt="profile picture"
                  className="w-[40px] h-[40px] mr-2 rounded-full"
                />
              )}
              <span>{members[_userId].username}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ServerMembersSidePanel;
