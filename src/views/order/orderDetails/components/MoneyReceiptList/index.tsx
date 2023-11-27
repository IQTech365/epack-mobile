import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import styles from './style';
import Spacer from '../../../../../common/Spacer';
import DocumentActionView from '../../../../../common/DocumentActionView';

export interface IAddMoneyReceiptItem {
    receiptNumber: string;
    receiptDate: string;
    arivalDate: string;
    receiptAgainst: string;
    billNumber: string;
    quotationNumber: string;
    numbersOfArticles: string;
    paymentAmount: string;
    referenceNumber: string;
}

interface IAddMoneyReceiptListItemProps {
    item: IAddMoneyReceiptItem;
    index: number;
    onPress: () => void;
    onDownload: () => void;
    onShare: () => void;
    onEdit: () => void;
    onPreview: () => void;

}

const AddMoneyReceiptListItem: React.FC<IAddMoneyReceiptListItemProps> = ({
    item,
    index,
    onPress,
    onDownload,
    onShare,
    onEdit,
    onPreview,
}) => {
    const [show, setShow] = useState<boolean>(false);
    const [label, setLabel] = useState<string>('VIEW DETAILS');
    const handleShowDetail = () => {
        setShow(!show);
      };

      useEffect(() => {
        if (show) {
          setLabel('HIDE DETAILS');
        } else {
          setLabel('SHOW DETAILS');
        }
      }, [show]);

    return (
        <Shadow style={styles.cardWrapper} distance={8}>
            <TouchableOpacity
                style={styles.container}
                activeOpacity={0.6}
            >
                <Spacer height={6} />
                <View style={styles.rowContainer}>
                    <View style={styles.rowItemContainer}>
                        <Text style={styles.labelText}>Receipt Number</Text>
                    </View>
                    <View style={styles.rowItemContainer2}>
                        <Text style={styles.valueText}>{item.receiptNumber}</Text>
                    </View>
                </View>
                <Spacer height={2} />
                <View style={styles.rowContainer}>
                    <View style={styles.rowItemContainer}>
                        <Text style={styles.labelText}>Receipt Date</Text>
                    </View>
                    <View style={styles.rowItemContainer2}>
                        <Text style={styles.valueText}>{item.receiptDate}</Text>
                    </View>
                </View>
                <Spacer height={2} />
                <View style={styles.rowContainer}>
                    <View style={styles.rowItemContainer}>
                        <Text style={styles.labelText}>Arival Date</Text>
                    </View>
                    <View style={styles.rowItemContainer2}>
                        <Text style={styles.valueText}>{item.arivalDate}</Text>
                    </View>
                </View>
                <Spacer height={2} />
                <View style={styles.rowContainer}>
                    <View style={styles.rowItemContainer}>
                        <Text style={styles.labelText}>Receipt Against</Text>
                    </View>
                    <View style={styles.rowItemContainer2}>
                        <Text style={styles.valueText}>{item.receiptAgainst}</Text>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.rowItemContainer}>
                        <Text style={styles.labelText}>Bill Number</Text>
                    </View>
                    <View style={styles.rowItemContainer2}>
                        <Text style={styles.valueText}>{item.billNumber}</Text>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.rowItemContainer}>
                        <Text style={styles.labelText}>Quotation Number</Text>
                    </View>
                    <View style={styles.rowItemContainer2}>
                        <Text style={styles.valueText}>{item.quotationNumber}</Text>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.rowItemContainer}>
                        <Text style={styles.labelText}>Numbers Of Articles</Text>
                    </View>
                    <View style={styles.rowItemContainer2}>
                        <Text style={styles.valueText}>{item.numbersOfArticles}</Text>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.rowItemContainer}>
                        <Text style={styles.labelText}>Payment Amount</Text>
                    </View>
                    <View style={styles.rowItemContainer2}>
                        <Text style={styles.valueText}>{item.paymentAmount}</Text>
                    </View>
                </View>
                <Spacer height={6} />
            </TouchableOpacity>
            <View style={styles.viewDetailsContainer}>
                <TouchableOpacity activeOpacity={0.6} onPress={handleShowDetail}>
                    <Text style={styles.viewDetailsText}>{label}</Text>
                </TouchableOpacity>
            </View>
            <DocumentActionView
                onShare={onShare}
                onDownload={onDownload}
                onPreview={onPreview}
                onEdit={onEdit}
                show={show}
            />
        </Shadow>
    );
};

export default AddMoneyReceiptListItem;
