/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../../common/Spacer';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Input from '../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from './style';
import contactDetail from '../../../../../data/contactDetail.json';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import applicableForOptions from '../../../../../data/applicableForOptions.json';
import Button from '../../../../../common/Button';

interface IContactDetailsProps {}

const ContactDetailUpdateView: React.FC<IContactDetailsProps> = ({}) => {
  const [contactInfo, setContactInfo] = useState<string>('');

  const handleSwitchContactDetail = () => {
    switch (contactInfo) {
      case 'EMAIL':
        return (
          <View style={styles.textContainer2}>
            <Label text="Email" style={styles.label} />
            <Input
              onChangeText={() => {}}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        );
      case 'LANDLINE':
        return (
          <View style={styles.textContainer2}>
            <Label text="Landline" style={styles.label} />
            <Input
              onChangeText={() => {}}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        );
      case 'MOBILE':
        return (
          <View style={styles.textContainer2}>
            <Label text="Mobile" style={styles.label} />
            <Input
              onChangeText={() => {}}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        );
    }
  };

  const handleContactDetail = (item: TDropdownItem) => {
    console.log(item.label, 'lll');
    setContactInfo(item.label);
  };

  return (
    <AvoidSoftInputViewHOC>
      <View>
        <Spacer height={4} />

        <View style={styles.textContainer2}>
          <Label text="Contact Detail" style={styles.label} />
          <DropdownComponent
            data={contactDetail}
            onSelect={handleContactDetail}
          />
        </View>
        <Spacer height={12} />
        {handleSwitchContactDetail()}

        <Spacer height={12} />
        <View style={styles.textContainer2}>
          <Label text="Applicable For" style={styles.label} />
        </View>
        <View style={styles.applicableWrapper}>
          {applicableForOptions.map((item, index) => {
            return (
              <View style={styles.checkboxItem}>
                <BouncyCheckbox
                  size={25}
                  fillColor={COLOR_BLUE}
                  unfillColor="#FFFFFF"
                  text={item.template}
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
            );
          })}
        </View>
        <Spacer height={20} />
        <Button
          text="SAVE"
          onPress={() => {
            console.log('submitted data');
          }}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default ContactDetailUpdateView;
