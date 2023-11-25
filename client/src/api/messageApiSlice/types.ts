
export interface NewMessageData {
  to: string,
  from: string,
  message: string
}

export interface NewMessageResponse {
  messageId: string;
  text: string;
  fromSelf: boolean;
}