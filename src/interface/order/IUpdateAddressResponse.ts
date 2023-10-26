
interface IUpdateAddressData {
    _id: string;
    createdAt: string;
}

export interface IUpdateAddressResponse {
    data: IUpdateAddressData;
    error: boolean;
    status: number;
}