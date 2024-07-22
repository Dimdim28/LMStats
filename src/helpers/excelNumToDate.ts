export const excelDateToDate = (excelDate: number): Date => {
    // Excel date starts from 1 January 1900, which is 25569 in Excel serial date.
    const excelBaseDate = new Date(Date.UTC(1900, 0, 1));

    // Calculate the milliseconds since the Excel base date
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const excelDateInMillis = excelDate * millisecondsPerDay;

    // Create the Date object
    const resultDate = new Date(excelBaseDate.getTime() + excelDateInMillis);

    // Correct the date for the Excel leap year bug (1900 was considered a leap year)
    if (excelDate >= 60) {
        resultDate.setDate(resultDate.getDate() - 1);
    }

    return resultDate;
};
