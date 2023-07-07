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