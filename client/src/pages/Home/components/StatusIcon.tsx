import { useNavigate } from "react-router-dom";
import {
  useCreateDmRequestMutation,
  useAcceptDmRequestMutation,
} from "../../../api/dmRequestApiSlice";
import {
  ChatSvg,
  AcceptSvg,
  AddUserSvg,
  PendingSvg,
} from "../../../common/static/svg";
import { useAppSelector } from "../../../app/hooks";
import { selectAuthId } from "../../../app/features/authSlice";

const StatusIcon = (props: any) => {
  const { status, chatId, userId, userList, setUserList } = props;

  const [createDmRequest] = useCreateDmRequestMutation();
  const [acceptDmRequest] = useAcceptDmRequestMutation();
  const navigate = useNavigate();
  const authId = useAppSelector(selectAuthId);

  const handleSendDmRequest = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    const res = await createDmRequest({ from: authId, to: userId }).unwrap();
    console.log(res);
    const newUserList = userList.map((user: any) => {
      let returnVal = { ...user };
      if (user.userId === userId) {
        returnVal.status = "PENDING";
      }
      return returnVal;
    });
    setUserList([...newUserList]);
  };

  const handleAcceptRequest = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    const res = await acceptDmRequest({ to: authId, from: userId }).unwrap();
    console.log(res);
  };

  return (
    <>
      {status === "EXIST" && <ChatSvg chatId={chatId} />}
      {status === "PENDING" && <PendingSvg />}
      {status === "REQUEST" && (
        <AcceptSvg handleAcceptRequest={handleAcceptRequest} />
      )}
      {status === "NONE" && (
        <AddUserSvg handleSendDmRequest={handleSendDmRequest} />
      )}
    </>
  );
};

export default StatusIcon;
