const MessageChannel = () => {
  return (
    <div className="grow bg-[#313338] relative">
      <section className="w-full h-[48px] border-b border-b-[#1F2023] flex items-center justify-center bg-[#313338] px-3">
        <div className="w-full h-[28px] flex text-[white]">
          <div className="h-full aspect-square rounded-full bg-[blue] mr-2" />
          <span>Username</span>
        </div>
      </section>


      <section className="h-[68px] w-full absolute bottom-0 px-3">
        <div className="h-[44px] w-full bg-[#383A40] px-4 rounded-lg flex items-center">
          <div className="bg-[green] h-[24px] aspect-square mr-4"/>
          <input type="text" className="h-full w-full" />
          <div className="bg-[green] h-[24px] aspect-square ml-4"/>
        </div>
      </section>
    </div>
  );
};

export default MessageChannel;

//68