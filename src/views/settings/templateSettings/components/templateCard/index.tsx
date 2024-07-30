import React, { FC } from "react";
import {Text, View, TouchableOpacity, Image} from 'react-native';
import styles from './style';
import { ITemplate } from "../../../../../interface/setting/template/template";
import noPreviewThumbnailImage from '../../../../../images/no_preview_thumbnail.png';

interface IProps {
    item:ITemplate;
    index: number;
    category:string;
    activeTemplateId:string;
    onChangeTemplateId: (category: string, moduleId:string, templateId:string) => void;
}

const TemplateCard:FC<IProps> = ({item, index, category, activeTemplateId, onChangeTemplateId}) => {

    const container = (category == item.templateVersion && activeTemplateId == item._id) ? styles.activeContainer : styles.container;

    const handleChange = () => {
        onChangeTemplateId(item.templateVersion, item.moduleId, item._id);
    }

    console.log("itemDatatatat",item)

    const tumbnailUri = item.templateThumbnail ? {uri: item.templateThumbnail} : noPreviewThumbnailImage;

    return (
      <TouchableOpacity
        style={container}
        key={`${index}`}
        onPress={handleChange}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.templateName}</Text>
          </View>
        <Image source={tumbnailUri} style={styles.tumbnail} resizeMode="contain" />
      </TouchableOpacity>
    );
}

export default TemplateCard;