import { UserSvg } from "../../../common/static/svg";
import { directMessageSideBarChannels } from "../constants";

const DirectMessageSideBar = () => {
  return (
    <div className="h-full w-[240px] bg-[#2B2D31]">
      <div className="w-full h-[48px] border-b border-b-[#1F2023] flex items-center justify-center">
        <div className="w-[224px] h-[28px] bg-[#1E1F22] text-[#949BA0] text-[13px] pl-2 flex items-center rounded-sm">
          <p>Find or start a conversation</p>
        </div>
      </div>

      <div className="w-full px-2 mt-2">
        <ul>
          {directMessageSideBarChannels.map((channel, idx) => {
            return (
              <li className="h-[44px] w-full flex items-center pl-3 text-[#949BA4] rounded-md hover:cursor-pointer hover:text-[white] hover:bg-[#34363b]">
                <channel.icon />
                <UserSvg
                />
                Friends
              </li>
            );
          })}
        </ul>

        <ul className="w-full">
          <li className="w-full h-[40px] bg-[red] mt-10"></li>
        </ul>
      </div>
    </div>
  );
};

export default DirectMessageSideBar;

// 34363b
