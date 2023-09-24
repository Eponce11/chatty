const ServerSelect = () => {
  const tempServers = [0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  return (
    <div className="h-full w-[72px] flex justify-center overflow-x-auto">
      <ul className="w-[48px] h-full py-2">
        <li className="border-b-2 pb-2 border-[#35363C]">
          <div className="w-[48px] aspect-square bg-[blue] rounded-full" />
        </li>

        {tempServers.map((server, idx) => {
          return (
            <li className={`mb-2 ${idx === 0 && 'mt-2'}`}>
              <div className="w-[48px] aspect-square bg-[blue] rounded-full" />
            </li>
          );
        })}

        <li className="border-t-2 pt-2 border-[#35363C]">
          <div className="w-[48px] aspect-square bg-[blue] rounded-full" />
        </li>
      </ul>
    </div>
  );
};

export default ServerSelect;
