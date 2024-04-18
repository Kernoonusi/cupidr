export interface User {
  email: string;
  name: string;
  profileImageUrl: string;
  gender: string;
  geolocation: string;
  accessToken: string;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  birthday: Date;
  geolocation: string;
  UserPhoto: PhotosResponse[];
}

export interface TokensResponse {
  accessToken: string;
  refreshToken: string;
}
export interface ActivationResponse {
  id: number;
  email: string;
  name: string;
  birthday: string;
  gender: string;
  lfGender: string;
  bio: string;
  geolocation: string;
  isActivated: boolean;
}
export interface PhotosResponse {
  id: number;
  userId: number;
  photoUrl: string;
  isProfile: boolean;
}
export interface UserResponse extends ActivationResponse {
  UserPhoto: Array<PhotosResponse>;
}

// export interface IParticipant {
//   user: IUser;
//   chat: IChat;
// }

export interface IChat {
  id: number;
  messages: IMessage[];
  participants: IUser[];
}

export interface IMessage {
  id: number;
  createdAt: Date;
  content: string;
  sender: IUser;
  chat: IChat;
}

export type ChatsResponse = IChat[];
