import { SortingTabType } from '../constants';

import { getPercentValue } from './getPercentValue';

export const stringifyFailersList = (
    list: { name: string; id: number; value: number }[],
    copyProgress: boolean,
    sortingType: SortingTabType,
) => {
    const DATA = list.map((el) => ({
        ...el,
        value: getPercentValue(el.value),
    }));

    if (copyProgress) {
        return (
            `Failed ${sortingType} Users:\n` +
            DATA.map((el) => `${el.name}: ${el.value}`).join('\n')
        );
    } else {
        return (
            `Failed ${sortingType} Users:\n` +
            DATA.map((el) => el.name).join('\n')
        );
    }
};
