const MessageChannel = () => {
  const tempMessages = new Array(20).fill(0)

  return (
    <div className="grow relative">
      <section className="flex flex-col-reverse px-3 absolute top-0 bottom-[68px] overflow-y-auto w-full">
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

      <section className="h-[68px] w-full px-3 bottom-0 absolute">
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
