import React, {useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../common/CollapsibleView';
import {options2} from '../FreightDetailsView/components/utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';

import {ISingleQuotationData} from '../../../../../interface/quotation/IGetSingleQuotationResponse';
import {IGetQuotationData} from '../../../../../interface/quotation/IGetQuotationsResponse';
import _ from 'underscore';
import {useAppSelector} from '../../../../../redux/hooks';
import SelectCheckBoxText from '../../../../../common/SelectCheckBoxText';
import Spacer from '../../../../../common/Spacer';
interface Props {
  isEdit?: boolean;
  item?: IGetQuotationData;
  quotationData?: ISingleQuotationData;
}

const SurveyItemQuotation: React.FC<Props> = ({
  isEdit,
  item,
  quotationData,
}) => {
  const {state, setSurveyItem} = useQuotationFormContextHook();


  const [transformedData, setTransformedData] = useState<
    TPackingMateiralItem[]
  >([]);

  const {surveyCategory, surveyMaterial} = useAppSelector(
    state => state.Common,
  );

  type TPackingMateiralItem = {
    _id: string;
    surveyCategoryId: string;
    surveyMaterialItem: string;
    surveyCategoryName: string;
  };

  const transformSurveyData = () => {
    let _data: TPackingMateiralItem[] = [];
    const {data: surveyMaterials} = surveyMaterial || {};
    const {data: surveyCategories} = surveyCategory || {};

    if (
      surveyMaterials &&
      Array.isArray(surveyMaterials) &&
      surveyMaterials.length > 0
    ) {
      const groupedData = surveyMaterials.reduce((acc, curr) => {
        const {surveyCategoryId, surveyMaterialItem} = curr;
        const category = surveyCategories?.find(
          (cat: TPackingMateiralItem) => cat._id === surveyCategoryId,
        );

        if (category) {
          const surveyCategoryName = category.surveyCategoryName;

          if (!acc[surveyCategoryName]) {
            acc[surveyCategoryName] = {
              surveyCategoryName,
              surveyMaterialItem: [],
            };
          }

          acc[surveyCategoryName].surveyMaterialItem.push(surveyMaterialItem);
        }

        return acc;
      }, {});

      _data = Object.values(groupedData);
    }
    setTransformedData(_data);
  };

  useEffect(() => {
    transformSurveyData();
  }, [surveyMaterial]);


  return (
    <CollapsibleView title="SURVEY ITEM" collapsed={true}>
      <View>
        <View style={styles.optionContainer}>
          {options2.map((option: string, index: number) => (
            <BouncyCheckbox
              key={`${index}`}
              size={25}
              unfillColor="#FFFFFF"
              text={option}
              fillColor={COLOR_BLUE}
              iconStyle={styles.iconStyle}
              innerIconStyle={styles.innerIconStyle}
              textStyle={styles.textStyle}
              style={styles.style}
              textContainerStyle={styles.textContainerStyle}
              onPress={(isChecked: boolean) => {
                setSurveyItem(option);
              }}
              isChecked={state.surveyItem == option}
              disableBuiltInState={true}
            />
          ))}
        </View>
        {state.surveyItem === options2[0] && (
          <View>
            {transformedData.length > 0 && (
              <View>
                {transformedData.map((item, index) => (
                    
                    <View key={index}>
                      <Spacer height={4} />
                    <CollapsibleView title={item.surveyCategoryName} collapsed={true}>
                      <View>
                        <SelectCheckBoxText
                          items={Array.isArray(item.surveyMaterialItem) ? item.surveyMaterialItem : [item.surveyMaterialItem]}
                        />
                      </View>
                    </CollapsibleView>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </CollapsibleView>
  );
};

export default SurveyItemQuotation;
