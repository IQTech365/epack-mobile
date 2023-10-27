export interface ICheckUsernameAvailablilityRequest {
    username: string;
}

export interface ICheckUsernameAvailablilityResponse {
    data: ICheckUsernameAvailablilityRequest;
    status: number;
    error: boolean;
}