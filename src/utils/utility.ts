import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import Toast from 'react-native-toast-message';
import {ISavedDocumentTemplateId} from '../interface/setting/template/template';
import { IAppSetting } from '../interface/common/common';

export const startShare = async (html: any, docName: string, action: any) => {
  let options = {
    html: html,
    fileName: docName,
    directory: 'Documents',
  };
  let file = await RNHTMLtoPDF.convert(options);
  console.log('file--', JSON.stringify(file));
  // const fileExists = await RNFS.exists(file.filePath);
  // if(!fileExists) {
  //   console.log('Filed does not exists');
  //   return;
  // }

  const shareOptions = {
    file: 'pdf',
    message: docName,
    url: `file://${file.filePath}`,
  };
  Share.open(shareOptions)
    .then(res => {
      console.log(res);
      action();
    })
    .catch(err => {
      //   dispatch(clearMoneyReceiptHtmlDocument());
      action();
      console.log(err);
    });
};

export const debounce = (func: any, delay: number) => {
  let timerId: any;
  return (...args: any) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(args);
    }, delay);
  };
};

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
}

export const showToast = (message: string, toastType: ToastType) => {
  const title: string = toastType == ToastType.SUCCESS ? 'Success' : 'Error';
  Toast.show({
    type: toastType,
    text1: title,
    text2: message,
  });
};

export const getTemplateIdBySubModuleId = (
  subModuleId: string,
  templateList: ISavedDocumentTemplateId[],
):string => {
  let templateId: string = '';
  if (templateList && templateList.length > 0) {
    const template: ISavedDocumentTemplateId = templateList.find(
      (d: ISavedDocumentTemplateId) => d.moduleId == subModuleId,
    ) as ISavedDocumentTemplateId;
    if (template) {
      templateId = template.templateId;
    }
  }
  return templateId;
};

export const getSubmoduleInitialValue = (subModuleId:string, appSettings:IAppSetting[]) => {
  let initialValue:string = '';
  if(appSettings && appSettings.length > 0) {
    const appSetting:IAppSetting = appSettings.find((d:IAppSetting) => d.subModuleId == subModuleId) as IAppSetting;
    initialValue = appSetting?.initialValue;
  }
  return initialValue;
}
