import { UserSvg, MessageSvg } from "../../common/static/svg";

const directMessageSideBarChannels = [
  {
    icon: UserSvg,
    label: "Friends",
    route: "/home"
  },
  {
    icon: MessageSvg,
    label: "Message Requests",
    route: "/home/messageRequest"
  },
];

export { directMessageSideBarChannels };
