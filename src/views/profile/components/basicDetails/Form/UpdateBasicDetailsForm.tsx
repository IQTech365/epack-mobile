import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Button from '../../../../../common/Button';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import Spinner from '../../../../../common/Spinner';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import styles from './style';
import {ICompanyInfoData} from '../../../../../interface/companyRegistration/IGetCompaniesResponse';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {
  editCompanyRequest,
  getCompaniesRequest,
  reseteditCompanyRequest,
} from '../../../../../redux/slices/CompanySlice';
import {ICompanyEditRequest} from '../../../../../interface/companyRegistration/ICompanyEditRequest';
import CommonPhotoUploadView, { DOCUMENT } from '../../../../../common/CommonPhotoUploadView';
import {ToastType, showToast} from '../../../../../utils/utility';
import {signatureTypeOptions} from '../utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SignatureCaptureView from '../../../../../common/SignatureCaptureView';
import { getCurrentCompanyId } from '../../../../../utils/storage';

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
  const [companySignatureImage, setCompanySignatureImage] =
    useState<string>('');
  const [changeSignature, setChangeSignature] = useState<boolean>(false);
  const [changeLogo, setChangeLogo] = useState<boolean>(false);
  const [signatureType, setSignatureType] = useState<string>(
    signatureTypeOptions[0],
  );
  const [company, setCompany] = useState<ICompanyInfoData>();
  
  const {
    companies,
    editCompanyRequesting,
    editCompanySuccess,
    editCompanyFailure,
  } = useAppSelector(state => state.Company);
  const {data: companiesData} = companies || {};
  const dispatch = useAppDispatch();

  const _getCompany = () => {
    getCurrentCompanyId().then(id => {
      if (
        companiesData &&
        Array.isArray(companiesData) &&
        companiesData.length > 0
      ) {
        const company = companiesData.find((d:ICompanyInfoData) => d._id == id as string);
        setCompany(company);
      }
    }).catch(err => console.log('storage-error', err));
  };

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
    getCurrentCompanyId().then(id => {
      const payload: ICompanyEditRequest = {
        companyId: id as string,
        payload: {
          contactPerson: contactPerson || company?.contactPerson as string,
          companyWebite: website || company?.companyWebite as string,
          companyLogo: companyLogoImage || (company?.companyLogo as string),
          punchLine: comapnyPunch || company?.punchLine as string,
          companyProfile: '',
          district: '',
          postOffice: '',
          companySignature:
            companySignatureImage || (company?.companySignature as string),
        }
      };
      dispatch(editCompanyRequest(payload));
      // dispatch(getCompaniesRequest(firstCompany?.authId as string));
    }).catch(err => console.log('storage-error--', err));
    
  };

  useEffect(()=> {
    _getCompany();
  }, []);

  useEffect(() => {
    if (!editCompanyRequesting && editCompanySuccess) {
      showToast('Company Info update successfull', ToastType.SUCCESS);
      dispatch(reseteditCompanyRequest());
      onClose();
    } else if (!editCompanyRequesting && editCompanyFailure) {
      showToast('Company Info update failed. Try again!', ToastType.ERROR);
      dispatch(reseteditCompanyRequest());
    }
  }, [editCompanyRequesting, editCompanySuccess, editCompanyFailure]);

  const onImageUploadSuccess = (imagePath:string) => {
    if(changeLogo) {
      setCompanyLogoImage(imagePath);
    } else if(changeSignature) {
      setCompanySignatureImage(imagePath);
    } else {
      setCompanyLogoImage(imagePath);
    }
  }

  const onChangeSignature = () => {
    setChangeLogo(false);
    setChangeSignature(true);
  }

  const onChangeImage = () => {
    setChangeLogo(true);
    setChangeSignature(false);
  }

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
              value={company?.punchLine}
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
              value={company?.contactPerson}
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
              value={company?.companyWebite}
            />
          </View>
          <Spacer height={20} />
          <View style={styles.elementContainer3}>
            <Label text="Company Logo" style={styles.label} />
          </View>
          <Spacer height={10} />
          <CommonPhotoUploadView
            onUploadSuccess={onImageUploadSuccess}
            previousImageUri={company?.companyLogo as string}
            onChageImage={onChangeImage}
          />
          <Spacer height={20} />
          <View style={styles.elementContainer3}>
            <Label text="Company Signature" style={styles.label} />
          </View>
          <View style={styles.checkboxContainer}>
            {signatureTypeOptions.map(d => {
              return (
                <BouncyCheckbox
                  size={25}
                  fillColor={COLOR_BLUE}
                  unfillColor="#FFFFFF"
                  text={d}
                  iconStyle={styles.iconStyle}
                  innerIconStyle={styles.innerIconStyle}
                  textStyle={styles.textStyle2}
                  style={{marginRight: 15}}
                  textContainerStyle={{paddingLeft: 0}}
                  onPress={(isChecked: boolean) => {
                    setSignatureType(d);
                    if(d == signatureTypeOptions[1]) {
                      setChangeSignature(false);
                    }
                  }}
                  isChecked={d == signatureType}
                  disableBuiltInState={true}
                />
              );
            })}
          </View>
          <Spacer height={10} />
          {signatureType == signatureTypeOptions[0] ? (
            <SignatureCaptureView
              onSave={onImageUploadSuccess}
              previousSignatureUri={company?.companySignature as string}
              updateSignature={changeSignature}
              onChangeSignature={onChangeSignature}
            />
          ) : (
            <CommonPhotoUploadView
              onUploadSuccess={onImageUploadSuccess}
              previousImageUri={company?.companySignature as string}
              onChageImage={onChangeSignature}
            />
          )}
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
