import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './style';
import {Shadow} from 'react-native-shadow-2';

const ClientInfoView = () => {
  return (
    <Shadow style={styles.cardWrapper} distance={6}>
      <View style={styles.clientInfoContainer}>
        <View style={styles.clientLogoContainer}>
          <Image
            source={{
              uri: 'https://fastly.picsum.photos/id/14/200/200.jpg?hmac=bwQwH7-0RPCqUVkFzd3hFhc6yDfC6_e7vgaKXZ7vFOA',
            }}
            style={styles.logo}
          />
        </View>
        <View style={styles.clientDetailContainer}>
          <Text style={styles.nameText}>Dream Packers and Movers</Text>
          <Text style={styles.idText}>Cust. ID: akldsfhaksfhkja234y23</Text>
        </View>
      </View>
    </Shadow>
  );
};

export default ClientInfoView;
