import React, {FC, useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';

import ListIcon from '../../images/icons/list_view_icon.svg';
import ListIcon2 from '../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../images/icons/plus_icon.svg';
import CreateIcon2 from '../../images/icons/create_icon2.svg';
import Spacer from '../Spacer';
import {Shadow} from 'react-native-shadow-2';

interface IProps {
  onShow: () => void;
  onCreate: () => void;
  count: number;
}

const ActionHeaderView: FC<IProps> = ({onShow, onCreate, count = 0}) => {
  const [isList, setIsList] = useState<boolean>(count > 0);
  const [isForm, setIsForm] = useState<boolean>(count == 0);

  const _handleOnShow = () => {
    setIsForm(false);
    setIsList(true);
    onShow && onShow();
  };

  const _handleOnCreate = () => {
    setIsForm(true);
    setIsList(false);
    onCreate && onCreate();
  };

  useEffect(() => {
    if (count > 0) {
      setIsForm(false);
      setIsList(true);
      onShow && onShow();
    } else {
      setIsForm(true);
      setIsList(false);
      onCreate && onCreate();
    }
  }, []);

  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={_handleOnShow} activeOpacity={0.4}>
          {isList ? (
            <ListIcon2 width={32} height={32} />
          ) : (
            <ListIcon width={32} height={32} />
          )}
        </TouchableOpacity>
        <Spacer width={20} />
        <TouchableOpacity onPress={_handleOnCreate} activeOpacity={0.4}>
          {isForm ? (
            <CreateIcon2 width={34} height={34} />
          ) : (
            <CreateIcon width={34} height={34} />
          )}
        </TouchableOpacity>
      </View>
  );
};

export default ActionHeaderView;
