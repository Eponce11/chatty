import { Server } from "socket.io";

const webSocket = (httpServer: any): any => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://127.0.0.1:5173",
    },
  });

  const onlineUsers: Map<string, string> = new Map();

  io.on("connection", (socket) => {
    console.log(socket.id)

    // adds to list of online users
    socket.on("add-user", (userId: string) => {
      onlineUsers.set(userId, socket.id);
    });

    // send message to user
    socket.on("send-msg", (data: any) => {
      const sendUserSocket: any = onlineUsers.get(data.to);
      console.log(data)
      socket.to(sendUserSocket).emit("msg-receive", {
        messageId: data.messageId,
        text: data.message,
        fromSelf: false
      });
    });
  });
};

export default webSocket;
