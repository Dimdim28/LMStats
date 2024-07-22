import { ExcelUser } from '../constants';

export const filterUsersByName = (
    data: ExcelUser[] | null,
    searchText: string,
) =>
    data?.filter((el) =>
        el.Name.toLocaleLowerCase().includes(searchText.toLowerCase()),
    ) || [];
