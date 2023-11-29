import React, {useEffect, useState, useReducer} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import styles from './style';
import Spacer from '../../../../../common/Spacer';
import DropdownComponent from '../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import Label from '../../../../../common/Label';
import Button from '../../../../../common/Button';
import Input from '../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../utils/colors';
import {IAddPackingMaterialRequest} from '../../../../../interface/enquiry/IAddPackingMaterialRequest';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {
  addPackingMaterialRequest,
  resetPackingMaterialRequest,
} from '../../../../../redux/slices/EnquirySlice';
import {
  PACKING_MATERIAL_FORM_ACTION,
  initialState,
  packingMaterialReducer,
} from './packingMaterialReducer';
import Spinner from '../../../../../common/Spinner';
import {getUnitTypeRequest} from '../../../../../redux/slices/ProfileSettingSlice';
import EpackDropdown from '../../../../../common/DropdownComponent2';
import {getVehicleSizeRequest} from '../../../../../redux/slices/VehicleSlice';
import PlusIcon from '../../../../../images/icons/plus_icon.svg';
import MinusIcon from '../../../../../images/icons/minus_icon.svg';
import ModalHOC from '../../../../../common/ModalHOC';
import PackingMaterials from './PackingMaterials';

interface packingitems {
  name: string;
  quantity: string;
  type: string;
}
interface packingMaterialprop {
  enquiryId: string;
}

