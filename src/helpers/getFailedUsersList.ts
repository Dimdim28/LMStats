import { ExcelUser, SortingTabType } from '../constants';

import { getStatValue } from './getStatValue';

export const getFailedUsersList = (
    data: ExcelUser[] | null,
    metric: SortingTabType,
    purchColumnName: string,
    huntColumnName: string,
    areBiggerThan100: boolean,
) => {
    if (!data) return [];

    const newArray = data.map((el) => ({
        name: el.Name,
        id: el['User ID'],
        value: getStatValue(
            el,
            metric,
            purchColumnName,
            huntColumnName,
            areBiggerThan100,
        ),
    }));

    const firstFailerIndex = newArray.findIndex((el) => el.value < 1);
    return newArray.slice(firstFailerIndex);
};
