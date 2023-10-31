import React from "react";
import { View, Text, FlatList } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts'
import LinearGradient from 'react-native-linear-gradient';
import Header from "../../common/Header";
import { COLOR_BLUE, INTRO_BG_LINEARGRADIENT } from "../../utils/colors";
import AvoidSoftInputViewHOC from "../../common/AvoidSoftInputViewHOC";
import Dashboard1 from '../../images/icons/dashboard1.svg'
import styles from "./style";
import Spacer from "../../common/Spacer";
const spinner = require('../../images/loader.json');

const HomePageView = (props) => {

    return (

        <>
            <Header canGoBack={true} showDrawerIcon={true} label="Home" />

            <AvoidSoftInputViewHOC>
                <LinearGradient colors={INTRO_BG_LINEARGRADIENT} style={styles.container}>
                    <View style={styles.cardContainer}>
                        <Dashboard1 width={40} height={40} />
                        <View>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Good Neighbor Packers and movers</Text>
                            <Text style={{ fontSize: 10 }}>Cust Id : epb0013</Text>
                        </View>
                    </View>
                    <Spacer height={8} />
                    <FlatList
                        style={{}}
                        data={['1', '2', '3', '4', '5', '6']}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <View style={styles.cardcircularBarContainer}>
                                <ProgressCircle
                                    style={{ height: 100, width: 80 }}
                                    progress={0.7}
                                    progressColor={COLOR_BLUE}
                                    startAngle={-Math.PI * 0.8}
                                    endAngle={Math.PI * 0.8}
                               />
                               <Text style={styles.textStyle}>2</Text>
                               <Text numberOfLines ={2} style={styles.subTextStyle} >New Enquiry</Text>
                            </View>
                        )}
                        numColumns={3}
                    />

                </LinearGradient>
            </AvoidSoftInputViewHOC>
        </>

    );
}

export default HomePageView;