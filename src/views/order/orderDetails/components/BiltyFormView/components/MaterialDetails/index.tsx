import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Spacer from '../../../../../../../common/Spacer';
import Label from '../../../../../../../common/Label';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Input, {InputMethods} from '../../../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../../../utils/colors';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import Button from '../../../../../../../common/Button';
import DeleteIcon from '../../../../../../../images/icons/delete.svg';
import {IMaterial, IVehicleBilty} from '../../biltyReducer2';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import {
  liabilityOfTaxOptions,
  riskTypeOptions,
  typeOfMovingOptions,
} from './utils';
import {useAppSelector} from '../../../../../../../redux/hooks';
import {IUnitType} from '../../../../../../../interface/setting/unitType/IGetunitTypeResponse';
import {IPackingType} from '../../../../../../../interface/common/common';
import {IBilty} from '../../../../../../../interface/order/IGetBiltyListResponse';
import VehicleInfo from '../VehicleInfo';
import ModalHOC from '../../../../../../../common/ModalHOC';
import EditIcon from '../../../../../../../images/icons/edit_icon.svg';

interface IProps {
  item?: IBilty;
  isEdit?: boolean;
}

const MaterialDetails: React.FC<IProps> = ({item, isEdit}) => {
  const materialInputRef = useRef<InputMethods>(null);
  const articlesInputref = useRef<InputMethods>(null);
  const hsnCodeInputref = useRef<InputMethods>(null);
  const billInvoiceNoInputref = useRef<InputMethods>(null);
  const actualWeightInputref = useRef<InputMethods>(null);
  const applicableWeightInputref = useRef<InputMethods>(null);
  const valueOfGoodsInputref = useRef<InputMethods>(null);

  const handleClear = () => {
    //@ts-ignore
    materialInputRef && materialInputRef?.current.reset();
    //@ts-ignore
    articlesInputref && articlesInputref?.current.reset();
    //@ts-ignore
    hsnCodeInputref && hsnCodeInputref?.current.reset();
    //@ts-ignore
    billInvoiceNoInputref && billInvoiceNoInputref?.current.reset();
    //@ts-ignore
    actualWeightInputref && actualWeightInputref?.current.reset();
    //@ts-ignore
    applicableWeightInputref && applicableWeightInputref?.current.reset();
    //@ts-ignore
    valueOfGoodsInputref && valueOfGoodsInputref?.current.reset();
  };
  const {
    state,
    setMaterials,
    setAddMaterial,
    setTypeOfMoving,
    setRiskType,
    setLiabilityOfTax,
  } = useBiltyFormContextHook();
  const [materialName, setMaterialName] = useState<string>('');
  const [noOfArticles, setNoOfArticles] = useState<string>('');
  const [packingType, setPackingType] = useState<string>('');
  const [hsnCode, setHsnCode] = useState<string>('');
  const [billInvoiceNo, setBillInvoiceNo] = useState<string>('');
  const [actualWeight, setActualWeight] = useState<string>('');
  const [applicableWeight, setApplicableWeight] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [valueOfGoods, setValueOfGoods] = useState<string>('');
  const [openEditModel, setOpenEditModel] = useState<boolean>(false);
  const [singleVehicleInfo, setSingleVehicleInfo] = useState<IVehicleBilty>();

  const {unitType} = useAppSelector(state => state.Setting);
  const {packingTypes} = useAppSelector(state => state.Common);

  const _getUnitTypes = () => {
    let unitTypes: TDropdownItem[] = [];
    const {data} = unitType || {};
    if (data && Array.isArray(data) && data.length > 0) {
      unitTypes = data.map((d: IUnitType) => {
        const item: TDropdownItem = {label: d.unitType, value: d.unitType};
        return item;
      });
    }
    return unitTypes;
  };

  const _getPackingTypes = () => {
    let packTypes: TDropdownItem[] = [];
    const {data} = packingTypes || {};
    if (data && Array.isArray(data) && data.length > 0) {
      packTypes = data.map((d: IPackingType) => {
        const item: TDropdownItem = {
          label: d.packingType,
          value: d.packingType,
        };
        return item;
      });
    }
    return packTypes;
  };

  const handleDeleteMaterialItem = (index: number) => {
    const clone = [...state.materials];
    const filter = clone.filter((_, i) => i !== index);
    setMaterials(filter);
  };

  const handleEditVehicleItem = (vi: IVehicleBilty, index: number) => {
    setSingleVehicleInfo(vi);
    setOpenEditModel(true);
  };

  const _hanldeCloseShowPreviewModal = () => {
    setOpenEditModel(false);
  };

  const handleOnComplete = () => {
    setOpenEditModel(!openEditModel);
  };

  const handleAddMaterial = () => {
    const clone = [...state.materials];
    const materil: IMaterial = {
      material_name: materialName,
      no_of_articles: noOfArticles,
      packing_type: packingType,
      hsn_code: hsnCode,
      bill_invoice_no: billInvoiceNo,
      actual_weight: actualWeight,
      applicable_weight: applicableWeight,
      units: unit,
      value_of_goods: valueOfGoods,
    };
    clone.push(materil);
    setMaterials(clone);
    handleClear();
  };

  const initData = () => {
    if (isEdit && item) {
      let transformData: IMaterial[] = [];
      if (item.materials && item.materials.length > 0) {
        transformData = item.materials.map(e => {
          const _item: IMaterial = {
            material_name: e.name,
            no_of_articles: e.noOfArticles,
            packing_type: e.packingType,
            hsn_code: e.HSNCode,
            bill_invoice_no: e.billNumber,
            actual_weight: e.actualWeight,
            applicable_weight: e.applicableWeight,
            units: e.unit,
            value_of_goods: e.valueOfGoods,
          };
          return _item;
        });
      }
      setMaterials(transformData);
      setTypeOfMoving(item.materialsType);
      setRiskType(item.riskType);
      setLiabilityOfTax(item.liabilityOfTax);
    }
  };

  useEffect(() => {
    initData();
  }, [isEdit, item]);

  const showMaterialList = () => {
    if (state.materials.length > 0) {
      return state.materials.map((item, index) => {
        return (
          <>
            <Spacer height={12} />
            <View style={styles.materialItemContainer}>
              <View
                style={[
                  styles.materialItem,
                  {justifyContent: 'space-between'},
                ]}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.materialLabelText}>SNO# - </Text>
                  <Text style={styles.materialValueText}>{index + 1}</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => handleDeleteMaterialItem(index)}>
                  <DeleteIcon width={25} height={25} />
                </TouchableOpacity>
              </View>
              <View style={styles.materialItem}>
                <Text style={styles.materialLabelText}>Material Name - </Text>
                <Text style={styles.materialValueText}>
                  {item.material_name}
                </Text>
              </View>
              <View style={styles.materialItem}>
                <Text style={styles.materialLabelText}>
                  Number of Articles -{' '}
                </Text>
                <Text style={styles.materialValueText}>
                  {item.no_of_articles}
                </Text>
              </View>
              <View style={styles.materialItem}>
                <Text style={styles.materialLabelText}>Packing Type - </Text>
                <Text style={styles.materialValueText}>
                  {item.packing_type}
                </Text>
              </View>
              <View style={styles.materialItem}>
                <Text style={styles.materialLabelText}>HSN Code - </Text>
                <Text style={styles.materialValueText}>{item.hsn_code}</Text>
              </View>
              <View style={styles.materialItem}>
                <Text style={styles.materialLabelText}>
                  Bill/Invoice Number -{' '}
                </Text>
                <Text style={styles.materialValueText}>
                  {item.bill_invoice_no}
                </Text>
              </View>
              <View style={styles.materialItem}>
                <Text style={styles.materialLabelText}>Net Weight - </Text>
                <Text style={styles.materialValueText}>
                  {item.actual_weight}
                </Text>
              </View>
              <View style={styles.materialItem}>
                <Text style={styles.materialLabelText}>Unit - </Text>
                <Text style={styles.materialValueText}>{item.units}</Text>
              </View>
              <View style={styles.materialItem}>
                <Text style={styles.materialLabelText}>Value Of Goods - </Text>
                <Text style={styles.materialValueText}>
                  {item.value_of_goods}
                </Text>
              </View>
            </View>
            <Spacer height={12} />
          </>
        );
      });
    }
    return null;
  };

  return (
    <CollapsibleView title="MATERIAL DETAILS" collapsed={true}>
      <View>
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Label text="Type of Moving" style={styles.label} />
        </View>
        <View style={styles.optionContainer}>
          {typeOfMovingOptions.map((option: string, index: number) => (
            <BouncyCheckbox
              key={`${index}`}
              size={25}
              unfillColor="#FFFFFF"
              text={option}
              fillColor={COLOR_BLUE}
              iconStyle={styles.iconStyle}
              innerIconStyle={styles.innerIconStyle}
              textStyle={styles.textStyle}
              style={styles.style}
              textContainerStyle={styles.textContainerStyle}
              onPress={(isChecked: boolean) => {
                setTypeOfMoving(option);
              }}
              isChecked={state.type_of_moving == option}
              disableBuiltInState={true}
            />
          ))}
        </View>
        <Spacer height={4} />
        {state.type_of_moving == typeOfMovingOptions[0] ? (
          <>
            <Spacer height={16} />
            <View style={styles.elementContainer}>
              <BouncyCheckbox
                size={25}
                fillColor={COLOR_BLUE}
                unfillColor="#FFFFFF"
                text="Want to add Material Detail"
                iconStyle={styles.iconStyle2}
                innerIconStyle={styles.innerIconStyle2}
                textStyle={styles.textStyle2}
                style={{marginRight: 0}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {
                  setAddMaterial(state.add_material == 'YES' ? 'NO' : 'YES');
                }}
                isChecked={
                  state.add_material == 'YES' ||
                  item?.addMaterialsStatus === 'YES'
                }
                disableBuiltInState={true}
              />
            </View>
          </>
        ) : null}
        <Spacer height={10} />
        {(state.type_of_moving == typeOfMovingOptions[0] &&
          state.add_material == 'YES') ||
        state.type_of_moving == typeOfMovingOptions[2] ||
        state.type_of_moving == typeOfMovingOptions[3] ? (
          <>
            <View style={styles.elementContainer2}>
              <Label text="Material Name" style={styles.label} />
              <Input
                onChangeText={setMaterialName}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                ref={materialInputRef}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="No. of Articles" style={styles.label} />
                <Input
                  onChangeText={setNoOfArticles}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  ref={articlesInputref}
                  inputType="numeric"
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Packing Type" style={styles.label} />
                <DropdownComponent
                  data={_getPackingTypes()}
                  onSelect={(item: TDropdownItem) => {
                    setPackingType(item.label);
                  }}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="HSN Code" style={styles.label} />
                <Input
                  onChangeText={setHsnCode}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                  ref={hsnCodeInputref}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Bill/Invoice No." style={styles.label} />
                <Input
                  onChangeText={setBillInvoiceNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  autoCapitalize="characters"
                  ref={billInvoiceNoInputref}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Actual Weight" style={styles.label} />
                <Input
                  onChangeText={setActualWeight}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                  ref={actualWeightInputref}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Applicable Weight" style={styles.label} />
                <Input
                  onChangeText={setApplicableWeight}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                  ref={applicableWeightInputref}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Units" style={styles.label} />
                <DropdownComponent
                  data={_getUnitTypes()}
                  onSelect={(item: TDropdownItem) => {
                    setUnit(item.label);
                  }}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Value of Goods" style={styles.label} />
                <Input
                  onChangeText={setValueOfGoods}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                  ref={valueOfGoodsInputref}
                />
              </View>
            </View>
            <Spacer height={12} />
            <Button
              text="ADD"
              onPress={handleAddMaterial}
              disabled={false}
              style={styles.previewButtonStyle}
              textStyle={styles.textStyle}
            />
          </>
        ) : state.type_of_moving === typeOfMovingOptions[1] ? (
          <>
            <VehicleInfo isEdit={isEdit} item={item} />
            {state.vehicleInfo.map((vi: IVehicleBilty, index) => {
              return (
                <View style={styles.listWrapper}>
                  <View
                    style={[
                      styles.materialItem,
                      {justifyContent: 'space-between'},
                    ]}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.materialLabelText}>SNO# - </Text>
                      <Text style={styles.materialValueText}>{index + 1}</Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: 24}}>
                      {isEdit && (
                        <TouchableOpacity
                          activeOpacity={0.4}
                          onPress={() => handleEditVehicleItem(vi, index)}>
                          <EditIcon width={25} height={25} />
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity activeOpacity={0.4} onPress={() => {}}>
                        <DeleteIcon width={25} height={25} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.label2}>
                    V. Type: <Text style={styles.text2}>{vi.vehicle_type}</Text>
                  </Text>
                  <Text style={styles.label2}>
                    Company:{' '}
                    <Text style={styles.text2}>{vi.vehicle_company}</Text>
                  </Text>
                  <Text style={styles.label2}>
                    V. Model:{' '}
                    <Text style={styles.text2}>{vi.vehicle_model}</Text>
                  </Text>
                  <Text style={styles.label2}>
                    V. Color:{' '}
                    <Text style={styles.text2}>{vi.vehicle_color}</Text>
                  </Text>
                  <Text style={styles.label2}>
                    Chasis No: <Text style={styles.text2}>{vi.chassis_no}</Text>
                  </Text>
                  <Text style={styles.label2}>
                    Registration No:{' '}
                    <Text style={styles.text2}>{vi.registration_no}</Text>
                  </Text>
                  <Text style={styles.label2}>
                    Engine No: <Text style={styles.text2}>{vi.engine_no}</Text>
                  </Text>
                  <Text style={styles.label2}>
                    V. Status:{' '}
                    <Text style={styles.text2}>{vi.vechile_status}</Text>
                  </Text>
                  <Text style={styles.label2}>
                    V. Value:{' '}
                    <Text style={styles.text2}>{vi.vehicle_value}/-</Text>
                  </Text>
                </View>
              );
            })}
          </>
        ) : null}
        {showMaterialList()}
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Label text="Risk Type" style={styles.label} />
        </View>
        <View style={styles.optionContainer}>
          {riskTypeOptions.map((option: string, index: number) => (
            <BouncyCheckbox
              key={`${index}`}
              size={25}
              unfillColor="#FFFFFF"
              text={option}
              fillColor={COLOR_BLUE}
              iconStyle={styles.iconStyle}
              innerIconStyle={styles.innerIconStyle}
              textStyle={styles.textStyle}
              style={styles.style}
              textContainerStyle={styles.textContainerStyle}
              onPress={(isChecked: boolean) => {
                setRiskType(option);
              }}
              isChecked={state.risk_type == option}
              disableBuiltInState={true}
            />
          ))}
        </View>
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Label text="Liability of Tax" style={styles.label} />
        </View>
        <View style={styles.optionContainer}>
          {liabilityOfTaxOptions.map((option: string, index: number) => (
            <BouncyCheckbox
              key={`${index}`}
              size={25}
              unfillColor="#FFFFFF"
              text={option}
              fillColor={COLOR_BLUE}
              iconStyle={styles.iconStyle}
              innerIconStyle={styles.innerIconStyle}
              textStyle={styles.textStyle}
              style={styles.style}
              textContainerStyle={styles.textContainerStyle}
              onPress={(isChecked: boolean) => {
                setLiabilityOfTax(option);
              }}
              isChecked={state.liability_of_tax == option}
              disableBuiltInState={true}
            />
          ))}
        </View>
        <ModalHOC
          visible={openEditModel}
          onClose={_hanldeCloseShowPreviewModal}
          // headerStyle={styles.headerStyle}
          title="Edit Vehicle Info"
          modalStyle={styles.modalStyle}>
          <View style={styles.modalStyle}>
            <VehicleInfo
              item={item}
              vehicleInfo={singleVehicleInfo as IVehicleBilty}
              isSingleEdit={true}
              onComplete={handleOnComplete}
            />
          </View>
        </ModalHOC>
      </View>
    </CollapsibleView>
  );
};

export default MaterialDetails;
