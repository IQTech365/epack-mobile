import React, {useReducer, useEffect, useRef} from 'react';
import {Alert, View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import DatePickerComponent, { IDateMethods } from '../../../../../common/DatePickerComponent';
import DropdownComponent, { IDropdownHandler } from '../../../../../common/DropdownComponent';
import Input, { InputMethods } from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import {COLOR_BLACK, COLOR_GRAY4} from '../../../../../utils/colors';
import styles from './style';
import paymentTypeOptions from '../../../../../data/paymentTypeOptions.json';
import receiptAgainstOptions from '../../../../../data/receiptAgainstOptions.json';
import modeOfPaymentOptions from '../../../../../data/modeOfPaymentOptions.json';
import {
  MONEYRECEIPT_FORM_ACTION,
  initialState,
  moneyReceiptReducer,
} from './moneyReceiptReducer';
import Button from '../../../../../common/Button';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {ICreateMoneyReceiptRequest} from '../../../../../interface/order/ICreateMoneyReceiptRequest';
import {
  createMoneyReceiptRequest,
  editMoneyReceiptListRequest,
  editMoneyReceiptListSuccess,
  editMoneyReceiptListFailure,
  getMoneyReceiptListRequest,
  resetEditMoneyReceiptRequest,
  resetCreateMoneyReceiptRequest,
} from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';
import useAuthId from '../../../../../hooks/useAuthId';
import { getQuotationsByEnquiryIdRequest, getQuotationsRequest } from '../../../../../redux/slices/QuotationSlice';
import { IGetQuotationRequest } from '../../../../../interface/quotation/IGetQuotationRequest';
import { IGetQuotationData } from '../../../../../interface/quotation/IGetQuotationsResponse';
import { ToastType, showToast } from '../../../../../utils/utility';
import { getCurrentCompanyId } from '../../../../../utils/storage';
import useInitialValueHook from '../../../../../hooks/useInitialValueHook';
import { DOCUMENT_TYPE, IGetSerialNoRequest } from '../../../../../interface/setting/serialNo/serialNo';
import { getSerialNoRequest, resetGetSerialNoRequest } from '../../../../../redux/slices/SerialNoSettingSlice';
import useSerialNoHook from '../../../../../hooks/useSerialNo';
import DropdownWithTextInput, { DropdownMethods } from '../../../../../common/DropdownWithTextInput';
import { IQuotation } from '../../../../../interface/quotation/quotation';
import { formatDate, formatDate4 } from '../../../../../utils/formatter';
import useUtilityHook from '../../../../../hooks/useUtilityHook';

interface IMoneyReceiptFormViewProps {
  orderId: string | undefined;
  editData: any;
  isEdit: boolean;
  onSuccess: () => void;
}

const MoneyReceiptFormView: React.FC<IMoneyReceiptFormViewProps> = ({
  orderId,
  editData,
  isEdit,
  onSuccess
}) => {
  const [reducerState, dispatch] = useReducer(
    moneyReceiptReducer,
    initialState,
  );
  const {
    createMoneyReceiptRequesting,
    createMoneyReceiptSuccess,
    createMoneyReceiptError,
    createMoneyReceiptFailure,
    editMoneyReceiptListRequesting,
    editMoneyReceiptListSuccess,
    editMoneyReceiptListFailure
    
  } = useAppSelector(state => state.Order);
  
  const authId = useAuthId();
  const {quotationList} = useAppSelector(state => state.Quotation);
  const dispatch2 = useAppDispatch();
  const {initialValue, prefix} = useInitialValueHook('658d3c9c585e3dde644da970');
  const serialNo:number = useSerialNoHook();
  const {getTotalDocumentCount} = useUtilityHook();

  const paymentTypeDropCompRef = useRef<IDropdownHandler>(null);
  const receiptAgainstDropCompRef = useRef<IDropdownHandler>(null);
  const quotationNoDropCompRef = useRef<DropdownMethods>(null);
  const modeOfPaymentDropCompRef = useRef<IDropdownHandler>(null);
  const referenceNumberRef = useRef<InputMethods>(null);
  const paymentAmountRef = useRef<InputMethods>(null);
  const CnLrBiltyNoRef = useRef<InputMethods>(null);
  const noOfArticlesRef = useRef<InputMethods>(null);
  const dateOfArrivalRef  = useRef<IDateMethods>(null);


  const _getSerialNoRequest = () => {
    getCurrentCompanyId().then(id => {
      const payload: IGetSerialNoRequest = {
        document: DOCUMENT_TYPE.MONEY_RECEIPT,
        payload: {
          activeCount: initialValue,
          companyId: id as string,
          isAuto: true,
          isHeadOffice: true,
        }
      }      
      dispatch2(getSerialNoRequest(payload));
    }).catch(err => console.log('err--', err));
  }
  const handleReceiptDate = (date: Date) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.RECEIPT_DATE,
      payload: date.toISOString(),
    });
  };

  const handleReceiptNoInputTextChange = (text: string) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.RECEIPT_NO,
      payload: text,
    });
  };

  const handleBillQuotation = (text: string) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.BILL_QUOTATION_NO,
      payload: text,
    });
  };

  const handlePaymentType = (item: TDropdownItem) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.PAYMENT_TYPE,
      payload: item.label,
    });
  };
  const handleReceiptAgainst = (item: TDropdownItem) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.RECEIPT_AGAINST,
      payload: item.label,
    });
  };

  const handlePaymentMode = (item: TDropdownItem) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.MODE_OF_PAYMENTS,
      payload: item.label,
    });
  };
  const handleRefNo = (text: string) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.REF_NO,
      payload: text,
    });
  };
  const handleEnterAmount = (text: string) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.ENTER_AMOUNT,
      payload: text,
    });
  };
  const handleBiltyLrNo = (text: string) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.CN_BILTY_LR_NO,
      payload: text,
    });
  };
  const handleNoOfArticles = (text: string) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.NO_OF_ARTICLES,
      payload: text,
    });
  };
  const handleArivalDate = (date: Date) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.DATE_OF_ARRIVAL,
      payload: date.toISOString(),
    });
  };

  const _getLabelText = () => {
    let label:string = 'Quotation No#.';
    if(reducerState.receiptAgainst == receiptAgainstOptions[0].label) {
      label = 'Quotation No#.';
    } else if(reducerState.receiptAgainst == receiptAgainstOptions[1].label) {
      label = 'Bill No#.';
    } else if(reducerState.receiptAgainst == receiptAgainstOptions[2].label) {
      label = 'Other Doc. No#.';
    } 
    return label;
  }

  const transformQuotationData = () => {
    let _data: string[] = [];
    const {data} = quotationList || {};
    if (
      data &&
      Array.isArray(data) &&
      data.length > 0
    ) {
      _data = data
        .filter((e: IQuotation) => e.enquiryId == orderId)
        .map((quotation: IQuotation) => quotation?.quotationNumber);
    }
    return _data;
  };

  const handleCreate = () => {
    if(reducerState.receiptNumber === '' || reducerState.receiptNumber === null || reducerState.receiptNumber === undefined) {
      Alert.alert('Error', 'Please set serial NO# from Setting.');
      return;
    }
    getCurrentCompanyId().then(id => {
      const payload: ICreateMoneyReceiptRequest = {
        companyId: id as string,
        orderId: orderId as string,
        isAuto: true,
        isHeadOffice: true,
        receiptNumber: reducerState.receiptNumber,
        receiptDate: reducerState.receiptDate,
        arivalDate: reducerState.arivalDate,
        receiptAgainst:
          reducerState.receiptAgainst || receiptAgainstOptions[0].label,
        billNumber: reducerState.billQuotationNo,
        quotationNumber: reducerState.billQuotationNo,
        consignmentNumber: reducerState.cnBiltyLrNo,
        numbersOfArticles: reducerState.numbersOfArticles,
        paymentMode: reducerState.paymentMode || modeOfPaymentOptions[0].label,
        paymentType: reducerState.paymentType || paymentTypeOptions[0].label,
        paymentAmount: reducerState.paymentAmount,
        referenceNumber: reducerState.referenceNumber,
        status: 'NEW',
        addedBy: authId,
      };
  
      const editPayload: any = {
        receiptNumber: reducerState.receiptNumber,
        receiptDate: reducerState.receiptDate,
        arivalDate: reducerState.arivalDate,
        receiptAgainst: reducerState.receiptAgainst,
        billNumber: reducerState.billQuotationNo,
        referenceNumber: reducerState.referenceNumber,
        quotationNumber: reducerState.billQuotationNo,
        consignmentNumber: reducerState.cnBiltyLrNo,
        numbersOfArticles: reducerState.numbersOfArticles,
        paymentMode: reducerState.paymentMode,
        paymentType: reducerState.paymentType,
        paymentAmount: reducerState.paymentAmount,
      };
      if (isEdit == true) {
        dispatch2(
          editMoneyReceiptListRequest({
            id: editData._id,
            requestBody: editPayload,
          }),
        );
      } else {
        dispatch2(createMoneyReceiptRequest(payload));
      }
    }).catch(err => console.log(err));
    
  };

  useEffect(() => {
    _getSerialNoRequest();
    dispatch2(getQuotationsByEnquiryIdRequest(orderId as string));
  }, []);

  useEffect(() => {
    if(serialNo){
      handleReceiptNoInputTextChange(serialNo.toString());
    }
  }, [serialNo]);

  useEffect(() => {
    if(!editMoneyReceiptListRequesting && editMoneyReceiptListSuccess) {
      showToast('Money Receipt Updated', ToastType.SUCCESS);
      dispatch2(resetEditMoneyReceiptRequest());
      dispatch2(getMoneyReceiptListRequest(orderId as string));
      getTotalDocumentCount();
      onSuccess && onSuccess();
    } else if(!editMoneyReceiptListRequesting && editMoneyReceiptListFailure) {
      showToast('Money Receipt Not Updated. Try again!', ToastType.ERROR);
      dispatch2(resetEditMoneyReceiptRequest());
    }
  }, [editMoneyReceiptListRequesting, editMoneyReceiptListSuccess, editMoneyReceiptListFailure]);

  useEffect(() => {
    if 
      (!createMoneyReceiptRequesting && createMoneyReceiptSuccess) 
      
     {
      showToast('Money Receipt Created.', ToastType.SUCCESS);
      dispatch2(resetCreateMoneyReceiptRequest());
      dispatch2(resetGetSerialNoRequest());
      onSuccess && onSuccess();
    } else if (
      (!createMoneyReceiptRequesting && createMoneyReceiptError)
    ) {
      showToast('Money Receipt Not Created. Try again!', ToastType.ERROR);
      dispatch2(resetCreateMoneyReceiptRequest());
    }
  }, [
    createMoneyReceiptRequesting,
    createMoneyReceiptSuccess,
    createMoneyReceiptFailure,
  ]);

  useEffect(()=>{
    if(isEdit && editData){
      const paymentTypeOption:TDropdownItem = paymentTypeOptions.find((d:TDropdownItem) => d.label === editData.paymentType) as TDropdownItem;
      if (paymentTypeOption) {
        paymentTypeDropCompRef.current?.setDefaultValue(paymentTypeOption);
        handlePaymentType(paymentTypeOption)
      }
      const receiptAgainstOption:TDropdownItem = receiptAgainstOptions.find((d:TDropdownItem) => d.label === editData.receiptAgainst) as TDropdownItem;
      if (receiptAgainstOption) {
        receiptAgainstDropCompRef.current?.setDefaultValue(receiptAgainstOption);
      }
      const billNoOption:string = transformQuotationData().find((d:string) => d === editData.quotationNumber) as string;
      
      if (billNoOption) {
        quotationNoDropCompRef.current?.setValue(billNoOption);
      }
      const modeOfPayment:TDropdownItem = modeOfPaymentOptions.find((d:TDropdownItem) => d.label === editData.paymentMode) as TDropdownItem;
      if (modeOfPayment) {
        modeOfPaymentDropCompRef.current?.setDefaultValue(modeOfPayment);
        handlePaymentMode(modeOfPayment)
      }
      referenceNumberRef.current?.setValue(editData.referenceNumber)
      handleRefNo(editData.referenceNumber)

      paymentAmountRef.current?.setValue(editData.paymentAmount)
      handleEnterAmount(editData.paymentAmount)

      CnLrBiltyNoRef.current?.setValue(editData.consignmentNumber)
      handleBiltyLrNo(editData.consignmentNumber)

      noOfArticlesRef.current?.setValue(editData.numbersOfArticles)
      handleNoOfArticles(editData.numbersOfArticles)

      dateOfArrivalRef && dateOfArrivalRef?.current?.setDefaultValue(new Date(editData?.arivalDate));
      handleArivalDate(new Date(editData?.arivalDate));
    }
  },[isEdit,editData])
  
  

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title={isEdit ? "EDIT MONEY RECEIPT DETAILS": "MONEY RECEIPT DETAILS"} collapsed={false}>
          <View>
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Receipt No." style={styles.label} />
                <Input
                  onChangeText={handleReceiptNoInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  value={reducerState.receiptNumber}
                  // value={isEdit ? editData.receiptNumber : ''}

                  placeholder="Receipt#"
                  editable={false}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Receipt Date" style={styles.label} />
                <DatePickerComponent onDateSelect={(date: Date)=>{
                  handleReceiptDate(date)
                }} />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Payment Type" style={styles.label} />
              <DropdownComponent
                data={paymentTypeOptions}
                onSelect={handlePaymentType}
                defaultValue={isEdit ? editData.paymentType : ''}
                ref={paymentTypeDropCompRef}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Receipt Against" style={styles.label} />
                <DropdownComponent
                  data={receiptAgainstOptions}
                  onSelect={handleReceiptAgainst}
                  ref={receiptAgainstDropCompRef}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text={_getLabelText()} style={styles.label} />
                <DropdownWithTextInput
                  options={transformQuotationData()}
                  onSelect={handleBillQuotation}
                  containerStyle={styles.itemContainer}
                  ref={quotationNoDropCompRef}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Mode Of Payments" style={styles.label} />
              <DropdownComponent
                data={modeOfPaymentOptions}
                onSelect={handlePaymentMode}
                ref={modeOfPaymentDropCompRef}
              />
            </View>
            {reducerState.paymentMode !== modeOfPaymentOptions[0].label ? (
              <>
                <Spacer height={4} />
                <View style={styles.elementContainer2}>
                  <Label text="Ref. No" style={styles.label} />
                  <Input
                    onChangeText={handleRefNo}
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    placeholder='Enter reference #'
                    selectionColor={COLOR_BLACK}
                    value={reducerState.referenceNumber}
                    autoCapitalize="characters"
                    ref={referenceNumberRef}
                  />
                </View>
              </>
            ) : null}

            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Enter Amount" style={styles.label} />
              <Input
                onChangeText={handleEnterAmount}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={reducerState.paymentAmount}
                inputType="numeric"
                placeholder="Enter amount"
                placeholderTextColor={COLOR_GRAY4}
                ref={paymentAmountRef}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="OTHER DETAILS" collapsed={false}>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="CN / Bilty / LR No." style={styles.label} />
              <Input
                onChangeText={handleBiltyLrNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder="Enter CN / Bilty / LR No."
                value={reducerState.cnBiltyLrNo}
                placeholderTextColor={COLOR_GRAY4}
                autoCapitalize="characters"
                ref={CnLrBiltyNoRef}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="No. of Articles" style={styles.label} />
                <Input
                  onChangeText={handleNoOfArticles}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  value={reducerState.numbersOfArticles}
                  inputType="numeric"
                  placeholder="No. of Articles"
                  placeholderTextColor={COLOR_GRAY4}
                  ref={noOfArticlesRef}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date of Arrival" style={styles.label} />
                <DatePickerComponent onDateSelect={(date: Date) =>{
                  handleArivalDate(new Date(formatDate((date))))
                }} />
              </View>
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={12} />
        <Button
          text={`${isEdit ? 'UPDATE' : 'CREATE'}`}
          onPress={handleCreate}
          disabled={createMoneyReceiptRequesting || editMoneyReceiptListRequesting}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={8} />
        <Spinner
          show={createMoneyReceiptRequesting || editMoneyReceiptListRequesting}
        />
      </View>
    </AvoidSoftInputViewHOC>
  );
};
export default MoneyReceiptFormView;
