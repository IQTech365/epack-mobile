export const GET_OTP = `/auth/authenticate`;
export const VERIFY_OTP = `/auth/verifyotp`;
export const PINCODE = (pincode) => `https://api.postalpincode.in/pincode/${pincode}`;