import { useState } from "react";

const CreateDm = (props: any) => {
  const { chats } = props;

  const [searchUsername, setSearchUsername] = useState<string>('')
  const [userList, setUserList] = useState<any>(chats);

  const handleSearchUser = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    const searchedUser: any = userList.find((user: any) => user.username === searchUsername);
    if (searchedUser) {
      setUserList([searchedUser])
      return
    }
    try {

    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="bg-[#313338] h-[400px] w-[440px] absolute left-[210px] shadow-xl border border-[#242628] p-4 z-10">
      <div className="w-full h-full relative">
        <div>
          <h2 className="text-white text-[20px] font-semibold">
            Select or Create DM
          </h2>
          <input
            type="text"
            className="w-full bg-[#1E1F22] h-[34px] px-2 text-[15px] rounded-sm mt-3 text-[#F2F3F5] outline-none"
            placeholder="Type the username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchUsername(e.target.value)}
          />
        </div>
        <ul className="top-[90px]  w-full bottom-[55px] absolute overflow-y-auto">
          {userList.map((chat: any, idx: number) => {
            return (
              <li
                key={chat.chatId}
                className="h-[42px] w-full flex items-center"
              >
                <div className="bg-[red] aspect-square h-[32px] rounded-full mr-3" />
                <span className="text-white">{chat.username}</span>
                <div className="justify-self-end aspect-square bg-[blue] h-4" />
              </li>
            );
          })}
        </ul>
        <button
          className="bg-[#5865F2] w-full text-white h-[38px] rounded-sm absolute bottom-0"
          onClick={handleSearchUser}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default CreateDm;
