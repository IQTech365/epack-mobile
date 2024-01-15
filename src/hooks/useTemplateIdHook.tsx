import { ISavedDocumentTemplateId } from "../interface/setting/template/template";
import { useAppSelector } from "../redux/hooks";
import { getTemplateIdBySubModuleId } from "../utils/utility";

const useTemplateIdHook = (submoduleId:string) => {
    let templateId:string = "";
    const {savedDocumentTemplateIds} = useAppSelector(state => state.Template);

    const _getSavedTemplateIdList = () => {
        let list:ISavedDocumentTemplateId[] = [];
        const {data} = savedDocumentTemplateIds || {};
        if(data && Array.isArray(data) && data.length > 0) {
          list = data
        }
        return list;
    }
    templateId = getTemplateIdBySubModuleId(submoduleId, _getSavedTemplateIdList());
    return templateId;
}

export default useTemplateIdHook;