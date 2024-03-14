import { useState } from "react";
import { Header } from ".";
import { MessageSvg, DefaultProfileSvg } from "../../../common/static/svg";
import {
  useGetDmRequestsQuery,
  useGetDmPendingQuery,
} from "../../../api/dmRequestApiSlice";
import { useAppSelector } from "../../../app/hooks";
import { selectAuthId } from "../../../app/features/authSlice";

type RequestOrPending = "REQUEST" | "PENDING";

const MessageRequestChannel = () => {
  const id = useAppSelector(selectAuthId);

  const [content, setContent] = useState<RequestOrPending>("REQUEST");

  const { currentData: requestCurrentData, isFetching: isFetchingRequest } =
    useGetDmRequestsQuery(id);

  const { currentData: pendingCurrentData, isFetching: isFetchingPending } =
    useGetDmPendingQuery(id);

  

  const requestContent = (
    <>
      {isFetchingRequest
        ? null
        : requestCurrentData.map((dmRequest: any) => {
            return (
              <div
                className="h-[75px] w-full px-3 py-4 flex rounded-md items-center hover:bg-[#393b3f] justify-between"
                key={dmRequest.dmRequestId}
              >
                <div className="h-full flex items-center">
                  {dmRequest.profilePicture !== null ? (
                    <img
                      src={dmRequest.profilePicture}
                      className="h-full aspect-square rounded-full"
                      alt="pic"
                    />
                  ) : (
                    <DefaultProfileSvg className="h-full aspect-square" />
                  )}
                  <span className="ml-2 text-white font-medium">
                    {dmRequest.username}
                  </span>
                </div>
                <div>
                  <button className="bg-[#505257] px-3 py-1 rounded-sm text-white mr-3 hover:bg-[#626469] ">
                    Accept
                  </button>
                  <button className="bg-[#e74646] px-3 py-1 rounded-sm text-white hover:bg-[#e45656]">
                    Decline
                  </button>
                </div>
              </div>
            );
          })}
    </>
  );

  const pendingContent = (
    <>
      {isFetchingPending
        ? null
        : pendingCurrentData.map((dmPending: any) => {
            return (
              <div
                className="h-[75px] w-full px-3 py-4 flex rounded-md items-center hover:bg-[#393b3f] justify-between"
                key={dmPending.dmRequestId}
              >
                <div className="h-full flex items-center">
                  {dmPending.profilePicture !== null ? (
                    <img
                      src={dmPending.profilePicture}
                      className="h-full aspect-square rounded-full"
                      alt="pic"
                    />
                  ) : (
                    <DefaultProfileSvg className="h-full aspect-square" />
                  )}
                  <span className="ml-2 text-white font-medium">
                    {dmPending.username}
                  </span>
                </div>
                <button className="cursor-default bg-[#505257] px-3 py-1 rounded-sm text-white">
                  Pending
                </button>
              </div>
            );
          })}
    </>
  );

  return (
    <div className="w-full h-full relative">
      <Header title="Message Requests" Icon={"MESSAGE"}>
        <ul className="h-full flex items-center">
          <li
            className={`mr-3 hover:text-[white] text-[#949BA0] cursor-pointer hover:bg-[#3b3c41] px-2 rounded-sm ${
              content === "REQUEST" ? "bg-[#43444B]" : null
            } ${content === "REQUEST" ? "text-[white]" : null}`}
            onClick={() => {
              setContent("REQUEST");
            }}
          >
            Requests
          </li>
          <li
            className={`hover:text-[white] text-[#949BA0] cursor-pointer hover:bg-[#3b3c41] px-2 rounded-sm ${
              content === "PENDING" ? "bg-[#43444B]" : null
            } ${content === "PENDING" ? "text-[white]" : null}`}
            onClick={() => {
              setContent("PENDING");
            }}
          >
            Pending
          </li>
        </ul>
      </Header>
      <div className="w-full top-[48px] bottom-0 overflow-y-scroll absolute px-5 mt-2">
        {content === "REQUEST" ? requestContent : pendingContent}
      </div>
    </div>
  );
};

export default MessageRequestChannel;
