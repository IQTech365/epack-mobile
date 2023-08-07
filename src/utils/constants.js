/**
 * Route name
 */
const TabRoute = {
  HomeStack: 'HomeStack',
  ProfileStack: 'ProfileStack',
  MessageStack: 'MessageStack',
  ZoomStack: 'ZoomStack',
  MenuStack: 'MenuStack',
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
  AddQuotation: 'AddQuotation'
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

export {
  TabRoute,
  AuthStackRoute,
  HomeStackRoute,
  QuotationStackRoute,
  OrderStackRoute,
  EnquiryStackRoute,
  ClientStackRoute
};
