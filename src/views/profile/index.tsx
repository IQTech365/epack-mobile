import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import {View, Text} from 'react-native';
import Button from "../../common/Button";
import Header from "../../common/Header";
import Spacer from "../../common/Spacer";
import { ClientStackRoute } from "../../utils/constants";
import styles from "./style";

interface IProfilePageViewProps {
    navigation: NavigationProp<any, any>;
}

const ProfilePageView:React.FC<IProfilePageViewProps> = ({navigation}) => {
    const { t, i18n } = useTranslation();
    const handleLanguage = () => {
        navigation.navigate(ClientStackRoute.Language);
    }

    return <View style={styles.container}>
        <Header label="My Profile" canGoBack={true}/>
        <Spacer height={4} />
        <Button text="Language" onPress={handleLanguage} />
        <Text>{t('common:Hey')}</Text>
    </View>
}

export default ProfilePageView;