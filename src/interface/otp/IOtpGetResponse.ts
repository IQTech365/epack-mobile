export type TOtpData = {
    id: string;
    username: string;
    mobile: string;
    email: string;
    otp: string;
    created: string;
}

export interface IOtpGetResponse {
    data: TOtpData;
    status: number;
    error: boolean;
}