export const GET_OTP = `/auth/authenticate`;
export const VERIFY_OTP = `/auth/verifyotp`;
export const PINCODE = (pincode) => `https://api.postalpincode.in/pincode/${pincode}`;
export const ADD_COMPANY = `/company/add`;
export const EDIT_COMPANY = `/company/edit`;
export const GET_COMPANY = (company_id) => `/company/${company_id}`;
export const DELETE_COMPANY = (company_id) => `/company/${company_id}`;