import React from "react";
import {View, Text} from 'react-native';
import Header from "../../common/Header";
import styles from "./style";

interface IProfilePageViewProps {

}

const ProfilePageView:React.FC<IProfilePageViewProps> = ({}) => {

    return <View style={styles.container}>
        <Header label="Profile Management" />
    </View>
}

export default ProfilePageView;