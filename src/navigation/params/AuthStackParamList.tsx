import {EnquiryStackRoute} from '../../utils/constants';
export type AuthStackParamList = {
    SignIn: undefined,
    SignUp: undefined,
    OTPInput: undefined,
    ForgotPassword: undefined,
    Intro: undefined,
    RegisterCompany: {registrationStep: number},
}