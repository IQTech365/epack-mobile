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
}
const HomeStackRoute = {
  Home: 'Home',
};

const QuotationStackRoute = {
  Profile: 'Profile',
};

const OrderStackRoute = {
  Message: 'Message',
};

const EnquiryStackRoute = {
  Zoom: 'Zoom',
};

const ProfileStackRoute = {
  ProfileRoot: 'ProfileRoot',
  Language: 'Language',
};

export {
  TabRoute,
  AuthStackRoute,
  HomeStackRoute,
  QuotationStackRoute,
  OrderStackRoute,
  EnquiryStackRoute,
  ProfileStackRoute,
};
