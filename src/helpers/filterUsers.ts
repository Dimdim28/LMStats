import { ExcelUser } from '../constants';

export const filterUsersByName = (
    data: ExcelUser[] | null,
    searchText: string,
    fieldName: string,
) =>
    data?.filter(
        (el) =>
            el?.[fieldName] &&
            (el[fieldName] as string)
                .toLowerCase()
                .includes(searchText.toLowerCase()),
    ) || [];
