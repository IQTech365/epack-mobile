import { IAppSetting } from "../interface/common/common";
import { useAppSelector } from "../redux/hooks";
import { getSubmoduleInitialValue } from "../utils/utility";

const useInitialValueHook = (submoduleId:string) => {
    let initialValue:string = "";
    let prefix:string = "";
    const {appSettings} = useAppSelector(state => state.Common);

    const _getAppSettingList = () => {
        let list:IAppSetting[] = [];
        const {data} = appSettings || {};
        if(data && Array.isArray(data) && data.length > 0) {
          list = data
        }
        return list;
    }
    const {initialValue:iniital, prefix:pfx} = getSubmoduleInitialValue(submoduleId, _getAppSettingList());
    initialValue = iniital;
    prefix = pfx;
    console.log('prefix, initialValue----', prefix, initialValue);
    return {initialValue, prefix};
}

export default useInitialValueHook;