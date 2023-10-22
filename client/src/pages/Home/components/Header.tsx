import { PropsWithChildren } from "react";

interface HeaderProps {
  title: string;
  Icon?: (props: any) => JSX.Element;
  image?: any;
}

const Header = (props: PropsWithChildren<HeaderProps>) => {
  const { children, Icon, title, image } = props;

  return (
    <section className="w-full h-[48px] border-b border-b-[#1F2023] flex items-center justify-center bg-[#313338] px-3">
      <div className="w-full h-[28px] flex text-[white] items-center">
        {Icon ? (
          <Icon />
        ) : image ? (
          <div className="h-full aspect-square rounded-full bg-[blue] mr-2" />
        ) : null}
        <span className="ml-2 font-semibold pr-4 mr-4 border-r-[1px] border-[#3F4147]">{title}</span>
        {children}
      </div>
    </section>
  );
};

export default Header;

//<div className="h-full aspect-square rounded-full bg-[blue] mr-2" />
