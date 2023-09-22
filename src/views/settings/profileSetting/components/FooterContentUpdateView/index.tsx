/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../../common/Spacer';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Input from '../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from './style';
import footerContentOptions from '../../../../../data/footerContentOptions.json';
import applicableForOptions from '../../../../../data/applicableForOptions.json';
import Button from '../../../../../common/Button';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

interface IContentUpdateProps {}

//@ts-ignore
const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>;

const FooterContentUpdateView: React.FC<IContentUpdateProps> = ({}) => {
  const richText = React.useRef();
  const handleAccountType = () => {
    console.log('account type');
  };

  return (
    <AvoidSoftInputViewHOC>
      <View>
        <View style={styles.textContainer2}>
          <Label text="Choose Content Type" style={styles.label} />
          <DropdownComponent
            data={footerContentOptions}
            onSelect={handleAccountType}
          />
        </View>
        <View style={styles.textContainer2}>
          <Label text="Add Title" style={styles.label} />
          <Input
            onChangeText={() => {}}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={12} />
        <View style={styles.toolbarContentContainer}>
          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.heading1,
            ]}
            iconMap={{[actions.heading1]: handleHead}}
          />
        </View>

        <ScrollView contentContainerStyle={styles.editorContentContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <Text>Write here:</Text>
            <RichEditor
            //@ts-ignore
              ref={richText}
              onChange={descriptionText => {
                console.log('descriptionText:', descriptionText);
              }}
            />
          </KeyboardAvoidingView>
        </ScrollView>

        <Spacer height={12} />
        <View style={styles.textContainer2}>
          <Label text="Applicable For" style={styles.label} />
        </View>
        <View style={styles.applicableWrapper}>
          {applicableForOptions.map((item, index) => {
            return (
              <View style={styles.checkboxItem}>
                <BouncyCheckbox
                  size={25}
                  fillColor={COLOR_BLUE}
                  unfillColor="#FFFFFF"
                  text={item.template}
                  iconStyle={{
                    borderColor: 'red',
                    borderRadius: 0,
                    width: 18,
                    height: 18,
                  }}
                  innerIconStyle={{
                    borderWidth: 1,
                    borderRadius: 0,
                    width: 18,
                    height: 18,
                  }}
                  textStyle={{
                    fontFamily: 'JosefinSans-Regular',
                    textDecorationLine: 'none',
                  }}
                  style={{marginRight: 15}}
                  textContainerStyle={{paddingLeft: 0}}
                  onPress={(isChecked: boolean) => {
                    //   setFixedFreight(isChecked);
                    //   handleFixedFreightTemplate(isChecked);
                  }}
                  isChecked={false}
                />
              </View>
            );
          })}
        </View>
        <Spacer height={12} />
        <Button
          text="SAVE"
          onPress={() => {
            console.log('submitted data');
          }}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default FooterContentUpdateView;
