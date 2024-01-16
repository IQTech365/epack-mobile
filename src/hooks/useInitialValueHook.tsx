import { IAppSetting } from "../interface/common/common";
import { useAppSelector } from "../redux/hooks";
import { getSubmoduleInitialValue } from "../utils/utility";

const useInitialValueHook = (submoduleId:string) => {
    let initialValue:string = "";
    const {appSettings} = useAppSelector(state => state.Common);

    const _getAppSettingList = () => {
        let list:IAppSetting[] = [];
        const {data} = appSettings || {};
        if(data && Array.isArray(data) && data.length > 0) {
          list = data
        }
        return list;
    }
    initialValue = getSubmoduleInitialValue(submoduleId, _getAppSettingList());
    console.log('initialValue----', initialValue);
    return initialValue;
}

export default useInitialValueHook;