export const fixEmptyColumnNames = (excel: { [key: string]: string }[]) => {
    const firstRow = excel[0];
    const otherRows = excel.slice(1);

    // Create a mapping from the original keys to the new keys
    const keyMapping = Object.fromEntries(
        Object.entries(firstRow).map(([key, value]) => [key, value.trim()]),
    );

    // Replace keys in each row according to the mapping
    const fixedRows = otherRows.map((row) => {
        const newRow: { [key: string]: string } = {};
        for (const [key, value] of Object.entries(row)) {
            if (keyMapping[key]) {
                newRow[keyMapping[key]] = value;
            }
        }
        return newRow;
    });

    return fixedRows;
};
