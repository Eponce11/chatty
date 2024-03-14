import { PropsWithChildren } from "react";
import { DefaultProfileSvg, HashTag, MessageSvg } from "../../../common/static/svg";
interface HeaderProps {
  title: string;
  Icon?: "HASHTAG" | "MESSAGE";
  image?: any;
}


const Header = (props: PropsWithChildren<HeaderProps>) => {
  const { children, Icon, title, image } = props;

  let icon = null;
  if (Icon === "HASHTAG") icon = <HashTag />
  if (Icon === "MESSAGE") icon = <MessageSvg isMouseOver={false}/>

  return (
    <section className="w-full h-[48px] border-b border-b-[#1F2023] flex items-center justify-center bg-[#313338] px-3">
      <div className="w-full h-[28px] flex text-[white] items-center">
        <div className="w-full h-full flex items-center">
        {Icon ? (
          icon
        ) : image !== null ? (
          <img src={image} alt="profilePicture" className="h-full aspect-square rounded-full mr-2"/>
        ) : <DefaultProfileSvg className="w-[35px] h-[35px] mr-2" />}
        <span className="ml-2 font-semibold pr-4 mr-4 border-r-[1px] border-[#3F4147]">{title}</span>
        </div>
        {children}
      </div>
    </section>
  );
};

export default Header;

