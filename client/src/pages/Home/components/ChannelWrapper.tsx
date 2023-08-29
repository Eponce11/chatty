import {useState} from "react";

interface channelWrapperProps {
  Icon: any;
  label: string;
}

const ChannelWrapper = (props: channelWrapperProps) => {
  const { Icon, label } = props;

  return (
    <li className="h-[44px] w-full flex items-center pl-3 text-[#949BA4] rounded-md hover:cursor-pointer hover:text-[white] hover:bg-[#34363b]">
      <Icon />
      {label}
    </li>
  );
};
