import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import styles from './style';
import HeaderGridBackgroundImage from '../../../../../images/header-grid.png';
import PhoneIcon from '../../../../../images/icons/phone.svg';
import WhatsappIcon from '../../../../../images/icons/whatsapp.svg';
import Spacer from '../../../../../common/Spacer';

interface IClientInfoViewProps {}

const ClientInfoView: React.FC<IClientInfoViewProps> = ({}) => {
  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground
        imageStyle={styles.container}
        source={HeaderGridBackgroundImage}>
        <View style={styles.innerContainer}>
          <View style={styles.leftContainer}>
            <View style={styles.infoContainer}>
              <View style={[styles.itemContainer]}>
                <Text style={styles.nameText}>Ms. Vanshika Vats</Text>
              </View>
              <View style={[styles.itemContainer]}>
                <Text style={styles.normalText}>Delhi</Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.itemContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>Customer ID</Text>
                </View>
                <View style={styles.hyphenContainer}>
                  <Text style={styles.hyphenText}>-</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>65678</Text>
                </View>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.itemContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>Regd. Date</Text>
                </View>
                <View style={styles.hyphenContainer}>
                  <Text style={styles.hyphenText}>-</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>27-07-2023</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.iconItemContainer}>
            <TouchableOpacity activeOpacity={0.6}>
              <WhatsappIcon width={24} height={24} />
            </TouchableOpacity>
            <Spacer height={20} />
            <TouchableOpacity activeOpacity={0.6}>
              <PhoneIcon width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ClientInfoView;
