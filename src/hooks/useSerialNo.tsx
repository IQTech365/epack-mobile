import { useAppSelector } from "../redux/hooks";

const useSerialNoHook = () => {
    let sNo:number = 0;
    const {serialNo} = useAppSelector(state => state.SNSetting);
    const {data} = serialNo || {};
    if(data) {
        sNo = data;
    }
    console.log('serial-no--', sNo);
    return sNo;
}

export default useSerialNoHook;