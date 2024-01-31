import { useAppSelector } from "../redux/hooks";

const useAuthId = () => {
    const {otpData} = useAppSelector(state => state.OTP);
    const {data} = otpData || {};
    const {_id} = data || {};
    return _id;
}

export default useAuthId;