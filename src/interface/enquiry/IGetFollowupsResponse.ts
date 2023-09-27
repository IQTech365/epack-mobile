import { IAddFollowupRequest } from "./IAddFollowupRequest";

export interface IGetFollowupsData extends IAddFollowupRequest {
    _id: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
}

export interface IGetFollowupsResponse {
    data: IGetFollowupsData;
    status: number;
    error: boolean;
}