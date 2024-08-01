/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';

import { Button } from '../../components';
import { ColumnNames, columnNamesArray, ExcelUser } from '../../constants';
import { I18n } from '../../enums/i18n-text';
import { fixEmptyColumnNames } from '../../helpers/fixColumnNames';

import styles from './uploadFile.module.scss';

interface UploadFileProps {
    setData: Dispatch<SetStateAction<ExcelUser[] | null>>;
    setValuesBiggerThan100: Dispatch<SetStateAction<boolean>>;
    setColumnNames: Dispatch<
        SetStateAction<Partial<Record<ColumnNames, string>>>
    >;
    columnNames: Partial<Record<ColumnNames, string>>;
}

const UploadFile: FC<UploadFileProps> = ({
    setData,
    setColumnNames,
    columnNames,
    setValuesBiggerThan100,
}) => {
    const [localData, setLocalData] = useState<ExcelUser[] | null>(null);
    const [error] = useState<string | null>(null);
    const [titleLineNumber, setTitleLineNumber] = useState<number>(1);
    const [currentStep, setCurrentStep] = useState<
        'lineNumber' | 'columnNames' | 'inputFile'
    >('inputFile');
    const [titles, setTitles] = useState<string[]>([]);

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

                setLocalData(json);
                setCurrentStep('lineNumber');
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            parseExcel(selectedFile);
        }
    };

    const handleClick = (): void => {
        fileInputRef.current?.click();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) {
            parseExcel(droppedFile);
            // validateAndParseFile(droppedFile);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
    };

    if (currentStep === 'inputFile')
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
    else if (currentStep === 'lineNumber') {
        return (
            <div className={styles.enterLineContainer}>
                <input
                    value={titleLineNumber || 1}
                    onChange={(e) => setTitleLineNumber(+e.target.value)}
                    type="number"
                    className={styles.inputNumber}
                    step={1}
                    min={0}
                />
                <div className={styles.lineLabel}>
                    <p className={styles.text}>{t(I18n.SELECT_LINE)}</p>
                </div>
                <Button
                    text="Confirm"
                    buttonClass="buttonYellow"
                    onClick={() => {
                        const slicedJson = (localData as ExcelUser[]).slice(
                            titleLineNumber ? titleLineNumber - 1 : 0,
                        );

                        if (titleLineNumber === 1) {
                            setLocalData(slicedJson);
                        } else {
                            const fixedData = fixEmptyColumnNames(
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                slicedJson as any,
                            );
                            const { titles, data } = fixedData;

                            setTitles(titles);
                            const firstColumnName = titles[0];
                            setColumnNames({
                                'UserID': firstColumnName,
                                'Name': firstColumnName,
                                'TotalActions': firstColumnName,
                                'HuntActions': firstColumnName,
                                'PurchActions': firstColumnName,
                                'L1Hunt': firstColumnName,
                                'L2Hunt': firstColumnName,
                                'L3Hunt': firstColumnName,
                                'L4Hunt': firstColumnName,
                                'L5Hunt': firstColumnName,
                                'L1Purch': firstColumnName,
                                'L2Purch': firstColumnName,
                                'L3Purch': firstColumnName,
                                'L4Purch': firstColumnName,
                                'L5Purch': firstColumnName,
                                'HuntPoints': firstColumnName,
                                'PurchsPoints': firstColumnName,
                                'HuntCompletion': firstColumnName,
                                'PurchCompletion': firstColumnName,
                            });

                            setLocalData(data);
                        }

                        setCurrentStep('columnNames');
                    }}
                />
            </div>
        );
    } else if (currentStep === 'columnNames') {
        return (
            <div className={styles.enterLineContainer}>
                <div className={styles.lineLabel}>
                    <p className={styles.text}>{t(I18n.SELECT_COLUMNS)}</p>
                </div>
                {columnNamesArray.map((el, key) => (
                    <div className={styles.selectLine} key={key}>
                        <p>{el}: </p>
                        <select
                            name="l1"
                            onChange={(e) => {
                                setColumnNames((data) => ({
                                    ...data,
                                    [el]: e.target.value,
                                }));
                            }}
                        >
                            {titles.map((title, id) => (
                                <option key={id} value={title}>
                                    {title}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}

                <Button
                    text="Confirm"
                    buttonClass="buttonYellow"
                    onClick={() => {
                        setData(localData);
                        const areValueBiggerThan100 =
                            localData?.some(
                                (el) =>
                                    (el[
                                        columnNames['PurchCompletion'] as string
                                    ] as number) >= 100 ||
                                    (el[
                                        columnNames['HuntCompletion'] as string
                                    ] as number) >= 100,
                            ) || false;
                        setValuesBiggerThan100(areValueBiggerThan100);
                    }}
                />
            </div>
        );
    }
};

export default UploadFile;
