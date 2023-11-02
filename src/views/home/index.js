import React from "react";
import { View, Text, FlatList } from 'react-native';
import { ProgressCircle, PieChart } from 'react-native-svg-charts';
import Carousel from 'react-native-snap-carousel'
import LinearGradient from 'react-native-linear-gradient';
import Header from "../../common/Header";
import { COLOR_BLUE, INTRO_BG_LINEARGRADIENT } from "../../utils/colors";
import AvoidSoftInputViewHOC from "../../common/AvoidSoftInputViewHOC";
import Dashboard1 from '../../images/icons/dashboard1.svg'
import styles from "./style";
import Spacer from "../../common/Spacer";
import sliderData from "./sliderData";
import CarouselCardItem, { ITEM_WIDTH, SLIDER_WIDTH } from "./caroselCard";
const spinner = require('../../images/loader.json');

const HomePageView = (props) => {
    const getPieChartDataSteps = () => {
        const keys = ['google', 'facebook', 'linkedin', 'youtube', 'Twitter']
        const values = [55, 20, 35, 45, 52]
        const colors = ['#FFEA00', '#FF5D78', '#3D5AFE', '#1DE9B6', '#AC92F9']
        return values.map((key, index) => {
            return {
                key,
                value: values[index],
                svg: { fill: colors[index], stroke: colors[index - 1], strokeWidth: 2 },
                arc: { outerRadius: 60 + values[index] + '%', padAngle: 0.0 },
            }
        })
    }
    const pieChartDataSteps = getPieChartDataSteps();

    const isCarousel = React.useRef(null)

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
                                <Text numberOfLines={2} style={styles.subTextStyle} >New Enquiry</Text>
                            </View>
                        )}
                        numColumns={3}
                    />
                    <Spacer height={8} />
                    <Carousel
                        layout='default'
                        layoutCardOffset={9}
                        ref={isCarousel}
                        data={sliderData}
                        renderItem={CarouselCardItem}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        inactiveSlideShift={0}
                        useScrollView={true}
                    />
                    <Spacer height={8} />
                    <View style={styles.pieChartUI}>
                        <PieChart
                            style={{ width: 300, height: 300 }}
                            outerRadius={'70%'}
                            innerRadius={70}
                            data={pieChartDataSteps}
                        />
                    </View>



                </LinearGradient>
            </AvoidSoftInputViewHOC>
        </>

    );
}

export default HomePageView;