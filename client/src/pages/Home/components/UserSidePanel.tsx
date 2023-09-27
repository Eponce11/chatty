const UserSidePanel = () => {
  return (
    <aside className="w-[340px] h-full bg-[#232428]">
      <div className="h-[120px] w-full bg-[#B0A8A0] relative">
        <div className="bg-[#232428] w-[90px] aspect-square rounded-full absolute bottom-[-40%] left-3 flex items-center justify-center">
          <div className="bg-[blue] w-[80px] aspect-square rounded-full" />
        </div>
      </div>

      <section className="w-full px-3 h-10 mt-16 text-[#CBCBCE]">
        <ul className="w-full bg-[#111214] rounded-md p-3">
          <li className="border-b border-[#2E2F34]">
            <h4 className="font-semibold text-[white]">Username</h4>
            <span className=" ">tag</span>
          </li>
          <li className="border-b border-[#2E2F34] mt-2 pb-2">
            <h6 className="font-bold text-[11px] text-[white]">
              DISCORD MEMBER SINCE
            </h6>
            <span>Jun 1, 2020</span>
          </li>
          <li>
            <h6 className="font-bold text-[11px] text-[white]">
              NOTE
            </h6>
            <span>Click to add a note</span>
          </li>
        </ul>
      </section>
    </aside>
  );
};

export default UserSidePanel;
