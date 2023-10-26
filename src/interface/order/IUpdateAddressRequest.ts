export interface IPickupAddress {
  pickupAddress: {
    city: string;
    isLiftAvailable: string;
    locality: string;
    landmark: string;
    pincode: string;
    shiftingFrom: string;
    state: string;
    address: string;
    floor: string;
  };
}

export interface IDropAddress {
  dropAddress: {
    city: string;
    isLiftAvailable: string;
    locality: string;
    landmark: string;
    pincode: string;
    shiftingTo: string;
    state: string;
    address: string;
    floor: string;
  };
}
