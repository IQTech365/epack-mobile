export interface ICheckUsernameAvailablilityRequest {
    username: string;
}

interface IUsernameAvailabilityData {
    message: string;
}

export interface ICheckUsernameAvailablilityResponse {
    data: IUsernameAvailabilityData;
    status: number;
    error: boolean;
}