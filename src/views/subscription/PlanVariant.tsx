import React, {FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {IPlan} from '../../interface/subscription/subscription';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR_WHITE} from '../../utils/colors';
import Spacer from '../../common/Spacer';
import _ from 'underscore';

interface IProps {
  variant: IPlan;
}

const PlanVariant: FC<IProps> = ({variant}) => {
  const formatText = (text: string) => {
    let name: string = '';
    if (text) {
      name = text.charAt(0).toUpperCase() + text.slice(1);
    }
    return name;
  };

  const _handlePlanPurchase = () => {
    //
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={_handlePlanPurchase}>
      <LinearGradient
        colors={['#051937', '#004d7a', '#008793']}
        style={styles.gradientContainer}
        useAngle={true}
        angle={45}>
        <View style={styles.currentPlanContainer}>
          <Text style={styles.planNameText}>
            {formatText(variant.duration)}
          </Text>
          <Text style={styles.planNameText}>{`₹ ${variant.amount}/-`}</Text>
          <Spacer height={10} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PlanVariant;

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginTop: 20,
  },
  gradientContainer: {
    width: width * 0.9,
    flexWrap: 'wrap',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  currentPlanContainer: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 5,
  },
  planNameText: {
    color: COLOR_WHITE,
    fontSize: 22,
    fontFamily: 'WorkSans-Bold',
  },
});
