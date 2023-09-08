import React from 'react';
import {View, Text, FlatList, SectionList} from 'react-native';
import styles from './style';
import TemplateCard, {ITemplate} from '../templateCard';

interface ITemplateSectionData {
  title: string;
  data: ITemplateListData[]
}

interface ITemplateListData {
  data: ITemplate[]
}

interface ITemplateListViewProps {
  data: ITemplateSectionData[];
}

const TemplateListView: React.FC<ITemplateListViewProps> = ({data}) => {

  const _renderListItem = (data: ITemplateListData, index: number) => {
    return (
      <FlatList
        key={`${index}`}
        style={styles.container}
        data={data.data}
        numColumns={2}
        renderItem={({item, index}) => (
          <TemplateCard data={item} index={index} onPress={() => {}} />
        )}
      />
    );
  };
  return (
    <View>
      <SectionList
        sections={data}
        // keyExtractor={(item, index) => index}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.headerContainer}>
            <Text style={styles.header}>{title}</Text>
          </View>
        )}
        renderItem={({item, index}) => _renderListItem(item, index)}
      />
    </View>
  );
};

export default TemplateListView;
