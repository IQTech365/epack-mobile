import React, {useEffect, useState} from 'react';
import {View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar, Route} from 'react-native-tab-view';
import styles from './style';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import Spinner from '../../../common/Spinner';
import Header from '../../../common/Header';
import {getTemplateListRequest} from '../../../redux/slices/TemplateSettingSlice';
import {ISubmodule} from '../../../interface/common/common';
import {getSubmoduleRequest} from '../../../redux/slices/CommonSlice';
import TemplatePageView from './components/TemplatePageView';
import {COLOR_GRAY} from '../../../utils/colors';

interface IProps {}

const TemplateSettingPageView: React.FC<IProps> = ({}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState<Route[]>([]);
  const [showView, setShowView] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {getTemplatesRequesting, getTemplatesSuccess, getTemplatesFailure} =
    useAppSelector(state => state.Template);
  const {
    getSubmodulesRequesting,
    submodules,
    getSubmodulesSuccess,
    getSubmoduleFailure,
  } = useAppSelector(state => state.Common);

  const _getSubmodules = (): ISubmodule[] => {
    let items: ISubmodule[] = [];
    const {data} = submodules || {};
    if (data && Array.isArray(data) && data.length > 0) {
      items = data;
    }
    return items.filter((d:ISubmodule) => d.availableOnDocument);
  };

  const _getRoutes = (): Route[] => {
    let tabs: Route[] = [];
    const modules: ISubmodule[] = _getSubmodules();
    if (modules && modules.length > 0) {
      tabs = _getSubmodules().map((d: ISubmodule, i: number) => {
        const item = {
          key: `${i}`,
          title: d.subModuleName.toUpperCase(),
          data: d,
        };
        return item;
      });
    }
    return tabs;
  };

  const _setRoutes = () => {
    setRoutes(_getRoutes());
  };

  const _renderScene = () => {
    const scenes: any = {};
    _getSubmodules().forEach((_, i) => {
      scenes[`${i}`] = TemplatePageView;
    });
    return SceneMap({...scenes});
  };

  useEffect(() => {
    dispatch(getSubmoduleRequest());
    dispatch(getTemplateListRequest());
  }, []);

  useEffect(() => {
    if (
      !getSubmodulesRequesting &&
      getSubmodulesSuccess &&
      !getTemplatesRequesting &&
      getTemplatesSuccess
    ) {
      _setRoutes();
      setShowView(true);
    }
  }, [
    getSubmodulesRequesting,
    getSubmodulesSuccess,
    getSubmoduleFailure,
    getTemplatesRequesting,
    getTemplatesSuccess,
    getTemplatesFailure,
  ]);

  useEffect(() => {
    return () => {
      setShowView(false);
    };
  }, []);

  if (getSubmodulesRequesting && getTemplatesRequesting && !showView) {
    return <Spinner show={!showView} />;
  }

  return (
    <>
      <View style={styles.container}>
        <Header label="Template Setting" canGoBack={true} />
        <View style={styles.contentContainer}>
          <TabView
            navigationState={{index, routes}}
            renderScene={_renderScene()}
            onIndexChange={(indx: number) => {
              setIndex(indx);
            }}
            initialLayout={{width: layout.width}}
            overScrollMode="always"
            renderTabBar={props => (
              <TabBar
                {...props}
                scrollEnabled={true}
                style={{height: 52}}
                labelStyle={{fontFamily: 'WorkSans-SemiBold'}}
                indicatorStyle={{backgroundColor: COLOR_GRAY, height: 4}}
              />
            )}
          />
        </View>
      </View>
      <Spinner show={getTemplatesRequesting} />
    </>
  );
};

export default TemplateSettingPageView;
