import { ExcelUser, SortingTabType } from '../constants';

export const getStatValue = (data: ExcelUser, tab: SortingTabType) => {
    const huntValue = data['Goal Percentage (Hunt)'];
    const purchaseValue = data['Goal Percentage (Purchase)'];
    const allValue = huntValue + purchaseValue / 2;

    switch (tab) {
        case 'Hunt':
            return huntValue;
        case 'Purchase':
            return purchaseValue;
        default:
            return allValue;
    }
};
