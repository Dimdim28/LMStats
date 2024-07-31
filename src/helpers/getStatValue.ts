import { ExcelUser, SortingTabType } from '../constants';

export const getStatValue = (
    data: ExcelUser,
    tab: SortingTabType,
    purchaseColumnName: string,
    huntColumnName: string,
    areValueBiggerThan100: boolean,
) => {
    const huntValue = data[huntColumnName];
    const purchaseValue = data[purchaseColumnName];

    const huntPercents = areValueBiggerThan100 ? +huntValue / 100 : huntValue;
    const purchPercents = areValueBiggerThan100
        ? +purchaseValue / 100
        : huntValue;
    const allValue = (+huntPercents + +purchPercents) / 2;

    console.log(huntPercents, purchPercents, allValue);

    switch (tab) {
        case 'Hunt':
            return +huntPercents;
        case 'Purchase':
            return +purchPercents;
        default:
            return allValue;
    }
};
