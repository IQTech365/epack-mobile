import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../common/Spacer';
import Input from '../../../common/Input';
import Button from '../../../common/Button';

interface ICompanyLogoPageView {
  //
}

const SerialNoSettingPageView: React.FC<ICompanyLogoPageView> = ({}) => {
  return (
    <View style={styles.container}>
      <AvoidSoftInputViewHOC>
        <>
          <Spacer />
          <Text style={styles.titleText}>
            Set serial No. for the documents.
          </Text>
          <Spacer />
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Quotation Serial No.</Text>
          </View>
          <Spacer />
          <View style={styles.rowContainer}>
            <View style={styles.elementContainer}>
              <Input
                onChangeText={() => {}}
                containerStyle={styles.inputStyle}
                placeholder="e.g. #123"
              />
            </View>
            <View style={styles.elementContainer}>
              <Button
                text="Save"
                onPress={() => {}}
                style={styles.buttonStyle}
              />
            </View>
          </View>
          <Spacer />
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Quotation Serial No.</Text>
          </View>
          <Spacer />
          <View style={styles.rowContainer}>
            <View style={styles.elementContainer}>
              <Input
                onChangeText={() => {}}
                containerStyle={styles.inputStyle}
                placeholder="e.g. #123"
              />
            </View>
            <View style={styles.elementContainer}>
              <Button
                text="Save"
                onPress={() => {}}
                style={styles.buttonStyle}
              />
            </View>
          </View>
          <Spacer />
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Quotation Serial No.</Text>
          </View>
          <Spacer />
          <View style={styles.rowContainer}>
            <View style={styles.elementContainer}>
              <Input
                onChangeText={() => {}}
                containerStyle={styles.inputStyle}
                placeholder="e.g. #123"
              />
            </View>
            <View style={styles.elementContainer}>
              <Button
                text="Save"
                onPress={() => {}}
                style={styles.buttonStyle}
              />
            </View>
          </View>
          <Spacer />
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Quotation Serial No.</Text>
          </View>
          <Spacer />
          <View style={styles.rowContainer}>
            <View style={styles.elementContainer}>
              <Input
                onChangeText={() => {}}
                containerStyle={styles.inputStyle}
                placeholder="e.g. #123"
              />
            </View>
            <View style={styles.elementContainer}>
              <Button
                text="Save"
                onPress={() => {}}
                style={styles.buttonStyle}
              />
            </View>
          </View>
        </>
      </AvoidSoftInputViewHOC>
    </View>
  );
};

export default SerialNoSettingPageView;
