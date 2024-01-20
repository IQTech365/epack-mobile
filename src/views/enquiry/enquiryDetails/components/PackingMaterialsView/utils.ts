import {EPackingMaterialType} from './PackingMaterialTypeEnum';

export const materials: string[] = [
  'Labour',
  'Packing Tapes',
  'Bubble Wrapes',
  'Corrugate Sheet',
  'Water Proof Lamination',
  'Thermocol',
  'Cartoon Boxes',
  'Air Bubble',
  'New Paper',
  'Foam Sheet',
  'Wooden Frame',
];

export type IPackingItem = {
  name: string,
  quantity: string,
  type: string
};

export const getMaterialTypeEnum = (material: string):EPackingMaterialType => {
  let materialType: EPackingMaterialType = EPackingMaterialType.LABOUR;
  switch (material) {
    case materials[0]:
      materialType = EPackingMaterialType.LABOUR;
      break;
    case materials[1]:
      materialType = EPackingMaterialType.PACKING_TAPES;
      break;
    case materials[2]:
      materialType = EPackingMaterialType.BUBBLE_WRAPES;
      break;
    case materials[3]:
      materialType = EPackingMaterialType.CORRUGATE_SHEET;
      break;
    case materials[4]:
      materialType = EPackingMaterialType.WATERPROOF_LAMINATION;
      break;
    case materials[5]:
      materialType = EPackingMaterialType.THERMOCOL;
      break;
    case materials[6]:
      materialType = EPackingMaterialType.CARTON_BOXES;
      break;
    case materials[7]:
      materialType = EPackingMaterialType.AIR_BUBBLE;
      break;
    case materials[8]:
      materialType = EPackingMaterialType.NEW_PAPER;
      break;
    case materials[9]:
      materialType = EPackingMaterialType.FOAM_SHEET;
      break;
    case materials[10]:
      materialType = EPackingMaterialType.WOODEN_FRAME;
      break;
    case materials[11]:
      materialType = EPackingMaterialType.EXTRA;
      break;
    default:
        materialType = EPackingMaterialType.EXTRA;
      break;
  }
  return materialType
};
