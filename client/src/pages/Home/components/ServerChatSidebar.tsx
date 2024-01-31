const ServerChatSidebar = () => {
  const tempChats = [0,0,0,0];

  return (
    <div className="h-full w-full bg-[#2B2D31]">
      <div className="w-full h-[48px] border-b border-b-[#1F2023] flex items-center justify-center"></div>

      <ul className="w-full text-[#949BA0] mt-4">
        <div className="flex items-center justify-between px-3">
          <span className="text-[12px] tracking-wider relative">
            TEXT CHANNELS
          </span>
          <div className="bg-[blue] h-3 aspect-square" />
        </div>

        {tempChats.map((chat, idx) => {
          return <li
          className="w-full h-[40px] mb-[2px] flex items-center px-2 rounded-sm hover:bg-[#34363b] hover:text-[white] cursor-pointer"
          key={idx}
        >Hello World</li>;
        })}
      </ul>
    </div>
  );
};

export default ServerChatSidebar;
