import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './style';
import TemplateCard, {ITemplate} from '../templateCard';



export interface ITemplateListData {
  title: string;
  data: ITemplate[];
}

interface ITemplateListViewProps2 {
  data: ITemplateListData[];
  onTemplateSelect: (planCategory: string, plan: number, planName: string) => void;
}

const TemplateListView: React.FC<ITemplateListViewProps2> = ({data, onTemplateSelect}) => {
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState<number>(-1);
  const [currentParentIndex, setCurrentParentIndex] = useState<number>(-1);

  const handleIndexChange = (index: number, parentIndex: number, planName: string) => {
    const planCategory = data.find((_, index) => index == parentIndex);
    setCurrentTemplateIndex(index);
    setCurrentParentIndex(parentIndex);
    onTemplateSelect(planCategory?.title as string, index, planName);
  }

  return (
    <ScrollView>
      {data.map((ele, index) => {
        return (
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>{ele.title}</Text>
            </View>
            <View style={styles.templateContainer}>
              {ele.data.map((temp, idx) => {
                return (
                  <TemplateCard
                    data={temp}
                    index={idx}
                    onPress={handleIndexChange}
                    selectedTemplateIndex={currentTemplateIndex}
                    parentIndex={index}
                    currentParentIndex={currentParentIndex}
                  />
                );
              })}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default TemplateListView;
