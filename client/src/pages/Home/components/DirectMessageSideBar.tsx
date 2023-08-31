import { directMessageSideBarChannels } from "../constants";
import { ChannelWrapper } from ".";

const DirectMessageSideBar = () => {
  const tempData = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <div className="h-full w-full bg-[#2B2D31]">
      <div className="w-full h-[48px] border-b border-b-[#1F2023] flex items-center justify-center">
        <div className="w-[224px] h-[28px] bg-[#1E1F22] text-[#949BA0] text-[13px] pl-2 flex items-center rounded-sm">
          <p>Find or start a conversation</p>
        </div>
      </div>

      <div className="w-full px-2 mt-2">
        <ul>
          {directMessageSideBarChannels.map((channel, idx) => {
            return (
              <ChannelWrapper
                key={idx}
                Icon={channel.icon}
                label={channel.label}
              />
            );
          })}
        </ul>

        <ul className="w-full text-[#949BA0] mt-4">
          <span className="pl-3 text-[11px] tracking-wider hover:text-[white] cursor-default">
            DIRECT MESSAGES
          </span>
          {tempData.map((data, idx) => {
            return (
              <li className="w-full h-[40px] mb-[2px] flex items-center px-2 rounded-sm hover:bg-[#34363b] hover:text-[white] cursor-pointer">
                <div className="bg-[blue] h-[32px] aspect-square rounded-full mr-2"/>
                <span>Username</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DirectMessageSideBar;

// 34363b
