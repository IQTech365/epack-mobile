export const GET_OTP = `/auth/authenticate`;
export const GET_OTP_OLD = `/userlogin/authenticate`;
export const VERIFY_OTP = `/auth/verifyotp`;
export const PINCODE = (pincode) => `https://api.postalpincode.in/pincode/${pincode}`;

// Company Registration Module
export const ADD_COMPANY = `/company/add`;
export const EDIT_COMPANY = `/company/edit`;
export const GET_COMPANY = (company_id) => `/company/${company_id}`;
export const DELETE_COMPANY = (company_id) => `/company/${company_id}`;

// Enquiry Module
export const ADD_ENQUIRY = `/enquiry/add`;
export const GET_ENQUIRY_LIST = ``;
export const EDIT_ENQUIRY = (enquiry_id) => `/enquiry/edit/${enquiry_id}`;
export const DELETE_ENQUIRY = (enquiry_id) => `/enquiry/${enquiry_id}`;
export const GET_ENQUIRY = (enquiry_id) => `enquiry/${enquiry_id}`;
export const ADD_SURVEY = `/survey/add`;
export const GET_SURVEY_COMMENTS = () => ``;
export const ADD_FOLLOWUP = `/followup/add`;
export const GET_FOLLOWUP_COMMENTS = () => ``;
export const ADD_QUOTATION = `/quotation/add`;
export const GET_QUOTATION_LIST = ``;
export const GET_QUOTATION = () => ``;

// Order Module
export const GET_ORDER_DETAILS = (order_id) => ``;
export const CREATE_CAR_CONDITION = `/car-condition/add`;
export const CREATE_MONEY_RECEIPT = `/money-receipt/add`;
export const CREATE_BILTY = `/bilty/add`;
export const CREATE_INVOICE = ``;