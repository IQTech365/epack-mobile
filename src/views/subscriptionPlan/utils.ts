import {IModule} from '../../interface/setting/role/IModule';
import {
  IPlanFeature,
  ISubmodule,
  ISubmoduleFeature,
  ISubmoduleFeatureWithActions,
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

export const _getPlanFeatures = (list: ISubscriptionFeature[]) => {
  const planFeatures: IPlanFeature[] = [];
  const moduleIds = list.map((d: ISubscriptionFeature) => d.moduleId);
  const nonDuplicateModuleIds = Array.from(new Set(moduleIds));
  nonDuplicateModuleIds.forEach((d: string) => {
    const module: ISubscriptionFeature = list.find(
      (e: ISubscriptionFeature) => e.moduleId == d,
    ) as ISubscriptionFeature;
    const submodules: ISubscriptionFeature[] = list.filter(
      (sm: ISubscriptionFeature) => sm.moduleId == module.moduleId,
    );
    const submodulesWithFeatures: ISubmoduleFeatureWithActions[] = [];
    submodules.forEach((submod: ISubscriptionFeature) => {
      const features: string[] = _getSubmoduleFeatures(
        submod.subModuleId,
        submodules,
      );
      const item: ISubmoduleFeatureWithActions = {
        moduleFeature: submod.subModuleName,
        actions: features,
      };
      submodulesWithFeatures.push(item);
    });
    const ids = submodulesWithFeatures.map(({moduleFeature}) => moduleFeature);
    const filterDuplicates: ISubmoduleFeatureWithActions[] =
      submodulesWithFeatures.filter(
        ({moduleFeature}, index) => !ids.includes(moduleFeature, index + 1),
      );
    const planFeature: IPlanFeature = {
      moduleName: module.moduleName,
      moduleFeatures: filterDuplicates,
    };
    planFeatures.push(planFeature);
  });

  return planFeatures;
};

const _getSubmoduleFeatures = (
  submoduleId: string,
  list: ISubscriptionFeature[],
) => {
  let submoduleFeatures: string[] = [];
  const filterSubmodules = list.filter(
    (d: ISubscriptionFeature) => d.subModuleId == submoduleId,
  );
  submoduleFeatures = filterSubmodules.map(
    (d: ISubscriptionFeature) => d.featureName,
  );
  return submoduleFeatures;
};

export const prepareSubscriptionPlanList = (
  data: ISubscriptionPlan[],
  moduleData: IModule[],
  submoduleData: ISubmodule[],
  submoduleFeatureData: ISubmoduleFeature[],
): ISubscriptionPlan[] => {
  let plans: ISubscriptionPlan[] = [];
  if (data && Array.isArray(data) && data.length > 0) {
    plans = data.map((d: ISubscriptionPlan) => {
      const plan: ISubscriptionPlan = {
        ...d,
        list: transformFeatureList(
          d.list,
          moduleData,
          submoduleData,
          submoduleFeatureData,
        ),
      };
      return plan;
    });
  }
  return prepareSubscriptionPlanList2(plans);
};

export const prepareSubscriptionPlanList2 = (
  data: ISubscriptionPlan[],
): ISubscriptionPlan[] => {
  let plans: ISubscriptionPlan[] = [];
  if (data && Array.isArray(data) && data.length > 0) {
    plans = data.map((d: ISubscriptionPlan) => {
      const plan: ISubscriptionPlan = {
        ...d,
        planFeatures: _getPlanFeatures(d.list),
      };
      return plan;
    });
  }
  return plans;
};

export const getNextRenewableDate = (
  days: number = 0,
  months: number = 0,
  years: number = 0,
) => {
  let currentDate = new Date();

  if (months !== 0) currentDate.setMonth(currentDate.getMonth() + +months);
  else if (days !== 0) currentDate.setDate(currentDate.getDate() + +days);
  else if (years !== 0)
    currentDate.setFullYear(currentDate.getFullYear() + years);
  return new Date(currentDate).toString();
};
export interface IDurationConverter {
  months: number;
  days:number;
  years:number;
}
export const getDurationConverter = (duration:string):IDurationConverter => {
  let durationConverter:IDurationConverter = {months: 0, days: 0, years: 0};
  if(duration == 'quarterly') {
    durationConverter = {months: 3, days: 0, years: 0};
  } else if(duration == 'half-yearly') {
    durationConverter = {months: 6, days: 0, years: 0};
  } else if(duration == 'yearly') {
    durationConverter = {months: 0, days: 0, years: 1};
  }
  return durationConverter;
}
