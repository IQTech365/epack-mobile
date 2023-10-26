export interface IUpdateEnquiryRequest {

    shiftingType: string,
    email: string,
    mobile: string,
    shiftingLuggage: string[],
    shiftingDate: string,
    pickupAddress: {
        shiftingFrom: string,
        state: string,
        city: string,
        pincode: string,
        locality: string,
        isLiftAvailable: string
    },
    dropAddress: {
        shiftingTo: string,
        state: string,
        city: string,
        pincode: string,
        locality: string,
        isLiftAvailable: string
    }

}