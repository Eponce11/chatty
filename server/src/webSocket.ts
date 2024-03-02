import { Server } from "socket.io";

const webSocket = (httpServer: any): any => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    },
  });

  const onlineUsersKeyUserId: Map<string, string> = new Map();
  const onlineUsersKeySocketId: Map<string, string> = new Map();

  io.on("connection", (socket) => {
    console.log(socket.id);

    // adds to list of online users
    socket.on("add-user", (userId: string) => {
      onlineUsersKeyUserId.set(userId, socket.id);
      onlineUsersKeySocketId.set(socket.id, userId);
    });

    socket.on("disconnect", () => {
      const userId = onlineUsersKeySocketId.get(socket.id);
      if (!userId) return;
      onlineUsersKeySocketId.delete(socket.id);
      onlineUsersKeyUserId.delete(userId);
    });

    // send message to user
    socket.on("send-msg", (data: any) => {
      const sendUserSocket: any = onlineUsersKeyUserId.get(data.to);
      console.log(data);
      socket.to(sendUserSocket).emit("msg-receive", {
        messageId: data.messageId,
        text: data.message,
        fromSelf: false,
      });
    });

    socket.on("get-online-users-server", (userIds: any[], callback) => {
      const serverOnlineUsers = [];
      for (let userId of userIds) {
        if (onlineUsersKeyUserId.has(userId)) {
          serverOnlineUsers.push(userId);
        }
      }
      callback({ onlineUsers: serverOnlineUsers });
    });
  });
};

export default webSocket;
