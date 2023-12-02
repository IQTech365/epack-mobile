import React, { useReducer } from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import FreightTypeView from './components/FreightTypeView';
import {FREIGHT_TYPE, loadTypeOptions} from '../../utils';
import Spacer from '../../../../../../../common/Spacer';
import { initialState, invoiceReducer } from '../../InvoiceReducer2';

interface Props {}

const FreightDetailsView: React.FC<Props> = () => {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);  
  return (
    <View style={styles.container}>
      <FreightTypeView
        freightType={FREIGHT_TYPE.LOAD_TYPE}
        options={loadTypeOptions}
      />
    </View>
  );
};

export default FreightDetailsView;
