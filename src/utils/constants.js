/**
 * Route name
 */
const TabRoute = {
  HomeStack: 'HomeStack',
  QuotationStack: 'QuotationStack',
  EnquiryStack: 'EnquiryStack',
  OrderStack: 'OrderStack',
  ClientStack: 'ClientStack',
}

const AuthStackRoute = {
  SignIn: 'SignIn',
  SignUp: 'SignUp',
  ForgotPassword: 'ForgotPassword',
  Intro: 'Intro',
  Quotation: 'Quotation',// TODO: move this to respective route later
  AddEnquiry: 'AddEnquiry',// TODO: move this to respective route later
  RegisterCompany: 'RegisterCompany',// TODO: move this to respective route later
  AddBranch: 'AddBranch',// TODO: move this to respective route later
  AddOrder: 'AddOrder',// TODO: move this to respective route later
  OTPInput: 'OTPInput', // TODO: move this to respective route later
}
const HomeStackRoute = {
  Home: 'Home',
};

const QuotationStackRoute = {
  QuotationRoot: 'QuotationRoot',
  AddQuotation: 'AddQuotation',
  QuotationDetails: 'QuotationDetails',
};

const OrderStackRoute = {
  OrderRoot: 'Message',
  AddOrder: 'AddOrder',
  OrderDetails: 'OrderDetails',
};

const EnquiryStackRoute = {
  EnquiryRoot: 'EnquiryRoot',
  AddEnquiry: 'AddEnquiry',
  EnquiryDetails: 'EnquiryDetails',
};

const ClientStackRoute = {
  ClientRoot: 'ClientRoot',
  ClientDetails: 'ClientDetails',
};
const SettingStackRoute = {
  ProfileSetting: 'ProfileSetting',
  SerialNoSetting: 'SerialNoSetting',
  RoleSetting: 'RoleSetting',
  TemplateSetting: 'TemplateSetting',
  AccountEditView: 'AccountEditView',
  ContactEditView: 'ContactEditView',
  DocumentEditView: 'DocumentEditView',
  FooterContentEditView: 'FooterContentEditView',
};

const MyProfileStackRoute = {
  ProfileRoot: 'ProfileRoot',
  BasicDetails: 'BasicDetails',
  Address: 'Address',
  RegistrationDetails: 'RegistrationDetails',
  AccountDetails: 'AccountDetails',
  UPIDetails: 'UPIDetails',
  PackerSignature: 'PackerSignature',
  TermsAndCondition: 'TermsAndCondition',
  AddBranch: 'AddBranch',
  AddFranchise: 'AddFranchise',

};

const VehicleMangementStackRoute = {
  AddLorry: 'AddLorry',
  AddDriver: 'AddDriver',
  vehicleRoot:'vehicleRoot',
};

export {
  TabRoute,
  AuthStackRoute,
  HomeStackRoute,
  QuotationStackRoute,
  OrderStackRoute,
  EnquiryStackRoute,
  ClientStackRoute,
  SettingStackRoute,
  MyProfileStackRoute,
  VehicleMangementStackRoute,
};
