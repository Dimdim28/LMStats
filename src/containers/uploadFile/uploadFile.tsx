import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';

import { ExcelUser, ValidColumns, ValidColumnsEnum } from '../../constants';
import { I18n } from '../../enums/i18n-text';
import { excelDateToDate } from '../../helpers/excelNumToDate';

import styles from './uploadFile.module.scss';

interface UploadFileProps {
    setData: Dispatch<SetStateAction<ExcelUser[] | null>>;
}

const UploadFile: FC<UploadFileProps> = ({ setData }) => {
    const [, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const { t } = useTranslation();

    const parseExcel = (file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target?.result;
            if (data) {
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json: ExcelUser[] = XLSX.utils.sheet_to_json(worksheet);
                const slicedJson = json; //.slice(4);
                console.log(slicedJson);
                console.log(
                    Object.entries(slicedJson[0])
                        .filter((el) => el[1].toString().trim().length === 0)
                        .map((el) => el[0]),
                );

                const fixEmptyColumnNames = (
                    excel: { [key: string]: string }[],
                ) => {
                    const firstRow = excel[0];
                    const otherRows = excel.slice(1);

                    // Create a mapping from the original keys to the new keys
                    const keyMapping = Object.fromEntries(
                        Object.entries(firstRow).map(([key, value]) => [
                            key,
                            value.trim(),
                        ]),
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

                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
                console.log(fixEmptyColumnNames(slicedJson as any));

                const areColumnsValid = validateColumns(worksheet);
                if (!areColumnsValid) {
                    setFile(null);
                    setError('The file is missing columns');
                } else {
                    const areRowsValid = validateRows(json);
                    if (!areRowsValid.valid) {
                        setFile(null);
                        setError(
                            `The file has invalid value at col[${areRowsValid.col}] row[${areRowsValid.row + 2}]`,
                        );
                    } else {
                        setData(slicedJson);
                    }
                }
            }
        };
        reader.readAsBinaryString(file);
    };

    const validateColumns = (worksheet: XLSX.WorkSheet): boolean => {
        const range: XLSX.Range = XLSX.utils.decode_range(
            worksheet['!ref'] as string,
        );
        const headers: string[] = [];

        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress: XLSX.CellAddress = { c: col, r: range.s.r };
            const cellRef: string = XLSX.utils.encode_cell(cellAddress);
            const cell: XLSX.CellObject = worksheet[cellRef] as XLSX.CellObject;
            headers.push(cell ? (cell.v as string) : ' ');
        }

        return ValidColumns.every((c) => headers.includes(c));
    };

    const validateRows = (
        users: ExcelUser[],
    ): { valid: boolean; row: number; col: string } => {
        const result = {
            valid: true,
            row: 0,
            col: '',
        };

        for (let index = 0; index < users.length; index++) {
            const user = users[index];

            for (let i = 0; i < ValidColumns.length; i++) {
                const column = ValidColumns[i];
                const value = user[column as keyof ExcelUser];

                if (
                    (column === ValidColumnsEnum.UserID &&
                        (typeof value !== 'number' || value > 9999999999)) ||
                    (column === ValidColumnsEnum.Name &&
                        (typeof value !== 'string' || value.length > 12)) ||
                    (column === ValidColumnsEnum.FirstHuntTime &&
                        (typeof value !== 'number' ||
                            Number.isNaN(excelDateToDate(value)))) ||
                    (column === ValidColumnsEnum.LastHuntTime &&
                        (typeof value !== 'number' ||
                            Number.isNaN(excelDateToDate(value)))) ||
                    (column !== ValidColumnsEnum.UserID &&
                        column !== ValidColumnsEnum.Name &&
                        column !== ValidColumnsEnum.FirstHuntTime &&
                        column !== ValidColumnsEnum.LastHuntTime &&
                        (typeof value !== 'number' || value > 1000000))
                ) {
                    result.valid = false;
                    result.row = index;
                    result.col = column;
                    break;
                }
            }

            if (!result.valid) break;
        }

        return result;
    };

    const validateAndParseFile = (file: File) => {
        const validTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'text/csv',
        ];
        if (validTypes.includes(file.type)) {
            setError(null);
            setFile(file);
            parseExcel(file);
        } else {
            setFile(null);
            setError('Invalid file type. Please upload an Excel file.');
        }
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            validateAndParseFile(selectedFile);
        }
    };

    const handleClick = (): void => {
        fileInputRef.current?.click();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) {
            validateAndParseFile(droppedFile);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
    };

    return (
        <div
            className={styles.container}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleClick}
        >
            <input
                type="file"
                className={styles.input}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFileChange}
                ref={fileInputRef}
            />
            <div className={styles.label}>
                <svg
                    width="180"
                    height="200"
                    viewBox="0 0 178 201"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M175 61.5V197.5H3V3H117.5M175 61.5L117.5 3M175 61.5H117.5V3"
                        stroke="#BC1515"
                        strokeWidth="6"
                        className={styles.document}
                    />
                    <rect
                        className={styles.line1}
                        height="6"
                        width="80"
                        x="20"
                        y="20"
                    ></rect>
                    <rect
                        className={styles.line2}
                        height="6"
                        width="80"
                        x="20"
                        y="50"
                    ></rect>
                    <rect
                        className={styles.line3}
                        height="6"
                        width="140"
                        x="20"
                        y="80"
                    ></rect>
                    <rect
                        className={styles.line4}
                        height="6"
                        width="140"
                        x="20"
                        y="110"
                    ></rect>
                    <rect
                        className={styles.line5}
                        height="6"
                        width="140"
                        x="20"
                        y="140"
                    ></rect>
                    <rect
                        className={styles.line6}
                        height="6"
                        width="140"
                        x="20"
                        y="170"
                    ></rect>
                </svg>
                <p className={styles.text}>{t(I18n.UPLOAD_FILE)}</p>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default UploadFile;
