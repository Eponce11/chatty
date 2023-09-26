const Header = () => {
  return (
    <section className="w-full h-[48px] border-b border-b-[#1F2023] flex items-center justify-center bg-[#313338] px-3">
      <div className="w-full h-[28px] flex text-[white]">
        <div className="h-full aspect-square rounded-full bg-[blue] mr-2" />
        <span>Username</span>
      </div>
    </section>
  );
};

export default Header;
