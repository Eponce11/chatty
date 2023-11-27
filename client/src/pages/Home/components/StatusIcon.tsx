import { useNavigate } from "react-router-dom";
import {
  useCreateDmRequestMutation,
  useAcceptDmRequestMutation,
} from "../../../api/dmRequestApiSlice";
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

  let Content;

  switch (status) {
    case "EXIST":
      Content = (
        <div
          className="justify-self-end aspect-square bg-[blue] h-4"
          onClick={() => navigate(`/home/message/${chatId}`)}
        />
      );
      break;
    case "PENDING":
      Content = (
        <div className="justify-self-end aspect-square bg-[green] h-4" />
      );
      break;
    case "REQUEST":
      Content = (
        <div
          className="justify-self-end aspect-square bg-[red] h-4"
          onClick={handleAcceptRequest}
        />
      );
      break;
    case "NONE":
      Content = (
        <div
          className="justify-self-end aspect-square bg-[yellow] h-4"
          onClick={handleSendDmRequest}
        />
      );
      break;
  }

  return Content;
};

export default StatusIcon;
