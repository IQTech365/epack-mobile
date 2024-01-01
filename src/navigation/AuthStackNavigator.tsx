import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInPageView from "../views/signin";
import SignUpPageView from "../views/signup";
import ForgotPasswordPageView from "../views/forgotPassword";
import IntroPageView from "../views/intro";
import OTPPageView from "../views/otp";
import RegistrationPageView from "../views/company";
import { AuthStackParamList } from "./params/AuthStackParamList";
import SubscriptionPlanView from "../views/subscriptionPlan";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {

    return (
        <AuthStack.Navigator screenOptions={{headerShown: false}} initialRouteName="SignIn" >
            <AuthStack.Screen name="SignIn" component={SignInPageView} />
            <AuthStack.Screen name="SignUp" component={SignUpPageView} />
            <AuthStack.Screen name="OTPInput" component={OTPPageView} />
            <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordPageView} />
            <AuthStack.Screen name="Intro" component={IntroPageView} />
            <AuthStack.Screen name="RegisterCompany" component={RegistrationPageView} initialParams={{registrationStep: 1}} />
            <AuthStack.Screen name="Subscription" component={SubscriptionPlanView} />
        </AuthStack.Navigator>
    );
}

export default AuthStackNavigator;