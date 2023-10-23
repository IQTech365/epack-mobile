import React, { ReactElement, useCallback } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import style from './style';
import DownArrowIcon from '../../images/icons/down-arrow.svg';
import UpArrowIcon from '../../images/icons/up-arrow.svg';
import CreateIcon from '../../images/icons/create_icon2.svg';
import Spacer from '../Spacer';


interface IContactDetailsVProps {
  children: ReactElement;
  title: string;
  collapsed: boolean;
  isEdit?: boolean;
  onEditPress?: () => void;
}

const CollapsibleView: React.FC<IContactDetailsVProps> = ({children, title, collapsed = false, isEdit = false, onEditPress}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);
  
  const bottomPaddingStyle = isCollapsed ? {paddingBottom: 0} : {paddingBottom: 15};
  const headerStyle = isCollapsed ? {borderBottomStartRadius: 5, borderBottomEndRadius: 5,} : {borderBottomStartRadius: 0, borderBottomEndRadius: 0,};
  return (
    <View style={[style.container, bottomPaddingStyle]}>
      <TouchableOpacity onPress={toggleCollapse}>
        <View style={[style.header, headerStyle]}>
          <View style={style.labelActionContainer}>
            <Text style={style.headerText}>{title}</Text>
            <Spacer width={10} />
            {isEdit ? <TouchableOpacity onPress={onEditPress}>
              <CreateIcon width={30} height={30} />
            </TouchableOpacity> : null}
          </View>
          {isCollapsed ? <DownArrowIcon width={22} height={22} /> : <UpArrowIcon width={22} height={22} />}
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        {children}
      </Collapsible>
    </View>
  );
};

export default CollapsibleView;
