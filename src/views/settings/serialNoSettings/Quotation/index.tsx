import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import styles from './style';
import SerilaNoSettingFormView from '../SerialNoSettingFormView';
import ListViewIcon from '../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../images/icons/create_icon2.svg';
import Spacer from '../../../../common/Spacer';

interface IQuotationSNProps {
  moduleId: string;
  moduleName: string;
}

const QuotationSN: React.FC<IQuotationSNProps> = ({moduleId,moduleName}) => {
  const [showList, setShowList] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer2}>
        <Text>No Quotations Serial No.# Found!</Text>
      </View>
    );
  };

  const handleShowForm = () => {
    setShowList(false);
    setShowForm(true);
  };

  const handleShowList = () => {
    setShowList(true);
    setShowForm(false);
  };

  const showFormView = () => {
    if (showForm) {
      return <SerilaNoSettingFormView  moduleId={moduleId} moduleName={moduleName} />;
    }
    return null;
  };

  const showListView = () => {
    if (showList) {
      return (
        <FlatList
          data={[]}
          renderItem={({item, index}) => <Text>Hello</Text>}
          ListEmptyComponent={showEmptyView()}
        />
      );
    }
    return null;
  };

  return <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={handleShowList} activeOpacity={0.4}>
          {showList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleShowForm} activeOpacity={0.4}>
          {showForm ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showFormView()}
      {showListView()}
  </View>;
};

export default QuotationSN;
