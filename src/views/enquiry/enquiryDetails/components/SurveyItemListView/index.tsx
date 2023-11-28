import React from 'react';
import {View, Text} from 'react-native';
import Spacer from '../../../../../common/Spacer';
import styles from './style';
import {formatDate5, formatPrice} from '../../../../../utils/formatter';

interface ISurveyItemListViewProps {
  item: any;
  index: number;
}

const SurveyItemListView: React.FC<ISurveyItemListViewProps> = ({
  item,
  index,
}) => {
  const showSurveyDateAndNumber = () => {
    if (index == 0) {
      return (
        <View style={styles.surveyDateAndNumberContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabelText2}>SURVEY DATE: </Text>
            {/* <ClockIcon width={22} height={22} /> */}
            <Spacer width={4} />
            <Text style={styles.contentLabelText}>
              {formatDate5(item.surveyDate)}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabelText2}>
              {`SURVEY NO#: `}
            </Text>
            <Text style={styles.contentLabelText}>
              {item.surveyListNo}
            </Text>
          </View>
        </View>
      );
    }
    return null;
  };

  

  return (
    <>
      {showSurveyDateAndNumber()}
      <View style={styles.container}>
        <View style={styles.rightContentContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabelText2}>
              {`Item Name: `} 
            </Text>
            <Text style={styles.contentLabelText}>
              {item.itemName}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabelText2}>
              {`Quantity: `}
            </Text>
            <Text style={styles.contentLabelText}>
              {item.quantity}
            </Text>
          </View>
         
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabelText2}>
              {`Value Of Goods: `}
            </Text>
            <Text style={styles.contentLabelText}>
              {formatPrice(item.valueOfGoods)}
            </Text>
          </View>
        </View>
      </View>
      <Spacer height={6} />
    </>
  );
};

export default SurveyItemListView;
