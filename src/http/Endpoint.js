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
export const GET_ENQUIRY = (enquiry_id) => `/enquiry/enquiryId/${enquiry_id}`;
export const GET_ENQUIRIES = (company_id) => `/enquiry/${company_id}`;
export const ADD_SURVEY = `/survey/add`;
export const GET_SURVEY_COMMENTS = (enquiry_id) => `/survey/${enquiry_id}`;
export const ADD_SURVEY_ITEM = `/survey/add-survey-item`;
export const GET_SURVEY_ITEM =  `/survey/get-survey-item`;
export const ADD_FOLLOWUP = `/followup/add`;
export const GET_FOLLOWUP_COMMENTS = (enquiry_id) => `/followup/${enquiry_id}`;
export const ADD_QUOTATION = `/quotation/add`;
export const ADD_PACKING_MATERIAL = `/enquiry/add-packing-material`;
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
export const EDIT_MONEY_RECEIPT_LIST = (order_id) => `/money-receipt/edit/${order_id}`;
export const GET_BILTY_LIST = (order_id) => `/bilty/${order_id}`;
export const GET_INVOICE_LIST = (order_id) => `/invoice/${order_id}`;
export const CREATE_PACKING_LIST = `/packing-item/add`;
export const GET_PACKING_LIST = `/packing-item/list`;
export const DELETE_PACKING_LIST_ITEM = (item_id) => `/packing-item/${item_id}`;

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
export const ADD_USER_ROLE = `/user-role/add`;

//Vehicle
export const  ADD_LORRY = `/vehicle-management/vehicle/add`;
export const GET_LORRY = (company_id) => `/vehicle-management/vehicle/all/${company_id}`;
export const  ADD_DRIVER = `/vehicle-management/vehicle-driver/add`;
export const GET_DRIVER = (company_id) => `/vehicle-management/vehicle-driver/all/${company_id}`;
export const  GET_VEHICLE_SIZE = `/vehicle-management/vehicle-size/getAll`;

export const GET_ROLE_TYPES = `/setting/role-type/getAll`;
export const CHECK_USERNAME_AVAILABLITY = `/auth/lookup`;

// Submodules
export const GET_SUBMODULES = `/setting/app-setting/submodule`;

export const GET_BANKS = `/bankname/getAll`;

// Serial No's
export const SERIAL_NO = `/setting/app-setting/add`;
export const GET_SERIAL_NO = (company_id) => `/setting/app-setting/company/${company_id}`;

// Modules
export const MODULES = `/content-management/module/getAll`;

//Unit Type
export const GET_UNIT_TYPES = `/setting/unit-type/all`;

// Packing Materials
export const GET_PACKING_MATERIALS = `/enquiry/get-packing-material`;

// Templates
export const GET_MONEY_RECEIPT_TEMPLATE_HTML = (templateId, receiptId) => `template/money-receipt-template/create/${templateId}/${receiptId}`;
export const GET_QUOTATION_TEMPLATE_HTML = (templateId, docId) => `template/create-quotation-template/${templateId}/${docId}`;
export const GET_BILTY_TEMPLATE_HTML = (templateId, docId) => `template/create-bilty-template/${templateId}/${docId}`;
export const GET_CAR_CONDITION_TEMPLATE_HTML = (templateId, docId) => `template/create-car-condition-template/${templateId}/${docId}`;

// Vehicle types
export const GET_VEHICLE_TYPES = `/vehicle-management/vehicle-type/getAll`;
// Packing Types
export const GET_PACKING_TYPES = `/shifting-management/packing-type/getAll`;

// Vehicle Companies
export const GET_VEHICLE_COMPANIES = `/vehicle-management/vehicle-company/getAll`;
// Vehicle Colors
export const GET_VEHICLE_COLORS = `/vehicle-management/vehicle-color/getAll`;
// Vehicle Accessories
export const GET_VEHICLE_ACCESSORIES = `/vehicle-management/vehicle-accessory/getAll`;
// Vehicle Models
export const GET_VEHICLE_MODELS = `/vehicle-management/vehicle-model/all`;
// Submodules
export const GET_SERIAL_NO_SUBMODULES = `/content-management/sub-module/all`;
// App Settings
export const GET_APP_SETTINGS = (company_id) => `/setting/app-setting/company/${company_id}`;
// Search Customers
export const SEARCH_CUSTOMER = (company_id, searchKey) => `/enquiry/search-customer?companyId=${company_id}&keys=${searchKey}`;
// Image Upload
export const IMAGE_UPLOAD = `/setting/upload-image`;
// Customers
export const GET_CUSTOMERS = `/enquiry/get-customer-list`;
// Subscription Plans
export const GET_SUBSCRIPTION_PLANS = `/subscription/getAll`;
// Submodule Features
export const GET_SUBMODULE_FEATURES_ALL = `/content-management/sub-module-feature/all`;
// Submodule list
export const GET_SUBMODULE_LIST = `/content-management/sub-module/all`;
// Get Subscription purchase list
export const GET_SUBSCRIPTION_PURCHASE_LIST = (auth_id, company_id) => `/purchase/get/${auth_id}/${company_id}`;
// Update Subscription info with company_id
export const UPDATE_SUBSCRIPTION_INFO = (auth_id, purchase_id) => `/purchase/update/${auth_id}/${purchase_id}`;
// Add Purchase
export const ADD_PURCHASE = `/purchase/add`;