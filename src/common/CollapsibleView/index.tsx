import React, { ReactElement, useCallback } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import style from './style';
import DownArrowIcon from '../../images/icons/down-arrow.svg';
import UpArrowIcon from '../../images/icons/up-arrow.svg';


interface IContactDetailsVProps {
  children: ReactElement;
  title: string;
  collapsed: boolean;
}

const CollapsibleView: React.FC<IContactDetailsVProps> = ({children, title, collapsed = false}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);
  
  const bottomPaddingStyle = isCollapsed ? {paddingBottom: 0} : {paddingBottom: 15};
  const headerStyle = isCollapsed ? {borderBottomStartRadius: 5, borderBottomEndRadius: 5,} : {borderBottomStartRadius: 0, borderBottomEndRadius: 0,};
  return (
    <View style={[style.container, bottomPaddingStyle]}>
      <View style={[style.header, headerStyle]}>
        <Text style={style.headerText}>{title}</Text>
        <TouchableOpacity onPress={toggleCollapse}>
        {isCollapsed ? <DownArrowIcon width={22} height={22} /> : <UpArrowIcon width={22} height={22} />}
        </TouchableOpacity>
      </View>
      <Collapsible collapsed={isCollapsed}>
        {children}
      </Collapsible>
    </View>
  );
};

export default CollapsibleView;
