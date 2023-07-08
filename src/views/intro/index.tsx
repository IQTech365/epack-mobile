import React from "react";
import {View, Text, Image} from 'react-native';
import styles from "./styles";
import LinearGradient from 'react-native-linear-gradient';
import { INTRO_BG_LINEARGRADIENT } from "../../utils/colors";
import Spacer from "../../common/Spacer";
import Button from "../../common/Button";
import { AuthStackRoute } from "../../utils/constants";
const IntroBanner = require('../../images/icons/intro-banner.png');

const IntroPageView = (props:any) => {
    const {navigation} = props || {};
    const onLetsStartPress = () => {
        navigation.navigate(AuthStackRoute.SignIn);
    }

    return (
        <LinearGradient colors={INTRO_BG_LINEARGRADIENT} style={styles.container}>
            <View style={styles.bannerContainer}>
            <Image source={IntroBanner} style={styles.banner} />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>RAKESH YADAV</Text>
                    <Text style={styles.taglineText}>Best Motivational Speaker</Text>
                </View>
                <View style={styles.academyInfoContainer}>
                    <Text style={styles.welcomeText}>Welcome To</Text>
                    <Text style={styles.academyText}>NEW RK SUCCESS ACADEMY</Text>
                    <Text style={styles.founderText}>Founder & CEO <Text style={styles.ceoText}>Rakesh Yadav</Text></Text>
                </View>
                <Spacer height={25} />
                <View style={styles.quoteContainer}>
                    <Text style={styles.quoteText}>{`"If you want to lift yourself up,\n Lift up someone else."`}</Text>
                </View>
                <Spacer height={25} />
                <Button text="Let's Start" onPress={onLetsStartPress} variant="contain" />
            </View>
        </LinearGradient>
    );
}

export default IntroPageView;