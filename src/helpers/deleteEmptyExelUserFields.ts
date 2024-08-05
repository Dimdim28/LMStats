import { ExcelUser } from '../constants';

export const deleteEmptyExelUserFields = (exelUserList: ExcelUser[]) => {
    return exelUserList.reduce((acc, curr) => {
        const userWithoutEmptyProps = {} as ExcelUser;
        for (const key in curr) {
            if (curr[key] !== '') userWithoutEmptyProps[key] = curr[key];
        }
        return [...acc, userWithoutEmptyProps];
    }, [] as ExcelUser[]);
};
