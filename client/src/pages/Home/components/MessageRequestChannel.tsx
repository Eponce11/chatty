import { Header } from ".";
import { MessageSvg } from "../../../common/static/svg";
import { useGetDmRequestsQuery } from "../../../api/dmRequestApiSlice";

const MessageRequestChannel = () => {
  const { currentData, isFetching } = useGetDmRequestsQuery(
    "652e06990a3086842edac9e2"
  );

  return (
    <div className="w-full h-full">
      <Header title="Message Requests" Icon={MessageSvg}>
        <ul className="h-full flex">
          <li>Requests</li>
          <li>Pending</li>
        </ul>
      </Header>
      <div className="px-5">
        {isFetching
          ? null
          : currentData.map((dmRequest: any) => {
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
      </div>
    </div>
  );
};

export default MessageRequestChannel;
