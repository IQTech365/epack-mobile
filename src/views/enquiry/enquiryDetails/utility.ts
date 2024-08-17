export type TSurveyMaterial = {
  _id: string;
  surveyCategoryName: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: number;
};

export type TSurveyMaterialCategory = {
  _id: string;
  surveyCategoryId: string;
  surveyMaterialItem: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: number;
};

export type TSurveyItemListGroup = {
    groupId: string;
    groupName:string;
    items: TSurveyMaterialCategory[];
}

export const prepareSurveyItemFormList = (parentList: TSurveyMaterial[] = [], childList: TSurveyMaterialCategory[] = []):TSurveyItemListGroup[] => {
    let list:TSurveyItemListGroup[] = [];
    if(parentList.length > 0) {
        list = parentList.map((it:TSurveyMaterial) => {
            const items:TSurveyMaterialCategory[] = childList.filter((cit:TSurveyMaterialCategory) => it._id === cit.surveyCategoryId);
            const group:TSurveyItemListGroup = {
                groupId: it._id,
                groupName: it.surveyCategoryName,
                items: items,
            }
            return group;
        })
    }
    return list;
};
