import React from 'react';
import TemplateListView, { ITemplateListData } from '../templateListView';

interface IBiltyTemplateViewProps {
    data: ITemplateListData[];
    onTemplateSelect: (planCategory: string, planIndex: number, planName: string) => void;
}
const BiltyTemplateView:React.FC<IBiltyTemplateViewProps> = ({data, onTemplateSelect}) => {

    return <TemplateListView data={data} onTemplateSelect={onTemplateSelect} />

}

export default BiltyTemplateView