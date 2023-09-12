import React from 'react';
import TemplateListView, { ITemplateListData } from '../templateListView';

interface ICarConditionTemplateViewProps {
    data: ITemplateListData[];
    onTemplateSelect: (planCategory: string, planIndex: number, planName: string) => void;
}
const CarConditionTemplateView:React.FC<ICarConditionTemplateViewProps> = ({data, onTemplateSelect}) => {

    return <TemplateListView data={data} onTemplateSelect={onTemplateSelect} />

}

export default CarConditionTemplateView