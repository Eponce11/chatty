import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface channelWrapperProps {
  Icon: any;
  label: string;
  route: string;
}

const ChannelWrapper = (props: channelWrapperProps) => {
  const { Icon, label, route } = props;

  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <li
      className="h-[44px] w-full flex items-center pl-3 text-[#949BA4] rounded-md hover:cursor-pointer hover:text-[white] hover:bg-[#34363b]"
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onClick={() => navigate(`${route}`)}
    >
      <Icon isMouseOver={isMouseOver} />
      <span className="ml-3">{label}</span>
    </li>
  );
};

export default ChannelWrapper;
