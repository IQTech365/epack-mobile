import React from 'react';
import TemplateListView, { ITemplateListData } from '../templateListView';

interface IInvoiceTemplateViewProps {
    data: ITemplateListData[];
    onTemplateSelect: (planCategory: string, planIndex: number, planName: string) => void;
}
const InvoiceTemplateView:React.FC<IInvoiceTemplateViewProps> = ({data, onTemplateSelect}) => {

    return <TemplateListView data={data} onTemplateSelect={onTemplateSelect} />

}

export default InvoiceTemplateView