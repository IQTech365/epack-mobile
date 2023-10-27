export interface IUpdateShiftingInfoRequest {
    shiftingType: string;
    shiftingLuggage: string[];
    shiftingDate: string;
    deliveryDate: string;
    deliveredDate: string;
}

export interface IUpdateShiftingInfoResponse {
    data: IUpdateShiftingInfoRequest;
    error: boolean;
    status: number;
}