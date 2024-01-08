import React, { FC, useState } from "react";
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './style';
import { ITemplate } from "../../../../../interface/setting/template/template";

interface IProps {
    item:ITemplate;
    index: number;
    category:string;
    activeTemplateId:string;
    onChangeCategory: (category:string) => void;
    onChangeTemplateId: (id:string) => void;
}

const TemplateCard:FC<IProps> = ({item, index, category, activeTemplateId, onChangeCategory, onChangeTemplateId}) => {

    const container = (category == item.templateVersion && activeTemplateId == item._id) ? styles.activeContainer : styles.container;

    const handleChange = () => {
        onChangeCategory(item.templateVersion);
        onChangeTemplateId(item._id);
    }

    return <TouchableOpacity style={container} key={`${index}`} onPress={handleChange}>
        <Text style={styles.text}>{item.templateName}</Text>
    </TouchableOpacity>
}

export default TemplateCard;