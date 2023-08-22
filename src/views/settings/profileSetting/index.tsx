/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import Header from '../../../common/Header';
import Spacer from '../../../common/Spacer';
import styles from './style';
import profileSettingsTabOptions from '../../../data/profileSettingsTabOptions.json';
import Tab from '../../../common/Tab';
import AccountDetailUpdateView from './components/AccountDetailUpdateView';
import FooterContentUpdateView from './components/FooterContentUpdateView';
import DocumentUpdateView from './components/DocumentUpdateView';
import SignatureUpdateView from './components/SignatureUpdateView';
import ContactDetailUpdateView from './components/contactDetailUpdateView';

const PackersProfileSetting = props => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

    const handleTabChange = (index: number) => {
        setActiveTabIndex(index);
    };

    const showTabItem = () => {
        switch (activeTabIndex) {
            case 0:
                return <AccountDetailUpdateView />
            case 1:
                return <FooterContentUpdateView />
            case 2:
                return <DocumentUpdateView />
            case 3:
                return <SignatureUpdateView />
            case 4:
                return <ContactDetailUpdateView />
            default:
                return null;
        }
    };

    return (

        <View style={styles.container}>
            <Header canGoBack={true} label="Packers Profile Setting" />
            <Spacer height={4} />

            <View style={styles.tabsContainer}>
                <FlatList
                    style={{ paddingHorizontal: 8 }}
                    data={profileSettingsTabOptions}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <Tab
                            label={item.label}
                            index={index}
                            onPress={handleTabChange}
                            activeIndex={activeTabIndex}
                        />
                    )}
                />
            </View>
            <Spacer height={10} />
            {showTabItem()}
        </View>

    );
};

export default PackersProfileSetting;
