import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';

import { ExcelUser } from '../../constants';

import styles from './uploadFile.module.scss';

interface UploadFileProps {
    setData: Dispatch<SetStateAction<ExcelUser[] | null>>;
}

export const UploadFile: FC<UploadFileProps> = ({ setData }) => {
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
                setData(json);
            }
        };
        reader.readAsBinaryString(file);
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
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
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
                <p className={styles.text}>{t('uploadFile')}</p>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
};
