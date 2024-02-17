import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetServersQuery } from "../../../api/serverApiSlice";
import { useAppSelector } from "../../../app/hooks";
import { selectAuthId } from "../../../app/features/authSlice";
import { CreateServer } from ".";

const ServerSelect = () => {
  const id = useAppSelector(selectAuthId);
  const { currentData: servers, isFetching } = useGetServersQuery(id);
  const [isCreateServerOpen, setIsCreateServerOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return isFetching ? null : (
    <div className="h-full w-[72px] flex justify-center overflow-x-auto">
      <ul className="w-[48px] h-full py-2">
        <li
          className="border-b-2 pb-2 border-[#35363C]"
          onClick={() => navigate("/home")}
        >
          <div className="w-[48px] aspect-square bg-[blue] rounded-full" />
        </li>

        {servers.servers.map((server: any, idx: number) => {
          return (
            <li
              key={server._id}
              className={`mb-2 ${idx === 0 && "mt-2"} cursor-pointer`}
              onClick={() => navigate("/home/server")}
            >
              {server.image !== null ? (
                <img
                  src={server.image}
                  alt="image"
                  className="w-[48px] aspect-square rounded-full"
                />
              ) : (
                <div className="w-[48px] aspect-square rounded-full bg-[#313338] flex items-center justify-center">
                  <span className="text-white text-[18px]">ES</span>
                </div>
              )}
            </li>
          );
        })}

        <li className="border-t-2 pt-2 border-[#35363C]">
          <div
            className="w-[48px] aspect-square transition-all group ease-out duration-200 bg-[#313338] rounded-[30px] hover:bg-[#23A559] hover:rounded-[15px] cursor-pointer flex items-center justify-center"
            onClick={() => setIsCreateServerOpen(true)}
          >
            <span className="text-[30px] mb-1 text-[#23A559] transition-all ease-out duration-200 group-hover:text-white">
              +
            </span>
          </div>
        </li>
      </ul>

      {isCreateServerOpen ? (
        <CreateServer setIsCreateServerOpen={setIsCreateServerOpen} />
      ) : null}
    </div>
  );
};

export default ServerSelect;
