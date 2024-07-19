import { ExcelUser, SortingTabType } from '../constants';

export function sortByGoalHuntDescending(arr: ExcelUser[]) {
    return arr
        .slice()
        .sort(
            (a, b) => b['Goal Percentage (Hunt)'] - a['Goal Percentage (Hunt)'],
        );
}

export function sortByGoalPurchaseDescending(arr: ExcelUser[]) {
    return arr
        .slice()
        .sort(
            (a, b) =>
                b['Goal Percentage (Purchase)'] -
                a['Goal Percentage (Purchase)'],
        );
}

export function sortByAverageDescending(arr: ExcelUser[]) {
    return arr.slice().sort((a, b) => {
        const avgA =
            (a['Goal Percentage (Hunt)'] + a['Goal Percentage (Purchase)']) / 2;
        const avgB =
            (b['Goal Percentage (Hunt)'] + b['Goal Percentage (Purchase)']) / 2;
        return avgB - avgA;
    });
}

export function getSortedData(data: ExcelUser[], type: SortingTabType) {
    if (!data) return null;

    switch (type) {
        case 'Hunt':
            return sortByGoalHuntDescending(data);
        case 'Purchase':
            return sortByGoalPurchaseDescending(data);
        case 'All':
            return sortByAverageDescending(data);
        default:
            return null;
    }
}