const PackingMaterialsView: React.FC<packingMaterialprop> = ({enquiryId}) => {
  const [state, dispatch] = useReducer(packingMaterialReducer, initialState);
  const [inputText, setInputText] = useState('');
  const [vehicleLoadSize, setVehicleLoadSize] = useState('');
  const [items, setItems] = useState<packingitems[]>([]);
  const [itemIndex, setItemIndex] = useState<number>(0);
  const [showList, setShowList] = useState<boolean>(false);
  const {
    addPackingMaterialsRequesting,
    addPackingMaterialsSuccess,
    addPackingMaterialsFailure,
  } = useAppSelector(state => state.Enquiry);
  const {unitType} = useAppSelector(state => state.Setting);
  const {vehicleSizeData} = useAppSelector(state => state.Vehicle);

  const {data: UnitypeData} = unitType || {};
  const {data: VehicleSize} = vehicleSizeData || {};

  const unityTypeArray = () => {
    let _data: any[] = [];
    if (UnitypeData && Array.isArray(UnitypeData) && UnitypeData.length > 0) {
      _data = UnitypeData.map((item: {unitType: any}) => item.unitType);
    }
    return _data;
  };

  const vehicleSizeArray = () => {
    let _data: any[] = [];
    if (VehicleSize && Array.isArray(VehicleSize) && VehicleSize.length > 0) {
      _data = VehicleSize.map((item: any) => ({
        value: item._id,
        label: item.vehicleSize,
      }));
    }
    return _data;
  };

  const dispatch2 = useAppDispatch();
  /** Effects */
  useEffect(() => {
    dispatch2(getUnitTypeRequest());
    dispatch2(getVehicleSizeRequest());
    if (!addPackingMaterialsRequesting && addPackingMaterialsSuccess) {
      Toast.show({
        type: 'success',
        text1: 'packing matreial',
        text2: 'packing matreial has been added successfully',
      });
      dispatch2(resetPackingMaterialRequest());
    } else if (!addPackingMaterialsRequesting && addPackingMaterialsFailure) {
      Toast.show({
        type: 'error',
        text1: 'Enquriy',
        text2: 'Error in adding enquiry. Please try again!',
      });
      dispatch2(resetPackingMaterialRequest());
    }
  }, [
    addPackingMaterialsRequesting,
    addPackingMaterialsSuccess,
    addPackingMaterialsFailure,
    dispatch2,
  ]);

  const handleLorryType = (item: TDropdownItem) => {
    setVehicleLoadSize(item.value);
  };

  const handlOtherType = (item: string) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].type = item;
    setItems(updatedItems);
  };
  const handleLabourType = (item: string) => {
    state.Labour.type = item;
    dispatch({
      type: PACKING_MATERIAL_FORM_ACTION.LABOUR,
      payload: state.Labour,
    });
  };

  const handlePackingTapeType = (item: string) => {
    state.packingTape.type = item;
    dispatch({
      type: PACKING_MATERIAL_FORM_ACTION.PAKING_TAPES,
      payload: state.packingTape,
    });
  };
  const handleBubbleWrapesType = (item: string) => {
    state.BubbleWrapes.type = item;
    dispatch({
      type: PACKING_MATERIAL_FORM_ACTION.BUBBLE_WRAPES,
      payload: state.BubbleWrapes,
    });
  };
  const handleCorrugateSheetType = (item: string) => {
    state.CorrugateSheet.type = item;
    dispatch({
      type: PACKING_MATERIAL_FORM_ACTION.CORRUGATE_SHEET,
      payload: state.CorrugateSheet,
    });
  };
  const handleWaterproofLaminationType = (item: string) => {
    state.WaterproofLamination.type = item;
    dispatch({
      type: PACKING_MATERIAL_FORM_ACTION.WATERPROOF_LAMINATION,
      payload: state.WaterproofLamination,
    });
  };
  const handleThermocolType = (item: string) => {
    state.Thermocol.type = item;
    dispatch({
      type: PACKING_MATERIAL_FORM_ACTION.THERMOCOL,
      payload: state.Thermocol,
    });
  };
  const handleCartonBoxesType = (item: string) => {
    state.CartonBoxes.type = item;
    dispatch({
      type: PACKING_MATERIAL_FORM_ACTION.CARTON_BOXES,
      payload: state.CartonBoxes,
    });
  };
  const handleAirBubbleType = (item: string) => {
    state.AirBubble.type = item;
    dispatch({
      type: PACKING_MATERIAL_FORM_ACTION.AIR_BUBBLE,
      payload: state.AirBubble,
    });
  };
  const handleNewPaperType = (item: string) => {
    state.NewPaper.type = item;
    dispatch({
      type: PACKING_MATERIAL_FORM_ACTION.NEW_PAPER,
      payload: state.NewPaper,
    });
  };
  const handleFoamsheetType = (item: string) => {
    state.Foamsheet.type = item;
    dispatch({
      type: PACKING_MATERIAL_FORM_ACTION.FOAM_SHEET,
      payload: state.Foamsheet,
    });
  };
  const handlePlasticCarateType = (item: string) => {
    state.PlasticCarate.type = item;
    dispatch({
      type: PACKING_MATERIAL_FORM_ACTION.PLASTIC_CARATE,
      payload: state.PlasticCarate,
    });
  };
  const handleWoodenFrameType = (item: string) => {
    state.WoodenFrame.type = item;
    dispatch({
      type: PACKING_MATERIAL_FORM_ACTION.WOODEN_FRAME,
      payload: state.WoodenFrame,
    });
  };

  const handleCounter = (event: string, count: string) => {
    switch (event) {
      case 'Labour':
        let quantityLabourAsNumber = parseInt(state.Labour.quantity);
        let labour: packingitems = {
          name: event,
          quantity:
            quantityLabourAsNumber > 0 && count == 'decrement'
              ? (quantityLabourAsNumber - 1).toString()
              : count == 'increment'
              ? (quantityLabourAsNumber + 1).toString()
              : quantityLabourAsNumber.toString(),
          type: '1',
        };
        dispatch({
          type: PACKING_MATERIAL_FORM_ACTION.LABOUR,
          payload: labour,
        });

        break;
      case 'Packing Tapes':
        let quantityPackingAsNumber = parseInt(state.packingTape.quantity);

        let packingTape: packingitems = {
          name: event,
          quantity:
            quantityPackingAsNumber > 0 && count == 'decrement'
              ? (quantityPackingAsNumber - 1).toString()
              : count == 'increment'
              ? (quantityPackingAsNumber + 1).toString()
              : quantityPackingAsNumber.toString(),
          type: '1',
        };
        dispatch({
          type: PACKING_MATERIAL_FORM_ACTION.PAKING_TAPES,
          payload: packingTape,
        });

        break;
      case 'BubbleWrapes':
        let quantityBubbleWrapesAsNumber = parseInt(
          state.BubbleWrapes.quantity,
        );
        let bubbleWrapes: packingitems = {
          name: event,
          quantity:
            quantityBubbleWrapesAsNumber > 0 && count == 'decrement'
              ? (quantityBubbleWrapesAsNumber - 1).toString()
              : count == 'increment'
              ? (quantityBubbleWrapesAsNumber + 1).toString()
              : quantityBubbleWrapesAsNumber.toString(),
          type: '1',
        };
        dispatch({
          type: PACKING_MATERIAL_FORM_ACTION.BUBBLE_WRAPES,
          payload: bubbleWrapes,
        });

        break;
      case 'CorrugateSheet':
        let quantityCorrugateSheetAsNumber = parseInt(
          state.CorrugateSheet.quantity,
        );
        let corrugateSheet: packingitems = {
          name: event,
          quantity:
            quantityCorrugateSheetAsNumber > 0 && count == 'decrement'
              ? (quantityCorrugateSheetAsNumber - 1).toString()
              : count == 'increment'
              ? (quantityCorrugateSheetAsNumber + 1).toString()
              : quantityCorrugateSheetAsNumber.toString(),
          type: '1',
        };
        dispatch({
          type: PACKING_MATERIAL_FORM_ACTION.CORRUGATE_SHEET,
          payload: corrugateSheet,
        });

        break;
      case 'WaterproofLamination':
        let quantityWaterproofLaminationAsNumber = parseInt(
          state.WaterproofLamination.quantity,
        );
        let waterproofLamination: packingitems = {
          name: event,
          quantity:
            quantityWaterproofLaminationAsNumber > 0 && count == 'decrement'
              ? (quantityWaterproofLaminationAsNumber - 1).toString()
              : count == 'increment'
              ? (quantityWaterproofLaminationAsNumber + 1).toString()
              : quantityWaterproofLaminationAsNumber.toString(),
          type: '1',
        };
        dispatch({
          type: PACKING_MATERIAL_FORM_ACTION.WATERPROOF_LAMINATION,
          payload: waterproofLamination,
        });

        break;
      case 'Thermocol':
        let quantityThermocolAsNumber = parseInt(state.Thermocol.quantity);
        let thermocol: packingitems = {
          name: event,
          quantity:
            quantityThermocolAsNumber > 0 && count == 'decrement'
              ? (quantityThermocolAsNumber - 1).toString()
              : count == 'increment'
              ? (quantityThermocolAsNumber + 1).toString()
              : quantityThermocolAsNumber.toString(),
          type: '1',
        };
        dispatch({
          type: PACKING_MATERIAL_FORM_ACTION.THERMOCOL,
          payload: thermocol,
        });

        break;
      case 'CartonBoxes':
        let quantityCartonBoxesAsNumber = parseInt(state.CartonBoxes.quantity);

        let cartonBoxes: packingitems = {
          name: event,
          quantity:
            quantityCartonBoxesAsNumber > 0 && count == 'decrement'
              ? (quantityCartonBoxesAsNumber - 1).toString()
              : count == 'increment'
              ? (quantityCartonBoxesAsNumber + 1).toString()
              : quantityCartonBoxesAsNumber.toString(),
          type: '1',
        };
        dispatch({
          type: PACKING_MATERIAL_FORM_ACTION.CARTON_BOXES,
          payload: cartonBoxes,
        });

        break;
      case 'AirBubble':
        let quantityAirBubbleAsNumber = parseInt(state.AirBubble.quantity);
        let airBubble: packingitems = {
          name: event,
          quantity:
            quantityAirBubbleAsNumber > 0 && count == 'decrement'
              ? (quantityAirBubbleAsNumber - 1).toString()
              : count == 'increment'
              ? (quantityAirBubbleAsNumber + 1).toString()
              : quantityAirBubbleAsNumber.toString(),
          type: '1',
        };
        dispatch({
          type: PACKING_MATERIAL_FORM_ACTION.AIR_BUBBLE,
          payload: airBubble,
        });

        break;
      case 'NewPaper':
        let quantityNewPaperAsNumber = parseInt(state.NewPaper.quantity);
        let newPaper: packingitems = {
          name: event,
          quantity:
            quantityNewPaperAsNumber > 0 && count == 'decrement'
              ? (quantityNewPaperAsNumber - 1).toString()
              : count == 'increment'
              ? (quantityNewPaperAsNumber + 1).toString()
              : quantityNewPaperAsNumber.toString(),
          type: '1',
        };
        dispatch({
          type: PACKING_MATERIAL_FORM_ACTION.NEW_PAPER,
          payload: newPaper,
        });

        break;
      case 'Foamsheet':
        let quantityFoamsheetAsNumber = parseInt(state.Foamsheet.quantity);

        let foamSheet: packingitems = {
          name: event,
          quantity:
            quantityFoamsheetAsNumber > 0 && count == 'decrement'
              ? (quantityFoamsheetAsNumber - 1).toString()
              : count == 'increment'
              ? (quantityFoamsheetAsNumber + 1).toString()
              : quantityFoamsheetAsNumber.toString(),
          type: '1',
        };
        dispatch({
          type: PACKING_MATERIAL_FORM_ACTION.FOAM_SHEET,
          payload: foamSheet,
        });

        break;
      case 'PlasticCarate':
        let quantityPlasticCarateAsNumber = parseInt(
          state.PlasticCarate.quantity,
        );
        let plasticCarate: packingitems = {
          name: event,
          quantity:
            quantityPlasticCarateAsNumber > 0 && count == 'decrement'
              ? (quantityPlasticCarateAsNumber - 1).toString()
              : count == 'increment'
              ? (quantityPlasticCarateAsNumber + 1).toString()
              : quantityPlasticCarateAsNumber.toString(),
          type: '1',
        };
        dispatch({
          type: PACKING_MATERIAL_FORM_ACTION.PLASTIC_CARATE,
          payload: plasticCarate,
        });

        break;
      case 'WoodenFrame':
        let quantityWoodenFrameAsNumber = parseInt(state.WoodenFrame.quantity);

        let woodenFrame: packingitems = {
          name: event,
          quantity:
            quantityWoodenFrameAsNumber > 0 && count == 'decrement'
              ? (quantityWoodenFrameAsNumber - 1).toString()
              : count == 'increment'
              ? (quantityWoodenFrameAsNumber + 1).toString()
              : quantityWoodenFrameAsNumber.toString(),
          type: '1',
        };
        dispatch({
          type: PACKING_MATERIAL_FORM_ACTION.WOODEN_FRAME,
          payload: woodenFrame,
        });

        break;

      default:
    }
  };

  const incrementCount = (index: number) => {
    setItemIndex(index);
    const updatedItems = [...items];
    let countNumber = parseInt(updatedItems[index].quantity);
    countNumber += 1;
    updatedItems[index].quantity = countNumber.toString();
    setItems(updatedItems);
  };

  const decrementCount = (index: number) => {
    setItemIndex(index);
    const updatedItems = [...items];
    let countNumber = parseInt(updatedItems[index].quantity);
    if (countNumber > 0) {
      countNumber -= 1;
      updatedItems[index].quantity = countNumber.toString();
      setItems(updatedItems);
    }
  };

  const handleAddInput = (text: string) => {
    setInputText(text);
  };

  const addItem = () => {
    if (inputText) {
      setItems([...items, {name: inputText, quantity: '0', type: ''}]);
      setInputText('');
    }
  };

  const onSubmit = () => {
    const payload: IAddPackingMaterialRequest = {
      enquiryId: enquiryId,
      vehicleLoadSize: vehicleLoadSize,
      packingMaterial: [
        state.Labour,
        state.packingTape,
        state.BubbleWrapes,
        state.CorrugateSheet,
        state.WaterproofLamination,
        state.Thermocol,
        state.CartonBoxes,
        state.AirBubble,
        state.NewPaper,
        state.Foamsheet,
        state.PlasticCarate,
        state.WoodenFrame,
        ...items,
      ],
    };
    console.log(payload, 'data...payload');

    dispatch2(addPackingMaterialRequest(payload));
  };

  const handleShowList = () => {
    setShowList(true);
  };

  const handleModalClose = () => {
    setShowList(false);
  }

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Material List Form</Text>
          <TouchableOpacity
            style={styles.showListButtonContainer}
            onPress={handleShowList}>
            <Text style={styles.buttonText}>Show List</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer2}>
          <Label text="Vehicle Load Size" style={styles.label} />
          <DropdownComponent
            data={vehicleSizeArray()}
            onSelect={handleLorryType}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.mainWrapper}>
          <View style={styles.textContainer}>
            <Label text="Labour" style={styles.label} />
            <View style={styles.wrapConatiner}>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('Labour', 'decrement')}>
                  <MinusIcon width={32} height={32} />
                </TouchableOpacity>
                <Text style={styles.labelText}>{state.Labour.quantity}</Text>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('Labour', 'increment')}>
                  <PlusIcon width={32} height={32} />
                </TouchableOpacity>
              </View>
              {/* <View style={styles.dropDownStyle}>
                                  <EpackDropdown
                                data={unityTypeArray()}
                                placeholder={'Select unit Type'}
                                hanldeData={handleLabourType} />
                            </View> */}
            </View>
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.mainWrapper}>
          <View style={styles.textContainer}>
            <Label text="Packing Tapes" style={styles.label} />
            <View style={styles.wrapConatiner}>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('Packing Tapes', 'decrement')}>
                  <MinusIcon width={32} height={32} />
                </TouchableOpacity>
                <Text style={styles.labelText}>
                  {state.packingTape.quantity}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('Packing Tapes', 'increment')}>
                  <PlusIcon width={32} height={32} />
                </TouchableOpacity>
              </View>
              <View style={styles.dropDownStyle}>
                <EpackDropdown
                  data={unityTypeArray()}
                  placeholder={'Select Unit Type'}
                  hanldeData={handlePackingTapeType}
                />
              </View>
            </View>
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.mainWrapper}>
          <View style={styles.textContainer}>
            <Label text="Bubble Wrapes" style={styles.label} />
            <View style={styles.wrapConatiner}>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('BubbleWrapes', 'decrement')}>
                  <MinusIcon width={32} height={32} />
                </TouchableOpacity>
                <Text style={styles.labelText}>
                  {state.BubbleWrapes.quantity}
                </Text>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('BubbleWrapes', 'increment')}>
                  <PlusIcon width={32} height={32} />
                </TouchableOpacity>
              </View>
              <View style={styles.dropDownStyle}>
                <EpackDropdown
                  data={unityTypeArray()}
                  placeholder={'Select Unit Type'}
                  hanldeData={handleBubbleWrapesType}
                />
              </View>
            </View>
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.mainWrapper}>
          <View style={styles.textContainer}>
            <Label text="Corrugate Sheet" style={styles.label} />
            <View style={styles.wrapConatiner}>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('CorrugateSheet', 'decrement')}>
                  <MinusIcon width={32} height={32} />
                </TouchableOpacity>
                <Text style={styles.labelText}>
                  {state.CorrugateSheet.quantity}
                </Text>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('CorrugateSheet', 'increment')}>
                  <PlusIcon width={32} height={32} />
                </TouchableOpacity>
              </View>
              <View style={styles.dropDownStyle}>
                <EpackDropdown
                  data={unityTypeArray()}
                  placeholder={'Select Unit Type'}
                  hanldeData={handleCorrugateSheetType}
                />
              </View>
            </View>
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.mainWrapper}>
          <View style={styles.textContainer}>
            <Label text="Waterproof Lamination" style={styles.label} />
            <View style={styles.wrapConatiner}>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() =>
                    handleCounter('WaterproofLamination', 'decrement')
                  }>
                  <MinusIcon width={32} height={32} />
                </TouchableOpacity>
                <Text style={styles.labelText}>
                  {state.WaterproofLamination.quantity}
                </Text>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() =>
                    handleCounter('WaterproofLamination', 'increment')
                  }>
                  <PlusIcon width={32} height={32} />
                </TouchableOpacity>
              </View>
              <View style={styles.dropDownStyle}>
                <EpackDropdown
                  data={unityTypeArray()}
                  placeholder={'Select Unit Type'}
                  hanldeData={handleWaterproofLaminationType}
                />
              </View>
            </View>
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.mainWrapper}>
          <View style={styles.textContainer}>
            <Label text="Thermocol" style={styles.label} />
            <View style={styles.wrapConatiner}>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('Thermocol', 'decrement')}>
                  <MinusIcon width={32} height={32} />
                </TouchableOpacity>
                <Text style={styles.labelText}>{state.Thermocol.quantity}</Text>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('Thermocol', 'increment')}>
                  <PlusIcon width={32} height={32} />
                </TouchableOpacity>
              </View>
              <View style={styles.dropDownStyle}>
                <EpackDropdown
                  data={unityTypeArray()}
                  placeholder={'Select Unit Type'}
                  hanldeData={handleThermocolType}
                />
              </View>
            </View>
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.mainWrapper}>
          <View style={styles.textContainer}>
            <Label text="Carton Boxes" style={styles.label} />
            <View style={styles.wrapConatiner}>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('CartonBoxes', 'decrement')}>
                  <MinusIcon width={32} height={32} />
                </TouchableOpacity>
                <Text style={styles.labelText}>
                  {state.CartonBoxes.quantity}
                </Text>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('CartonBoxes', 'increment')}>
                  <PlusIcon width={32} height={32} />
                </TouchableOpacity>
              </View>
              <View style={styles.dropDownStyle}>
                <EpackDropdown
                  data={unityTypeArray()}
                  placeholder={'Select Unit Type'}
                  hanldeData={handleCartonBoxesType}
                />
              </View>
            </View>
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.mainWrapper}>
          <View style={styles.textContainer}>
            <Label text="Air Bubble" style={styles.label} />
            <View style={styles.wrapConatiner}>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('AirBubble', 'decrement')}>
                  <MinusIcon width={32} height={32} />
                </TouchableOpacity>
                <Text style={styles.labelText}>{state.AirBubble.quantity}</Text>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('AirBubble', 'increment')}>
                  <PlusIcon width={32} height={32} />
                </TouchableOpacity>
              </View>
              <View style={styles.dropDownStyle}>
                <EpackDropdown
                  data={unityTypeArray()}
                  placeholder={'Select Unit Type'}
                  hanldeData={handleAirBubbleType}
                />
              </View>
            </View>
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.mainWrapper}>
          <View style={styles.textContainer}>
            <Label text="New Paper" style={styles.label} />
            <View style={styles.wrapConatiner}>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('NewPaper', 'decrement')}>
                  <MinusIcon width={32} height={32} />
                </TouchableOpacity>
                <Text style={styles.labelText}>{state.NewPaper.quantity}</Text>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('NewPaper', 'increment')}>
                  <PlusIcon width={32} height={32} />
                </TouchableOpacity>
              </View>
              <View style={styles.dropDownStyle}>
                <EpackDropdown
                  data={unityTypeArray()}
                  placeholder={'Select Unit Type'}
                  hanldeData={handleNewPaperType}
                />
              </View>
            </View>
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.mainWrapper}>
          <View style={styles.textContainer}>
            <Label text="Foam sheet" style={styles.label} />
            <View style={styles.wrapConatiner}>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('Foamsheet', 'decrement')}>
                  <MinusIcon width={32} height={32} />
                </TouchableOpacity>
                <Text style={styles.labelText}>{state.Foamsheet.quantity}</Text>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('Foamsheet', 'increment')}>
                  <PlusIcon width={32} height={32} />
                </TouchableOpacity>
              </View>
              <View style={styles.dropDownStyle}>
                <EpackDropdown
                  data={unityTypeArray()}
                  placeholder={'Select Unit Type'}
                  hanldeData={handleFoamsheetType}
                />
              </View>
            </View>
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.mainWrapper}>
          <View style={styles.textContainer}>
            <Label text="Plastic Carate" style={styles.label} />
            <View style={styles.wrapConatiner}>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('PlasticCarate', 'decrement')}>
                  <MinusIcon width={32} height={32} />
                </TouchableOpacity>
                <Text style={styles.labelText}>
                  {state.PlasticCarate.quantity}
                </Text>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('PlasticCarate', 'increment')}>
                  <PlusIcon width={32} height={32} />
                </TouchableOpacity>
              </View>
              <View style={styles.dropDownStyle}>
                <EpackDropdown
                  data={unityTypeArray()}
                  placeholder={'Select Unit Type'}
                  hanldeData={handlePlasticCarateType}
                />
              </View>
            </View>
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.mainWrapper}>
          <View style={styles.textContainer}>
            <Label text="Wooden Frame" style={styles.label} />
            <View style={styles.wrapConatiner}>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('WoodenFrame', 'decrement')}>
                  <MinusIcon width={32} height={32} />
                </TouchableOpacity>
                <Text style={styles.labelText}>
                  {state.WoodenFrame.quantity}
                </Text>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => handleCounter('WoodenFrame', 'increment')}>
                  <PlusIcon width={32} height={32} />
                </TouchableOpacity>
              </View>
              <View style={styles.dropDownStyle}>
                <EpackDropdown
                  data={unityTypeArray()}
                  placeholder={'Select Unit Type'}
                  hanldeData={handleWoodenFrameType}
                />
              </View>
            </View>
          </View>
        </View>
        <Spacer height={4} />
        {items.map((item, index) => (
          <View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
              <View style={styles.textContainer}>
                <Label text={item.name} style={styles.label} />
                <View style={styles.wrapConatiner}>
                  <View style={styles.counterContainer}>
                    <TouchableOpacity
                      style={styles.touchableContainer}
                      onPress={() => decrementCount(index)}>
                      <MinusIcon width={32} height={32} />
                    </TouchableOpacity>
                    <Text style={styles.labelText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.touchableContainer}
                      onPress={() => incrementCount(index)}>
                      <PlusIcon width={32} height={32} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.dropDownStyle}>
                    <EpackDropdown
                      data={unityTypeArray()}
                      placeholder={'Select Unit Type'}
                      hanldeData={handlOtherType}
                    />
                  </View>
                </View>
              </View>
            </View>
            <Spacer height={4} />
          </View>
        ))}
        <Spacer height={8} />
        <View style={styles.mainWrapper}>
          <View style={styles.textContainer}>
            <Label text="Others" style={styles.label} />
            <View style={styles.wrapConatiner}>
              <Input
                onChangeText={handleAddInput}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />

              <View style={styles.dropDownStyle}>
                <Button
                  text="ADD"
                  onPress={addItem}
                  disabled={false}
                  style={styles.previewAddButtonStyle}
                  textStyle={styles.textStyle}
                />
              </View>
            </View>
          </View>
        </View>
        <Spacer height={8} />
        <Button
          text="SUBMIT"
          onPress={onSubmit}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={12} />
        <Spinner show={addPackingMaterialsRequesting} />
        <ModalHOC
          visible={showList}
          onClose={handleModalClose}
          title="PACKING MATERIALS LIST">
          <>
            <View>
              <PackingMaterials enquiryId={enquiryId} />
            </View>
            <Toast />
          </>
        </ModalHOC>
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default PackingMaterialsView;
