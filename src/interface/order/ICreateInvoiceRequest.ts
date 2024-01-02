export interface ICreateInvoiceRequest {
  enquiryId: string;
  branchId: string;
  serialNo: string;
  shiftingLuggage: string;
  templateId: string;
  invoiceData: string;
  vehicleNo: string;
  consignmentNo: string;
  movingMode: string;
  deliveryDate: string;
  vehicleType: string;
  manufacture: string;
  model: string;
  billingBy: string;
  billingDetails: {};
  pickupAddress: {
    shiftingFrom: string;
    state: string;
    city: string;
    address: string;
    pincode: string;
    landmark: string;
    floor: string;
    isLiftAvailable: string;
  };
  otherCharges: [
    {
      item: string;
      HSNCode: string;
      qty: string;
      rate: string;
      amount: string;
    },
  ];

  surchargeCharges: string;
  discountType: string;
  discountAmount: string;
}
