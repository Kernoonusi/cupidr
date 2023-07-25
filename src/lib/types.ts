export interface User {
  email: string;
  name: string;
  profileImageUrl: string;
  gender: string;
  geolocation: string;
  accessToken: string;
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
