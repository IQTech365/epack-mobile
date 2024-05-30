import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {IGetPaymentMethodData} from '../../../../../../interface/setting/packerProfile/paymentMethod/IGetPaymentMethodsResponse';
import {Shadow} from 'react-native-shadow-2';
import DeleteIcon from '../../../../../../images/icons/delete.svg';
import EditIcon from '../../../../../../images/icons/edit_icon.svg';
import { useAppSelector } from '../../../../../../redux/hooks';
import { IBank, ISubmodule } from '../../../../../../interface/common/common';
import Spacer from '../../../../../../common/Spacer';

interface IProps {
  item: IGetPaymentMethodData;
  index: number;
  onDelete: (id: string) => void;
  onEdit: (data: IGetPaymentMethodData) => void;
}

const PaymentMethodListItem: FC<IProps> = ({item, index, onDelete, onEdit}) => {
    const {banks} = useAppSelector(state => state.Common);
    const {submodules} = useAppSelector(state => state.Common);

    const _getBankList = ():IBank[] => {
        let list:IBank[] = [];
        const {data} = banks || {};
        if(data && Array.isArray(data) && data.length > 0) {
          list = data;
        }
        return list;
    }

    const _getSubmodules = (): ISubmodule[] => {
      let items: ISubmodule[] = [];
      const {data} = submodules || {};
      if (data && Array.isArray(data) && data.length > 0) {
        items = data;
      }
      return items.filter((d: ISubmodule) => d.availableOnDocument);
    };


    const _getSubmoduleName = (submoduleId: string): string => {
      let name: string = '';
      const list: ISubmodule[] = _getSubmodules();
      if (list && list.length > 0) {
        const submodule: ISubmodule = list.find(
          (d: ISubmodule) => d._id == submoduleId,
        ) as ISubmodule;
        if (submodule) {
          name = submodule.subModuleName;
        }
      }
      return name;
    };


    const _transformSubmoduleIdToName = (modules: string[]): string[] => {
      let list: string[] = [];
      if (modules && modules.length > 0) {
        list = modules.map((d: string) => _getSubmoduleName(d));
      }
      return list;
    };

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
            {/* <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => {
                onDelete(item._id);
              }}>
              <DeleteIcon width={28} height={28} />
            </TouchableOpacity> */}
            <Spacer width={20} />
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => {
                onEdit(item);
              }}>
              <EditIcon width={28} height={28} />
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
            <View style={[styles.labelContainer]}>
              <Text style={styles.label}>Account Holder</Text>
            </View>
            <View style={[styles.valueContainer]}>
              <Text style={styles.value}>{item.accountHolderName}</Text>
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
          <View style={[styles.rowContainer, styles.bblr, styles.bbrr]}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Modules:</Text>
            </View>
            <View style={[styles.valueContainer, styles.bbrr]}>
              <Text style={styles.value}>                {_transformSubmoduleIdToName(item.moduleId).join(',')}</Text>
            </View>
          </View>
        </View>
      </Shadow>
    </View>
  );
};

export default PaymentMethodListItem;
