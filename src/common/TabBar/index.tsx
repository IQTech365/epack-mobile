import React from "react";
import {View, Text, TouchableOpacity} from 'react-native';
import styles from "./style";
import ProfileIcon from '../../images/icons/user.svg';
import ZoomIcon from '../../images/icons/zoom.svg';
import MessageIcon from '../../images/icons/message.svg';
import MenuIcon from '../../images/icons/menu.svg';
import ActiveTabBackground from '../../images/icons/active-tab-background.svg';
import DashboardWhiteIcon from '../../images/icons/dashboard-white.svg';
import DashboardBlackIcon from '../../images/icons/dashboard-black.svg';
import QuotationBlackIcon from '../../images/icons/quotation-black.svg';
import QuotationWhiteIcon from '../../images/icons/quotation-white.svg';
import EnquiryBlackIcon from '../../images/icons/quotation-black.svg';
import EnquiryWhiteIcon from '../../images/icons/quotation-white.svg';
import OrderBlackIcon from '../../images/icons/order-black.svg';
import OrderWhiteIcon from '../../images/icons/order-white.svg';

const TabBar = ({state, descriptors, navigation}: any) => {

    const tabIcon = (options: any, isFocused: boolean) => {
        const {title} = options || {};
        switch (title) {
            case 'Home':
                return isFocused ? <DashboardBlackIcon width={24} height={24} /> : <DashboardWhiteIcon width={24} height={24} />
            case 'Quotation':
                return isFocused ? <QuotationBlackIcon width={24} height={24} /> : <QuotationWhiteIcon width={24} height={24} />
            case 'Enquiry':
                return <ZoomIcon width={20} height={20} color="#000000" />
            case 'Order':
                return isFocused ? <OrderBlackIcon width={24} height={24} /> : <OrderWhiteIcon width={24} height={24} />
            case 'Profile':
                return <ProfileIcon width={20} height={20} color="#000000" />
            default:
                return null
        }
    }

    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route:any, index: number) => {
                const {options} = descriptors[route.key];
                const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({ name: route.name, merge: true });
                    }
                }

                return (
                    <TouchableOpacity accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        key={`${index}`}
                    >
                        <View style={styles.tab} >
                            {/* {isFocused ? <ActiveTabBackground width={50} height={50} /> : <View style={{width: 50, height: 50}} />} */}
                            <View style={{width: 50, height: 50}} />
                            <View style={{position: 'absolute', top: 5, bottom: 5, alignItems: 'center', justifyContent: 'center'}}>
                                {tabIcon(options, isFocused)}
                                <Text style={styles.text} >
                                    {label}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default TabBar;