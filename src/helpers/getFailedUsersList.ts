import { ExcelUser, SortingTabType } from '../constants';

import { getStatValue } from './getStatValue';

export const getFailedUsersList = (
    data: ExcelUser[] | null,
    metric: SortingTabType,
) => {
    if (!data) return [];

    const newArray = data.map((el) => ({
        name: el.Name,
        id: el['User ID'],
        value: getStatValue(el, metric),
    }));

    const firstFailerIndex = newArray.findIndex((el) => el.value < 1);
    return newArray.slice(firstFailerIndex);
};
