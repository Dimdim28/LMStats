export const fixEmptyColumnNames = (excel: { [key: string]: string }[]) => {
    const firstRow = excel[0];
    const otherRows = excel.slice(1);

    console.log('firstrow =', firstRow);
    // Create a mapping from the original keys to the new keys
    const keyMapping = Object.fromEntries(
        Object.entries(firstRow).map(([key, value]) => [key, value.trim()]),
    );

    // Replace keys in each row according to the mapping
    console.log(otherRows);
    const fixedRows = otherRows.map((row) => {
        const newRow: { [key: string]: string } = {};
        for (const [key, value] of Object.entries(row)) {
            if (keyMapping[key]) {
                newRow[keyMapping[key]] = value;
            }
        }
        return newRow;
    });
    console.log(fixedRows);
    const titles = Object.values(firstRow).filter((el) => el.trim().length > 0);
    return { data: fixedRows, titles };
};
