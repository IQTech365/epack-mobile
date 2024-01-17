import { useAppSelector } from "../redux/hooks";

const useSerialNoHook = () => {
    const {serialNo} = useAppSelector(state => state.SNSetting);
    const {data} = serialNo || {};
    console.log('serialNo--', data);
    return data;
}

export default useSerialNoHook;