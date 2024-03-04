import { useAppSelector } from "../redux/hooks";

const useSerialNoHook = () => {
    let sNo:number = 0;
    const {serialNo} = useAppSelector(state => state.SNSetting);
    console.log('serialNo-----', serialNo);
    const {data} = serialNo || {};
    if(data) {
        sNo = data;
    }
    return sNo;
}

export default useSerialNoHook;