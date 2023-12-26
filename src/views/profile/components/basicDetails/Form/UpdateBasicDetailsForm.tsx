import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Button from '../../../../../common/Button';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import Spinner from '../../../../../common/Spinner';
import {COLOR_BLACK} from '../../../../../utils/colors';
import styles from './style';
import {ICompanyInfoData} from '../../../../../interface/companyRegistration/IGetCompaniesResponse';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {
  editCompanyRequest,
  getCompaniesRequest,
  reseteditCompanyRequest,
} from '../../../../../redux/slices/CompanySlice';
import {ICompanyEditRequest} from '../../../../../interface/companyRegistration/ICompanyEditRequest';
import CommonPhotoUploadView from '../../../../../common/CommonPhotoUploadView';
import { ToastType, showToast } from '../../../../../utils/utility';

interface IUpdateBasicDetailsFormProps {
  //
  onClose: () => void;
}

const UpdateBasicDetailsForm: React.FC<IUpdateBasicDetailsFormProps> = ({
  onClose,
}) => {
  const [comapnyPunch, setCompanyPunch] = useState<string>('');
  const [contactPerson, setContactPerson] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [companyLogoImage, setCompanyLogoImage] = useState<string>('');
  const [companySignatureImage, setCompanySignatureImage] = useState<string>('');
  const {
    companies,
    editCompanyRequesting,
    editCompanySuccess,
    editCompanyFailure,
  } = useAppSelector(state => state.Company);
  const {verifiedData} = useAppSelector(state => state.OTP);
  const {data: companiesData} = companies || {};
  const dispatch = useAppDispatch();
  const {data} = verifiedData || {};

  const getFirstCompany = () => {
    let company: ICompanyInfoData | null = null;
    if (
      companiesData &&
      Array.isArray(companiesData) &&
      companiesData.length > 0
    ) {
      company = companiesData[0];
    }
    return company;
  };

  const firstCompany = getFirstCompany();
  console.log('firstCompany----', JSON.stringify(firstCompany));

  const handleCompnyPunchLineInput = (text: string) => {
    setCompanyPunch(text);
  };

  const handleContactPersonInput = (text: string) => {
    setContactPerson(text);
  };

  const handleWebsiteInput = (text: string) => {
    setWebsite(text);
  };

  const handleUpdate = () => {
    const payload: ICompanyEditRequest = {
      _id: firstCompany?._id as string,
      authId: firstCompany?.authId as string,
      companyName: firstCompany?.companyName as string,
      contactPerson: contactPerson,
      email: firstCompany?.email as string,
      companyMobile: firstCompany?.companyMobile as string,
      companyAddress: firstCompany?.companyAddress as string,
      state: firstCompany?.state as string,
      city: firstCompany?.city as string,
      pincode: firstCompany?.pincode as string,
      ibaApprovalCode: firstCompany?.ibaApprovalCode as string,
      ibaValidDate: '2023-10-25',
      companyWebite: website,
      CINNumber: firstCompany?.CINNumber as string,
      companyLogo: companyLogoImage || firstCompany?.companyLogo as string,
      punchLine: comapnyPunch,
      companyProfile: '',
      district: '',
      postOffice: '',
      companySignature: companySignatureImage || firstCompany?.companySignature as string,
    };
    dispatch(editCompanyRequest(payload));
    // dispatch(getCompaniesRequest(firstCompany?.authId as string));
  };

  useEffect(() => {
    if (!editCompanyRequesting && editCompanySuccess) {
      showToast('Success', 'Company Info update successfull', ToastType.SUCCESS);
      dispatch(reseteditCompanyRequest());
      onClose();
    } else if (!editCompanyRequesting && editCompanyFailure) {
      showToast('Error', 'Company Info update failed. Try again!', ToastType.ERROR);
      dispatch(reseteditCompanyRequest());
    }
  }, [editCompanyRequesting, editCompanySuccess, editCompanyFailure]);

  const onCompanyLogoUploadSuccess = (imagePath: string) => {
    setCompanyLogoImage(imagePath);
  };

  const onCompanySignatureUploadSuccess = (imagePath: string) => {
    setCompanySignatureImage(imagePath);
  };

  return (
    <>
      <AvoidSoftInputViewHOC>
        <View style={styles.container}>
          <View style={styles.elementContainer3}>
            <Label text="Company Punch Line" style={styles.label} />
            <Input
              onChangeText={handleCompnyPunchLineInput}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              value={firstCompany?.punchLine}
            />
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer3}>
            <Label text="Contact Person" style={styles.label} />
            <Input
              onChangeText={handleContactPersonInput}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              value={firstCompany?.contactPerson}
            />
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer3}>
            <Label text="Website" style={styles.label} />
            <Input
              onChangeText={handleWebsiteInput}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              value={firstCompany?.companyWebite}
            />
          </View>
          <Spacer height={20} />
          <View style={styles.elementContainer3}>
            <Label text="Company Logo" style={styles.label} />
          </View>
          <Spacer height={10} />
          <CommonPhotoUploadView
            onUploadSuccess={onCompanyLogoUploadSuccess}
            previousImageUri={firstCompany?.companyLogo as string}
          />
          <Spacer height={20} />
          <View style={styles.elementContainer3}>
            <Label text="Company Signature" style={styles.label} />
          </View>
          <Spacer height={10} />
          <CommonPhotoUploadView
            onUploadSuccess={onCompanySignatureUploadSuccess}
            previousImageUri={firstCompany?.companySignature as string}
          />
          <Spacer height={20} />
          <Button
            text="UPDATE"
            onPress={handleUpdate}
            disabled={false}
            style={styles.previewButtonStyle}
            textStyle={styles.textStyle}
          />
          <Spinner show={false} />
        </View>
      </AvoidSoftInputViewHOC>
      <Spinner show={editCompanyRequesting} />
    </>
  );
};

export default UpdateBasicDetailsForm;
