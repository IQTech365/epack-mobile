import { useAppSelector } from "../redux/hooks";

const useAuthId = () => {
    const {otpData} = useAppSelector(state => state.OTP);
    const {data} = otpData || {};
    const {id} = data || {};
    console.log('authId--', id);
    return id;
}

export default useAuthId;