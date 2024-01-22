import { useAppSelector } from "../redux/hooks";

const useAuthId = () => {
    const {otpData} = useAppSelector(state => state.OTP);
    const {data} = otpData || {};
    const {_id} = data || {};
    console.log('authId--', _id);
    return _id;
}

export default useAuthId;