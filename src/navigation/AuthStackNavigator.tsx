import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackRoute } from "../utils/constants";
import SignInPageView from "../views/signin";
import SignUpPageView from "../views/signup";
import ForgotPasswordPageView from "../views/forgotPassword";
import IntroPageView from "../views/intro";
import QuotationView from "../views/quotation";
import AddEnquiryView from "../views/enquiry/addEnquiry";
import RegisterCompanyView from "../views/company/registerCompany";
import AddBranchView from "../views/company/addBranch";
import AddOrderView from "../views/order/addOrder";

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => {

    return (
        <AuthStack.Navigator screenOptions={{headerShown: false}} initialRouteName={AuthStackRoute.AddOrder} >
            <AuthStack.Screen name={AuthStackRoute.SignIn} component={SignInPageView} />
            <AuthStack.Screen name={AuthStackRoute.SignUp} component={SignUpPageView} />
            <AuthStack.Screen name={AuthStackRoute.ForgotPassword} component={ForgotPasswordPageView} />
            <AuthStack.Screen name={AuthStackRoute.Intro} component={IntroPageView} />
            <AuthStack.Screen name={AuthStackRoute.Quotation} component={QuotationView} />
            <AuthStack.Screen name={AuthStackRoute.AddEnquiry} component={AddEnquiryView} />
            <AuthStack.Screen name={AuthStackRoute.RegisterCompany} component={RegisterCompanyView} />
            <AuthStack.Screen name={AuthStackRoute.AddBranch} component={AddBranchView} />
            <AuthStack.Screen name={AuthStackRoute.AddOrder} component={AddOrderView} />
        </AuthStack.Navigator>
    );
}

export default AuthStackNavigator;