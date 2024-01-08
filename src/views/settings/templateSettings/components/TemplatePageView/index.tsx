import React from 'react';
import {SectionList, Text, View} from 'react-native';
import {useAppSelector} from '../../../../../redux/hooks';
import styles from './styles';
import {
  ITemplate,
  ITemplateData,
} from '../../../../../interface/setting/template/template';
import TemplateCard from '../TemplateCard';

interface ISectionData {
  title: string;
  data: ITemplate[];
}

//@ts-ignore
const TemplatePageView = ({route}) => {
  const {templates} = useAppSelector(state => state.Template);

  const _getTemplatesByModuleId = () => {
    let list: ITemplate[] = [];
    const {data} = templates || {};
    if (data && Array.isArray(data) && data.length > 0) {
      const item: ITemplateData = data.find(
        (d: ITemplateData) => d._id == route?.data?._id,
      );
      if (item) {
        list = item.rows;
      }
    }
    return list;
  };
  // console.log(
  //   'templates-bymodule---',
  //   JSON.stringify(_getTemplatesByModuleId()),
  // );
  const _getUniqueTemplateCategories = () => {
    const templateVersions: string[] = _getTemplatesByModuleId().map(
      (d: ITemplate) => d.templateVersion,
    );
    const uniqueCategories: string[] = Array.from(new Set(templateVersions));
    return uniqueCategories;
  };

  const _prepareTemplateListWithCategory = () => {
    const sectionData: ISectionData[] = [];
    const templateCategories = _getUniqueTemplateCategories();
    if (templateCategories && templateCategories.length > 0) {
      templateCategories.forEach((templateCategory: string) => {
        const data: ITemplate[] = _getTemplatesByModuleId().filter(
          (d: ITemplate) => d.templateVersion == templateCategory,
        );
        const item: ISectionData = {
          title: templateCategory,
          data: data,
        };
        sectionData.push(item);
      });
    }
    return sectionData;
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <SectionList
        sections={_prepareTemplateListWithCategory()}
        renderItem={({item, index}) => (
          <TemplateCard item={item} index={index} />
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.taskTitle}>{section.title}</Text>
          </View>
        )}
        keyExtractor={item => item._id}
        stickySectionHeadersEnabled
      />
    </View>
  );
};

export default TemplatePageView;
