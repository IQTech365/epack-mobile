export const GET_OTP = `/auth/authenticate`;
export const VERIFY_OTP = `/auth/verifyotp`;
export const PINCODE = (pincode) => `https://api.postalpincode.in/pincode/${pincode}`;

// Company Registration Module
export const ADD_COMPANY = `/company/add`;
export const GET_COMPANIES = (company_id) => `/company/${company_id}`;
export const EDIT_COMPANY = `/company/edit`;
export const GET_COMPANY = (company_id) => `/company/${company_id}`;
export const DELETE_COMPANY = (company_id) => `/company/${company_id}`;
export const UPLOAD_COMPANY_LOGO = `/company/upload-logo`;
export const UPLOAD_SIGNATURE = `/company/upload-logo`;

// Enquiry Module
export const ADD_ENQUIRY = `/enquiry/add`;
export const GET_ENQUIRY_LIST = (company_id) => `/enquiry/${company_id}`;
export const EDIT_ENQUIRY = (enquiry_id) => `/enquiry/edit/${enquiry_id}`;
export const DELETE_ENQUIRY = (enquiry_id) => `/enquiry/${enquiry_id}`;
export const GET_ENQUIRY = (enquiry_id) => `/enquiry/${enquiry_id}`;
export const GET_ENQUIRIES = (company_id) => `/enquiry/${company_id}`;
export const ADD_SURVEY = `/survey/add`;
export const GET_SURVEY_COMMENTS = (enquiry_id) => `/survey/${enquiry_id}`;
export const ADD_FOLLOWUP = `/followup/add`;
export const GET_FOLLOWUP_COMMENTS = (enquiry_id) => `/followup/${enquiry_id}`;
export const ADD_QUOTATION = `/quotation/add`;
//README:- id = `company_id` or `enquiry_id`
export const GET_QUOTATION_LIST = `/quotation/getquotation`;
export const GET_QUOTATION = (quotation_id) => `/quotation/${quotation_id}`;

// Order Module
export const GET_ORDER_LIST = `/enquiry/orderlist`;
export const GET_ORDER_DETAILS = (order_id) => ``;
export const CREATE_CAR_CONDITION = `/car-condition/add`;
export const CREATE_MONEY_RECEIPT = `/money-receipt/add`;
export const CREATE_BILTY = `/bilty/add`;
export const CREATE_INVOICE = ``;
export const GET_CAR_CONDITION_LIST = (order_id) => `/car-condition/${order_id}`;
export const GET_MONEY_RECEIPT_LIST = (order_id) => `/money-receipt/${order_id}`;
export const GET_BILTY_LIST = (order_id) => `/bilty${order_id}`;
export const GET_INVOICE_LIST = (order_id) => `/invoice/${order_id}`;

// Setting
export const ADD_PAYMENT_METHOD = `/account-management/account/addAccount`;
export const DELETE_PAYMENT_METHOD = (company_id) => ``;
export const UPDATE_PAYMENT_METHOD = (company_id) => ``;
export const GET_PAYMENT_METHODS = (company_id) => `/account-management/account/${company_id}`;

export const ADD_FOOTER_CONTENT = `/content-management/footer-setting/addFooter`;
export const DELETE_FOOTER_CONTENT = (company_id) => `/content-management/footer-setting/addFooter`;
export const UPDATE_FOOTER_CONTENT = (company_id) => `/content-management/footer-setting/addFooter`;
export const GET_FOOTER_CONTENTS = (company_id) => `/content-management/footer-setting/${company_id}`;

export const ADD_DOCUMENT = `/content-management/govt-registration/add`;
export const DELETE_DOCUMENT = (company_id) => ``;
export const UPDATE_DOCUMENT = (company_id) => ``;
export const GET_DOCUMENTS = (company_id) => `/content-management/company-document/${company_id}`;

export const ADD_SIGNATURE = (company_id) => `/`;
export const DELETE_SIGNATURE = (company_id) => ``;
export const GET_SIGNATURES = (company_id) => ``;

export const ADD_CONTACT_DETAIL = `/content-management/contact/add`;
export const DELETE_CONTACT_DETAIL = (company_id) => ``;
export const UPDATE_CONTACT_DETAIL = (company_id) => ``;
export const GET_CONTACTS = (company_id) => `/content-management/contact/${company_id}`;

// My Profile
export const ADD_BRANCH = `/branch/add`;
export const GET_BRANCHS = (company_id) => `/branch/all/${company_id}`;

export const ADD_FRANCHISE = `/franchise/addFranchise`;
export const GET_FRANCHISE = (company_id) => `/franchise/all/${company_id}`;

// User Role
export const ADD_USER_ROLE = `/role/add`;

//Vehicle
export const  ADD_LORRY = `/vehicle-management/vehicle-lorry/add`;
export const  ADD_DRIVER = `/vehicle-management/vehicle-driver/add`;

export const GET_ROLE_TYPES = `/setting/role-type/getAll`;
export const CHECK_USERNAME_AVAILABLITY = `/auth/lookup`;

// Submodules
export const GET_SUBMODULES = `/setting/app-setting/submodule`;

export const GET_BANKS = `/bankname/getAll`;

// Serial No's
export const SERIAL_NO = `/setting/app-setting/add`;

// Modules
export const MODULES = `/content-management/module/getAll`;
