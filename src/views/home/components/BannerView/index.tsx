import React, {useEffect} from 'react';
import {View, Dimensions, Image} from 'react-native';
import styles from './style';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {getBannersRequest} from '../../../../redux/slices/CommonSlice';
import Spinner from '../../../../common/Spinner';
import {IBanner} from '../../../../interface/common/common';
import Carousel from 'react-native-reanimated-carousel';
const {width} = Dimensions.get('window');
import noBannerPerviewImage from '../../../..//images/no_preview_thumbnail.png';

const BannerView: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const {getBannersRequesting, banners} = useAppSelector(state => state.Common);

  const _getBanners = () => {
    let list: IBanner[] = [];
    const {data} = banners || {};
    if (data && Array.isArray(data) && data.length > 0) {
      list = data;
    }
    return list.filter(e => e.isActive);
  };

  useEffect(() => {
    dispatch(getBannersRequest());
  }, []);

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width * 0.92}
        autoPlay={true}
        data={_getBanners()}
        style={styles.carousel}
        scrollAnimationDuration={1500}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        renderItem={({item, index}) => {
          const imageUri = item.bannerImage ? {uri: item.bannerImage} : noBannerPerviewImage;
          return (
            <Image
              source={imageUri}
              style={styles.banner}
              key={`${index}`}
            />
          );
        }}
      />
      <Spinner show={getBannersRequesting} />
    </View>
  );
};

export default BannerView;
