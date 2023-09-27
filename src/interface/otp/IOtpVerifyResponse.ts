interface IOtpVerifyData {
    id: string;
    username: string;
    mobile: string;
    email: string;
    otp: string;
    userType: string;
    token: string;
}
export interface IOtpVerifyResponse {
    data: IOtpVerifyData;
    status: number;
    error: boolean;
    message: string;
}