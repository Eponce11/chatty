import { useState } from "react";
import { Header } from ".";
import { MessageSvg } from "../../../common/static/svg";
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
                className="bg-[green] h-[75px] w-full px-3 py-4 flex"
                key={dmRequest.dmRequestId}
              >
                <div className="h-full aspect-square rounded-full bg-[blue] mr-3" />
                <span>{dmRequest.username}</span>
              </div>
            );
          })}
    </>
  );

  const pendingContent = (
    <>
      {isFetchingPending
        ? null
        : pendingCurrentData.map((dmRequest: any) => {
            return (
              <div
                className="bg-[green] h-[75px] w-full px-3 py-4 flex"
                key={dmRequest.dmRequestId}
              >
                <div className="h-full aspect-square rounded-full bg-[red] mr-3" />
                <span>{dmRequest.username}</span>
              </div>
            );
          })}
    </>
  );

  return (
    <div className="w-full h-full relative">
      <Header title="Message Requests" Icon={MessageSvg}>
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
      <div className="w-full top-[48px] bottom-0 overflow-y-scroll absolute px-5">
        {content === "REQUEST" ? requestContent : pendingContent}
      </div>
    </div>
  );
};

export default MessageRequestChannel;
