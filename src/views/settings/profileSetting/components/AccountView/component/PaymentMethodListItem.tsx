import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {IGetPaymentMethodData} from '../../../../../../interface/setting/packerProfile/paymentMethod/IGetPaymentMethodsResponse';
import {Shadow} from 'react-native-shadow-2';
import DeleteIcon from '../../../../../../images/icons/delete.svg';
import { useAppSelector } from '../../../../../../redux/hooks';
import { IBank } from '../../../../../../interface/common/common';

interface IProps {
  item: IGetPaymentMethodData;
  index: number;
  onDelete: (id: string) => void;
}

const PaymentMethodListItem: FC<IProps> = ({item, index, onDelete}) => {
    const {banks} = useAppSelector(state => state.Common);
    const _getBankList = ():IBank[] => {
        let list:IBank[] = [];
        const {data} = banks || {};
        if(data && Array.isArray(data) && data.length > 0) {
          list = data;
        }
        return list;
    }

    const _getBankName = (bankId:string):string => {
        let name: string = '';
        const bankList = _getBankList();
        const bank:IBank = bankList.find((d:IBank) => d._id == bankId) as IBank;
        if(bank !== undefined) {
            name = bank.bankName;
        }
        return name;
    }

    const _getServiceProviderType = () => {
        let provider:string = '';
        if(item.accountType == 'Bank Account') {
            provider = "Bank Name";
        } else if(item.accountType == "UPI") {
            provider = "UPI Provider"
        }
        return provider;
    }

    const _getServiceProviderName = () => {
        let proverName:string = '';
        if(item.accountType == 'Bank Account') {
            proverName = _getBankName(item.bankId);
        } else if(item.accountType == "UPI") {
            proverName = item.upiType
        }
        return proverName;
    }

    const _getAccountID = () => {
        let accountId:string = '';
        if(item.accountType == 'Bank Account') {
            accountId = item.accountNumber;
        } else if(item.accountType == "UPI") {
            accountId = item.upiId
        }
        return accountId;
    }

  return (
    <View style={styles.topWrapper}>
      <Shadow style={styles.cardWrapper} distance={1.8}>
        <View style={styles.container}>
          <View
            style={[styles.rowContainer, styles.btlr, styles.btrr, styles.top]}>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => {
                onDelete(item._id);
              }}>
              <DeleteIcon width={30} height={30} />
            </TouchableOpacity>
          </View>
          <View style={[styles.rowContainer, styles.bb]}>
            <View style={[styles.labelContainer]}>
              <Text style={styles.label}>Account Type</Text>
            </View>
            <View style={[styles.valueContainer]}>
              <Text style={styles.value}>{item.accountType}</Text>
            </View>
          </View>
          <View style={[styles.rowContainer, styles.bb]}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>{_getServiceProviderType()}</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{_getServiceProviderName()}</Text>
            </View>
          </View>
          <View style={[styles.rowContainer, styles.bblr, styles.bbrr]}>
            <View style={[styles.labelContainer, styles.bblr]}>
              <Text style={styles.label}>Account ID/No.</Text>
            </View>
            <View style={[styles.valueContainer, styles.bbrr]}>
              <Text style={styles.value}>{_getAccountID()}</Text>
            </View>
          </View>
        </View>
      </Shadow>
    </View>
  );
};

export default PaymentMethodListItem;
