import { Server } from "socket.io";

const webSocket = (httpServer: any): any => {

  const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
})
}