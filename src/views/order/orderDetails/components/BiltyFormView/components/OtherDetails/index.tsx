import React from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';

const OtherDetails: React.FC<{}> = ({}) => {
  const {setRemark} = useBiltyFormContextHook();
  return (
    <CollapsibleView title="OTHER DETAILS" collapsed={true}>
      <View>
        <View style={styles.elementContainer2}>
          <Label text="Remark" style={styles.label} />
          <Input
            onChangeText={setRemark}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
      </View>
    </CollapsibleView>
  );
};

export default OtherDetails;
