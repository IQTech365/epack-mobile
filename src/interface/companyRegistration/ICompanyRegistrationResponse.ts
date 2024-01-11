import { ICompanyRegistrationRequest } from "./ICompanyRegistrationRequest";

export interface ICompanyRegistrationResponse {
  data: ICompanyRegistrationRequest;
  status: number;
  error: boolean;
}
