import React from "react";
import {View, Text, TouchableOpacity} from 'react-native';
import styles from "./style";
import HomeIcon from '../../images/icons/home.svg';
import ProfileIcon from '../../images/icons/user.svg';
import ZoomIcon from '../../images/icons/zoom.svg';
import MessageIcon from '../../images/icons/message.svg';
import MenuIcon from '../../images/icons/menu.svg';
import ActiveTabBackground from '../../images/icons/active-tab-background.svg';

const TabBar = ({state, descriptors, navigation}: any) => {

    const tabIcon = (options: any) => {
        const {title} = options || {};
        switch (title) {
            case 'Home':
                return <HomeIcon width={20} height={20} color="#000000" />
            case 'Profile':
                return <ProfileIcon width={20} height={20} color="#000000" />
            case 'Zoom':
                return <ZoomIcon width={20} height={20} color="#000000" />
            case 'Message':
                return <MessageIcon width={20} height={20} color="#000000" />
            case 'Menu':
                return <MenuIcon width={20} height={20} color="#000000" />
            default:
                return <HomeIcon width={20} height={20} color="#000000" />
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
                    >
                        <View style={styles.tab} >
                            {isFocused ? <ActiveTabBackground width={50} height={50} /> : <View style={{width: 50, height: 50}} />}
                            <View style={{position: 'absolute', top: 5, bottom: 5, alignItems: 'center', justifyContent: 'center'}}>
                                {tabIcon(options)}
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