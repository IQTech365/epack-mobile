import { ICustomer } from "../../interface/customer/customer";

export type ClientStackParamList = {
    ClientRoot: undefined,
    ClientDetails: { item: ICustomer},
}