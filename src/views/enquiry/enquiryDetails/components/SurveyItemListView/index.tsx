import React from 'react';
import {View, Text} from 'react-native';
import Spacer from '../../../../../common/Spacer';
import styles from './style';
import {formatDate5, formatPrice} from '../../../../../utils/formatter';
import {ISurveyListItem} from '../../../../../interface/enquiry/IAddSurveyItemRequest';
import {IGetSurveyItemListData} from '../../../../../interface/enquiry/IGetSurveyItemListResponse';

interface ISurveyItemListViewProps {
  item: IGetSurveyItemListData;
  index: number;
}

const SurveyItemListView: React.FC<ISurveyItemListViewProps> = ({
  item,
  index,
}) => {
  const items: ISurveyListItem[] = item.surveyItems;

  const showSurveyDateAndNumber = () => {
    if (index == 0) {
      return (
        <View style={styles.surveyDateAndNumberContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabelText2}>SURVEY DATE: </Text>
            <Spacer width={4} />
            <Text style={styles.contentLabelText}>
              {formatDate5(new Date(item.surveyDate))}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabelText2}>{`SURVEY NO#: `}</Text>
            <Text style={styles.contentLabelText}>{item.surveyListNo}</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <>
      {showSurveyDateAndNumber()}
      {items.map((d: ISurveyListItem) => {
        return (
          <>
            <View style={styles.container}>
              <View style={styles.rightContentContainer}>
                <View style={styles.contentContainer}>
                  <Text style={styles.contentLabelText2}>{`Item Name: `}</Text>
                  <Text style={styles.contentLabelText}>{d.itemName}</Text>
                </View>
                <View style={styles.contentContainer}>
                  <Text style={styles.contentLabelText2}>{`Quantity: `}</Text>
                  <Text style={styles.contentLabelText}>{d.quantity}</Text>
                </View>
                <View style={styles.contentContainer}>
                  <Text style={styles.contentLabelText2}>
                    {`Value Of Goods: `}
                  </Text>
                  <Text style={styles.contentLabelText}>
                    {formatPrice(d.valueOfGoods)}
                  </Text>
                </View>
              </View>
            </View>
            <Spacer height={6} />
          </>
        );
      })}
    </>
  );
};

export default SurveyItemListView;
