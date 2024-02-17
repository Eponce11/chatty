const ServerChatSidebar = () => {
  const tempChats = [0, 0, 0, 0];

  return (
    <div className="h-full w-full bg-[#2B2D31]">
      <div className="w-full h-[48px] border-b border-b-[#1F2023] flex items-center justify-center text-left">
        <span>Server Name</span>
      </div>

      <ul className="w-full text-[#949BA0] mt-4 px-2">
        <div className="flex items-center justify-between px-2 mb-3">
          <span className="text-[12px] tracking-wider relative">
            TEXT CHANNELS
          </span>
          <div className="bg-[blue] h-3 aspect-square" />
        </div>

        {tempChats.map((chat, idx) => {
          return (
            <li
              className="w-full h-[35px] mb-[2px] flex items-center px-2 rounded-sm hover:bg-[#34363b] hover:text-[white] cursor-pointer"
              key={idx}
            >
              <div className="bg-[blue] h-5 aspect-square mr-2 rounded-sm"/> 
              <span>Hello World</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ServerChatSidebar;