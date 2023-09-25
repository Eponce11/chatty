const MessageChannel = () => {
  const tempMessages = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0];

  return (
    <div className="grow bg-[#313338] relative">
      <section className="w-full h-[48px] border-b border-b-[#1F2023] flex items-center justify-center bg-[#313338] px-3">
        <div className="w-full h-[28px] flex text-[white]">
          <div className="h-full aspect-square rounded-full bg-[blue] mr-2" />
          <span>Username</span>
        </div>
      </section>

      <section className="absolute top-[48px] bottom-[68px] w-full flex flex-col-reverse px-3 overflow-y-scroll">
        {tempMessages.map((message, idx) => {
          return (
            <div className="flex">
              <div className="bg-[red] aspect-square h-[40px] rounded-full mr-3 mb-4" />
              <div>
                <span className="text-[#CBCBCE] font-semibold">Username</span>
                <p className="text-[#C1C5C7]">Hello World</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="h-[68px] w-full absolute bottom-0 px-3">
        <div className="h-[44px] w-full bg-[#383A40] px-4 rounded-lg flex items-center">
          <div className="bg-[green] h-[24px] aspect-square mr-4" />
          <input
            type="text"
            className="h-full w-full outline-none bg-transparent text-[white]"
            placeholder="Message @username"
          />
          <div className="bg-[green] h-[24px] aspect-square ml-4" />
        </div>
      </section>
    </div>
  );
};

export default MessageChannel;
