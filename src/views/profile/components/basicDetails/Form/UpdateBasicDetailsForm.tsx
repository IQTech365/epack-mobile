import React from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Button from '../../../../../common/Button';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import Spinner from '../../../../../common/Spinner';
import {COLOR_BLACK} from '../../../../../utils/colors';
import styles from './style';

interface IUpdateBasicDetailsFormProps {
  //
}

const UpdateBasicDetailsForm: React.FC<IUpdateBasicDetailsFormProps> = ({}) => {
  const handleUpdate = () => {
    //
  };
  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <View style={styles.elementContainer3}>
          <Label text="Company Punch Line" style={styles.label} />
          <Input
            onChangeText={() => {}}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer3}>
          <Label text="Contact Person" style={styles.label} />
          <Input
            onChangeText={() => {}}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer3}>
          <Label text="Website" style={styles.label} />
          <Input
            onChangeText={() => {}}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
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
  );
};

export default UpdateBasicDetailsForm;
