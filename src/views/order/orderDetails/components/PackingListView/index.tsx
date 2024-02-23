import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import Spinner from '../../../../../common/Spinner';
import PackingFormView from './PackingFormView';
import PackingListView from './PackingListView';
import {getPackingTypesRequest} from '../../../../../redux/slices/CommonSlice';
import ActionHeaderView from '../../../../../common/ActionHeaderView';
interface IPackingListViewProps {
  orderId: string;
}

const PackingView: React.FC<IPackingListViewProps> = ({orderId}) => {
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(true);
  const {packingTypesRequesting} = useAppSelector(state => state.Common);

  useEffect(() => {
    dispatch(getPackingTypesRequest());
  }, []);

  const handleShowForm = () => {
    setShowList(false);
    setShowForm(true);
  };

  const handleShowList = () => {
    setShowList(true);
    setShowForm(false);
  };

  const onSuccess = () => {
    setShowList(true);
    setShowForm(false);
    dispatch(getPackingTypesRequest());
  }

  const _showForm = () => {
    if (showList) return null;
    return <PackingFormView orderId={orderId} onSuccess={onSuccess} />;
  };

  const _showList = () => {
    if (showForm) return null;
    return <PackingListView orderId={orderId} />;
  };

  return (
    <View style={{flex: 1}}>
      <ActionHeaderView
        count={0}
        onShow={handleShowList}
        onCreate={handleShowForm}
      />
      {_showList()}
      {_showForm()}
      <Spinner show={packingTypesRequesting} />
    </View>
  );
};
export default PackingView;
