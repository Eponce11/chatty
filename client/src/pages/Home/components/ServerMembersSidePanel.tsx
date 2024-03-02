import { useState, useEffect } from "react";

const ServerMembersSidePanel = (props: any) => {
  const { socket, members } = props;

  const [onlineUsers, setOnlineUsers] = useState<any>([]);
  const [offlineUsers, setOfflineUsers] = useState<any>([])

  useEffect(() => {
    if (socket) {
      const membersUserId = Object.keys(members);
      console.log(membersUserId);
      socket.emit("get-online-users-server", membersUserId, (response: any) => {
        console.log(response);
      })
    }
  }, [])

  return (
    <div className="w-[240px] h-full bg-[#2B2D31] px-2 pt-4">
      <ul>
        <li className="ml-2 text-[#949BA0] font-medium text-[12px] mb-2">ONLINE - 2</li>
        {onlineUsers.map((user: any, idx: number) => {
          return (
            <li className="w-full px-2 py-1 flex items-center hover:bg-[#34363b] cursor-pointer rounded-sm text-[#949BA0] hover:text-[white]">
              <div className="bg-[blue] h-[40px] aspect-square rounded-full mr-2" />
              <span>Username</span>
            </li>
          );
        })}
      </ul>
      <ul>
        <li className="ml-2 text-[#949BA0] font-medium text-[12px] mb-2 mt-4">OFFLINE - 4</li>
        {offlineUsers.map((user: any, idx: number) => {
          return (
            <li className="w-full px-2 py-1 flex items-center hover:bg-[#34363b] cursor-pointer rounded-sm text-[#949BA0] hover:text-[white]">
              <div className="bg-[blue] h-[40px] aspect-square rounded-full mr-2" />
              <span>Username</span>
            </li>
          );
        })}
      </ul>
      
    </div>
  );
};

export default ServerMembersSidePanel;
