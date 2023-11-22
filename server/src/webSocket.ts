import { Server } from "socket.io";

const webSocket = (httpServer: any): any => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  const onlineUsers: Map<string, string> = new Map();

  io.on("Connection", (socket) => {

    // console.log(socket.id)

    // adds to list of online users
    socket.on("add-user", (userId: string) => {
      onlineUsers.set(userId, socket.id)
    })

    // send message to user
    socket.on("send-msg", (data: any) => {
      const sendUserSocket: any = onlineUsers.get(data.to);
      socket.to(sendUserSocket).emit("msg-receive", data.message)
    })
  })
};
