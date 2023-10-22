import { Header } from ".";
import { MessageSvg } from "../../../common/static/svg";

const MessageRequestChannel = () => {
  return (
    <div className="w-full h-full">
      <Header title="Message Requests" Icon={MessageSvg}>
        <ul className="h-full flex">
          <li>Requests</li>
          <li>Pending</li>
        </ul>
      </Header>
    </div>
  );
};

export default MessageRequestChannel;
