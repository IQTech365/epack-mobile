import React, { useEffect, useState } from 'react';
import {SectionList, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import styles from './styles';
import {
  ISaveDocumentTemplateIdPayload,
  ITemplate,
  ITemplateData,
} from '../../../../../interface/setting/template/template';
import TemplateCard from '../templateCard';
import TemplateEmptyView from '../TemplateEmptyView';
import { getSavedDocumentTemplateIdListRequest, resetSaveDocumentTemplateIdRequest, saveDocumentTemplateIdRequest } from '../../../../../redux/slices/TemplateSettingSlice';
import { ToastType, showToast } from '../../../../../utils/utility';
import Spinner from '../../../../../common/Spinner';
import { getCurrentCompanyId } from '../../../../../utils/storage';

interface ISectionData {
  title: string;
  data: ITemplate[];
}

//@ts-ignore
const TemplatePageView = ({route}) => {
  const dispatch = useAppDispatch();
  const {
    templates,
    saveDocTemplateIdRequesting,
    saveDocTemplateIdSuccess,
    saveDocTemplateIdFailure,
  } = useAppSelector(state => state.Template);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeTemplateId, setActiveTemplateId] = useState<string>('');
  const [activeModuleId, setActiveModuleId] = useState<string>('');

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

  const _setActiveCategory = () => {
    const categories:string[] = _getUniqueTemplateCategories();
    if(categories && categories.length > 0) {
      setActiveCategory(categories[0]);
    }
  }

  const _setActiveTemplateIndex = () => {
    const sectionData:ISectionData[] = _prepareTemplateListWithCategory();
    if(sectionData && sectionData.length > 0) {
      const firstSection:ISectionData = sectionData[0];
      const templates:ITemplate[] = firstSection.data;
      if(templates && templates.length > 0) {
        const firstTemplate:ITemplate = templates[0];
        setActiveTemplateId(firstTemplate._id);
        setActiveModuleId(firstTemplate.moduleId);
      }
    }
  }

  const _getSavedTemplateId = () => {
    getCurrentCompanyId().then(id => {
      dispatch(getSavedDocumentTemplateIdListRequest(id as string));
    }).catch(err => console.log(err));
  }

  const handleChangeTemplateId = (category: string, moduleId:string, templateId:string) => {
    setActiveCategory(category);
    setActiveTemplateId(templateId)
    getCurrentCompanyId().then(id => {
      const payload:ISaveDocumentTemplateIdPayload = {
        params: {
          templateId: templateId,
        },
        payload: {
          companyId: id as string,
          moduleId: moduleId,
        }
      }
      dispatch(saveDocumentTemplateIdRequest(payload));
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    _setActiveCategory();
    _setActiveTemplateIndex();
  }, []);

  useEffect(() => {
    if(!saveDocTemplateIdRequesting && saveDocTemplateIdSuccess) {
      showToast('Template Id Saved.', ToastType.SUCCESS);
      dispatch(resetSaveDocumentTemplateIdRequest());
      _getSavedTemplateId();
    } else if(!saveDocTemplateIdRequesting && saveDocTemplateIdFailure) {
      showToast('Template Id Not Saved. Try again!', ToastType.ERROR);
      dispatch(resetSaveDocumentTemplateIdRequest());
    }
  }, [saveDocTemplateIdRequesting, saveDocTemplateIdSuccess, saveDocTemplateIdFailure]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <SectionList
        sections={_prepareTemplateListWithCategory()}
        renderItem={({item, index}) => (
          <TemplateCard
            item={item}
            index={index}
            category={activeCategory}
            activeTemplateId={activeTemplateId}
            onChangeTemplateId={handleChangeTemplateId}
          />
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.taskTitle}>{section.title}</Text>
          </View>
        )}
        ListEmptyComponent={TemplateEmptyView}
        keyExtractor={item => item._id}
        stickySectionHeadersEnabled
      />
      <Spinner show={saveDocTemplateIdRequesting} />
    </View>
  );
};

export default TemplatePageView;
