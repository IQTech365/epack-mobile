import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import styles from './style';
import Spacer from '../../../../common/Spacer';
import DocumentActionView from '../../../../common/DocumentActionView';

export interface IBiltyItem {
    branches: object,
    companyEntity: string,
    companyId: string,
    initialValue: string,
    moduleId: string,
    moduleName: string,
    modules: object,
    prefix: string
}

interface IBiltyListItemProps {
    item: IBiltyItem;
    index: number;
    onPress: () => void;
    onDownload: () => void;
    onShare: () => void;
    onEdit: () => void;
    onPreview: () => void;

}

const BiltyListItem: React.FC<IBiltyListItemProps> = ({
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
                styles={styles.container}
                activeOpacity={0.6}
            >
                <Spacer height={6} />
                <View style={styles.rowContainer}>
                    <View style={styles.rowItemContainer}>
                        <Text style={styles.labelText}>company Entity</Text>
                    </View>
                    <View style={styles.rowItemContainer2}>
                        <Text style={styles.valueText}>{item.companyEntity}</Text>
                    </View>
                </View>
                <Spacer height={2} />
                <View style={styles.rowContainer}>
                    <View style={styles.rowItemContainer}>
                        <Text style={styles.labelText}>Module Name</Text>
                    </View>
                    <View style={styles.rowItemContainer2}>
                        <Text style={styles.valueText}>{item.moduleName}</Text>
                    </View>
                </View>
                <Spacer height={2} />
                <View style={styles.rowContainer}>
                    <View style={styles.rowItemContainer}>
                        <Text style={styles.labelText}>Prefix</Text>
                    </View>
                    <View style={styles.rowItemContainer2}>
                        <Text style={styles.valueText}>{item.prefix}</Text>
                    </View>
                </View>
                <Spacer height={2} />
                <View style={styles.rowContainer}>
                    <View style={styles.rowItemContainer}>
                        <Text style={styles.labelText}>Initial Value</Text>
                    </View>
                    <View style={styles.rowItemContainer2}>
                        <Text style={styles.valueText}>{item.initialValue}</Text>
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

export default BiltyListItem;
