import {IModule} from '../../interface/setting/role/IModule';
import {
  ISubmodule,
  ISubmoduleFeature,
  ISubscriptionFeature,
  ISubscriptionPlan,
} from '../../interface/subscription/subscription';

export const getSubmoduleFeatureById = (
  id: string,
  data: ISubmoduleFeature[],
) => {
  let submoduleFeature: ISubmoduleFeature | null = null;
  if (data && Array.isArray(data) && data.length > 0) {
    submoduleFeature = data.find(
      (d: ISubmoduleFeature) => d._id == id,
    ) as ISubmoduleFeature;
  }
  return submoduleFeature;
};

export const getSubmoduleById = (id: string, data: ISubmodule[]) => {
  let submodule: ISubmodule | null = null;
  if (data && Array.isArray(data) && data.length > 0) {
    submodule = data.find((d: ISubmodule) => d._id == id) as ISubmodule;
  }
  return submodule;
};

export const getModuleById = (id: string, data: IModule[]) => {
  let submodule: IModule | null = null;
  if (data && Array.isArray(data) && data.length > 0) {
    submodule = data.find((d: IModule) => d._id == id) as IModule;
  }
  return submodule;
};

export const transformFeatureList = (
  list: ISubscriptionFeature[],
  moduleData: IModule[],
  submoduleData: ISubmodule[],
  submoduleFeatureData: ISubmoduleFeature[],
): ISubscriptionFeature[] => {
  let transformList: ISubscriptionFeature[] = [];
  if (list && list.length > 0) {
    transformList = list.map((d: ISubscriptionFeature) => {
      const item: ISubscriptionFeature = {
        ...d,
        moduleName: getModuleById(d.moduleId, moduleData)?.moduleName as string,
        subModuleName: getSubmoduleById(d.subModuleId, submoduleData)
          ?.subModuleName as string,
        featureName: getSubmoduleFeatureById(d.featureId, submoduleFeatureData)
          ?.feature as string,
      };
      return item;
    });
  }
  return transformList;
};

export const prepareSubscriptionPlanList = (data: ISubscriptionPlan[], moduleData: IModule[],
    submoduleData: ISubmodule[],
    submoduleFeatureData: ISubmoduleFeature[]): ISubscriptionPlan[] => {
  let plans: ISubscriptionPlan[] = [];
  if (data && Array.isArray(data) && data.length > 0) {
    plans = data.map((d: ISubscriptionPlan) => {
      const plan: ISubscriptionPlan = {
        ...d,
        list: transformFeatureList(d.list, moduleData, submoduleData, submoduleFeatureData),
      };
      return plan
    });
  }
  return plans;
};
