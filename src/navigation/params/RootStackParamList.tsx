import { ISubscriptionPlan } from "../../interface/subscription/subscription";

export type RootStackParamList = {
    Drawer: undefined,
    Subscription: undefined,
    Checkout: {subscriptionPlan: ISubscriptionPlan, amount:number, duration:string},
}