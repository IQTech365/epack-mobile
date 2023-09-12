import React from 'react';
import TemplateListView, { ITemplateListData } from '../templateListView';

interface IMoneyReceiptTemplateViewProps {
    data: ITemplateListData[];
    onTemplateSelect: (planCategory: string, planIndex: number, planName: string) => void;
}
const MoneyReceiptTemplateView:React.FC<IMoneyReceiptTemplateViewProps> = ({data, onTemplateSelect}) => {

    return <TemplateListView data={data} onTemplateSelect={onTemplateSelect} />

}

export default MoneyReceiptTemplateView