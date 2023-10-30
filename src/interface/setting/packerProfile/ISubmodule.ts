export interface ISubmoduleData {
  submoduleId: string;
  submoduleName: string;
}

export interface ISubmoduleResponse {
  data: ISubmoduleData;
  status: number;
  error: boolean;
}
