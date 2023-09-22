/* eslint-disable prettier/prettier */
import React, {useRef, useState} from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../../common/Spacer';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import {COLOR_BLUE} from '../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from './style';
import signatureTypeOptions from '../../../../../data/signatureType.json';
import roleType from '../../../../../data/roleType.json';
import employeName from '../../../../../data/employeName.json';
import SignatureCapture from 'react-native-signature-capture';
import { TDropdownItem } from '../../../../../type/TDropdownItem';
import UploadIcon from '../../../../../images/icons/upload_icon.svg';

interface ISigatureUpdateProps {}

const SignatureUpdateView: React.FC<ISigatureUpdateProps> = ({}) => {
  const [signatureType, setSignatureType] = useState<string>('1');
  const signatureRef = useRef();
  const handleSignatureType = (item: TDropdownItem) => {
    console.log('account type');
    setSignatureType(item.value);
  };

  const handleRoleType = (item: TDropdownItem) => {
    console.log('account type');
    setSignatureType(item.value);
  };

  const _onSaveEvent = (result: any) => {
    console.log(result);
    // setSignatureUri(result?.encoded);
    // setOwnerSignature(result?.encoded as string);
  };

  const _onDragEvent = () => {
    console.log('dragged');
  };

  const saveSign = () => {
    // setIsBase64Image(true);
    //@ts-ignore
    signatureRef.current?.saveImage();
  };

  const resetSign = () => {
    // setIsBase64Image(false);
    // setSignatureUri('');
    // setOwnerSignature('' as string);
    //@ts-ignore
    signatureRef.current?.resetImage();
  };

  const showSignatureView = () => {
      if(signatureType == '2') return null;
    return (
      <>
        <Spacer height={4} />
        <View style={styles.signatureWrapper}>
          <SignatureCapture
            style={styles.signature}
            ref={signatureRef}
            onSaveEvent={_onSaveEvent}
            onDragEvent={_onDragEvent}
            saveImageFileInExtStorage={false}
            showNativeButtons={false}
            showTitleLabel={false}
            backgroundColor="#ffffff"
            strokeColor="#000000"
            minStrokeWidth={4}
            maxStrokeWidth={4}
            viewMode={'portrait'}
          />
        </View>
        <View style={styles.rowContainer2}>
          <TouchableHighlight
            style={styles.buttonStyle2}
            onPress={() => {
              saveSign();
            }}>
            <Text>Save</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonStyle2}
            onPress={() => {
              resetSign();
            }}>
            <Text>Reset</Text>
          </TouchableHighlight>
        </View>
      </>
    );
  };

  const showSignatureUploadView = () => {
    if(signatureType == '1') return null;
      return (
          <View style={styles.signatureUploadContainer}>
              <UploadIcon width={32} height={32} />
              <Text>Upload your signature</Text>
          </View>
      );
  }

  return (
    <AvoidSoftInputViewHOC>
      <View>
        {/* <View style={styles.mainWrapper}> */}
        <View style={styles.textContainer2}>
          <Label text="Choose Signature Type" style={styles.label} />
          <DropdownComponent
            data={signatureTypeOptions}
            onSelect={handleSignatureType}
          />
        </View>
        <Spacer height={12} />
        {showSignatureView()}
        {showSignatureUploadView()}
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Role Type" style={styles.label} />
          <DropdownComponent data={roleType} onSelect={handleRoleType} />
        </View>
        {/* </View> */}
        <Spacer height={4} />

        <View style={styles.textContainer2}>
          <Label text="Name of Employe" style={styles.label} />
          <DropdownComponent data={employeName} onSelect={handleRoleType} />
        </View>
        <Spacer height={12} />
        <View style={styles.mainWrapper}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <BouncyCheckbox
                size={25}
                fillColor={COLOR_BLUE}
                unfillColor="#FFFFFF"
                text="Quotation"
                iconStyle={{
                  borderColor: 'red',
                  borderRadius: 0,
                  width: 18,
                  height: 18,
                }}
                innerIconStyle={{
                  borderWidth: 1,
                  borderRadius: 0,
                  width: 18,
                  height: 18,
                }}
                textStyle={{
                  fontFamily: 'JosefinSans-Regular',
                  textDecorationLine: 'none',
                }}
                style={{marginRight: 15}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {
                  //   setFixedFreight(isChecked);
                  //   handleFixedFreightTemplate(isChecked);
                }}
                isChecked={false}
              />

              <BouncyCheckbox
                size={25}
                fillColor={COLOR_BLUE}
                unfillColor="#FFFFFF"
                text="Invoice"
                iconStyle={{
                  borderColor: 'red',
                  borderRadius: 0,
                  width: 18,
                  height: 18,
                }}
                innerIconStyle={{
                  borderWidth: 1,
                  borderRadius: 0,
                  width: 18,
                  height: 18,
                }}
                textStyle={{
                  fontFamily: 'JosefinSans-Regular',
                  textDecorationLine: 'none',
                }}
                style={{marginRight: 15}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {
                  //   setFixedFreight(isChecked);
                  //   handleFixedFreightTemplate(isChecked);
                }}
                isChecked={false}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <BouncyCheckbox
                size={25}
                fillColor={COLOR_BLUE}
                unfillColor="#FFFFFF"
                text="Bilty"
                iconStyle={{
                  borderColor: 'red',
                  borderRadius: 0,
                  width: 18,
                  height: 18,
                }}
                innerIconStyle={{
                  borderWidth: 1,
                  borderRadius: 0,
                  width: 18,
                  height: 18,
                }}
                textStyle={{
                  fontFamily: 'JosefinSans-Regular',
                  textDecorationLine: 'none',
                }}
                style={{marginRight: 15}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {
                  //   setFixedFreight(isChecked);
                  //   handleFixedFreightTemplate(isChecked);
                }}
                isChecked={false}
              />

              <BouncyCheckbox
                size={25}
                fillColor={COLOR_BLUE}
                unfillColor="#FFFFFF"
                text="Car Condition"
                iconStyle={{
                  borderColor: 'red',
                  borderRadius: 0,
                  width: 18,
                  height: 18,
                }}
                innerIconStyle={{
                  borderWidth: 1,
                  borderRadius: 0,
                  width: 18,
                  height: 18,
                }}
                textStyle={{
                  fontFamily: 'JosefinSans-Regular',
                  textDecorationLine: 'none',
                }}
                style={{marginRight: 15}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {
                  //   setFixedFreight(isChecked);
                  //   handleFixedFreightTemplate(isChecked);
                }}
                isChecked={false}
              />
            </View>
            <BouncyCheckbox
              size={25}
              fillColor={COLOR_BLUE}
              unfillColor="#FFFFFF"
              text="Money Reciept"
              iconStyle={{
                borderColor: 'red',
                borderRadius: 0,
                width: 18,
                height: 18,
              }}
              innerIconStyle={{
                borderWidth: 1,
                borderRadius: 0,
                width: 18,
                height: 18,
              }}
              textStyle={{
                fontFamily: 'JosefinSans-Regular',
                textDecorationLine: 'none',
              }}
              style={{marginRight: 15}}
              textContainerStyle={{paddingLeft: 0}}
              onPress={(isChecked: boolean) => {
                //   setFixedFreight(isChecked);
                //   handleFixedFreightTemplate(isChecked);
              }}
              isChecked={false}
            />
          </View>
        </View>
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default SignatureUpdateView;
