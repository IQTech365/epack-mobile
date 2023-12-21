import React from 'react';
import {View} from 'react-native';
import styles from '../style';
import {useAddDriverFormContextHook} from '../../../../../../provider/AddDriverFormContextProvider';
import Label from '../../../../../../common/Label';
import Input from '../../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../../utils/colors';

interface Props {}

const DriverContactInfoView: React.FC<Props> = ({}) => {
  const {state, setDriverMobileNo, setDriverLicenseNo} =
    useAddDriverFormContextHook();

  return (
    <>
      <View style={styles.twoColumnWrapper}>
        <View style={styles.textContainer}>
          <Label text="Driver Mobile No." style={styles.label} />
          <Input
            onChangeText={setDriverMobileNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <View style={styles.textContainer}>
          <Label text="Driver License No" style={styles.label} />
          <Input
            onChangeText={setDriverLicenseNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
      </View>
    </>
  );
};

export default DriverContactInfoView;
