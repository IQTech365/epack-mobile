export interface ICreateBiltyRequest {
  companyId: string;
  enquiryId: string;
  templateId: string;
  biltyNumber: string;
  biltyDate: string;

  consigner: {
    name: string;
    mobile: string;
    gstin: string;
    street: string;
    state: string;
    landmark: string;
    city: string;
    district: string;
    postOffice: string;
    postalCode: string;
    country: string;
  };
  consignee: {
    name: string;
    mobile: string;
    gstin: string;
    street: string;
    state: string;
    landmark: string;
    city: string;
    district: string;
    postOffice: string;
    postalCode: string;
    country: string;
  };

  loadingAddress: {
    address: string;
    state: string;
    landmark: string;
    city: string;
    district: string;
    postOffice: string;
    postalCode: string;
    country: string;
  };
  unloadingAddress: {
    address: string;
    state: string;
    landmark: string;
    city: string;
    district: string;
    postOffice: string;
    postalCode: string;
    country: string;
  };

  vehicle: {
    invoiceNumber: string;
    vehicleType: string;
    vehicleNumber: string;
    shiftingFrom: string;
    shiftingTo: string;
    sealNumber: string;
    inDate: string;
    outDate: string;
    transitDays: string;
    expectedDateOfDelivery: string;
  };
  driver: {
    name: string;
    mobile: string;
    license: string;
  };
  eWayBill: {
    number: string;
    generationDate: string;
    expiryDate: string;
  };
  materialsType: string;
  addMaterialsStatus: string;
  materials: [
    {
      name: string;
      noOfArticles: string;
      packingType: string;
      HSNCode: string;
      billNumber: string;
      actualWeight: string;
      applicableWeight: string;
      unit: string;
      valueOfGoods: string;
    },
  ];
  riskType: string;
  liabilityOfTax: string;
  insuranceStatus: string;
  insurance: {
    companyName: string;
    policyNumber: string;
    date: string;
    amount: string;
  };
  demurrage: {
    charge: string;
    rate: string;
    chargeAfterApplicable: string;
  };

  freightDetails: {
    // "actualWeight": "",
    // "applicableWeight": "",
    // "units": "",
    // "rate": "",
    freightCharges: string;
    billingStatus: string;
    //"isFixedFreight": "",
    totalAmount: string;
    advanceAmount: string;
    balanceAmount: string;
  };
  pickupCharges: {
    status: string;
    charge: string;
  };
  packingCharges: {
    status: string;
    charge: string;
  };
  unPackingCharges: {
    status: string;
    charge: string;
  };
  unLoadingCharges: {
    status: string;
    charge: string;
  };
  doorDeliveryCharges: {
    status: string;
    charge: string;
  };
  packingMaterialCharges: {
    status: string;
    charge: string;
  };
  loadingCharges: {
    status: string;
    charge: string;
  };
  remarks: string;
  addedBy: string;
}
