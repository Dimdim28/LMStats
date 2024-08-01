import { ExcelUser, SortingTabType } from '../constants';

export function sortByGoalHuntDescending(arr: ExcelUser[], huntField: string) {
    return arr
        .slice()
        .sort((a, b) => (b[huntField] as number) - (a[huntField] as number));
}

export function sortByGoalPurchaseDescending(
    arr: ExcelUser[],
    purchField: string,
) {
    return arr
        .slice()
        .sort((a, b) => (b[purchField] as number) - (a[purchField] as number));
}

export function sortByAverageDescending(
    arr: ExcelUser[],
    huntField: string,
    purchField: string,
) {
    return arr.slice().sort((a, b) => {
        const avgA = ((a[huntField] as number) + (a[purchField] as number)) / 2;
        const avgB = ((b[huntField] as number) + (b[purchField] as number)) / 2;
        return avgB - avgA;
    });
}

export function getSortedData(
    data: ExcelUser[],
    type: SortingTabType,
    huntField: string,
    purchField: string,
) {
    if (!data) return null;

    switch (type) {
        case 'Hunt':
            return sortByGoalHuntDescending(data, huntField);
        case 'Purchase':
            return sortByGoalPurchaseDescending(data, purchField);
        case 'All':
            return sortByAverageDescending(data, huntField, purchField);
        default:
            return null;
    }
}
