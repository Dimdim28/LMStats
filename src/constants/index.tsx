export type Step = 'user' | 'guild' | 'upload';
export type ExcelUser = {
    ' ': '';
    ' _1': '';
    ' _2': '';
    ' _3': '';
    ' _4': '';
    'First Hunt Time': number;
    'Goal Percentage (Hunt)': number;
    'Goal Percentage (Purchase)': number;
    'Hunt': number;
    'L1 (Hunt)': number;
    'L1 (Purchase)': number;
    'L2 (Hunt)': number;
    'L2 (Purchase)': number;
    'L3 (Hunt)': number;
    'L3 (Purchase)': number;
    'L4 (Hunt)': number;
    'L4 (Purchase)': number;
    'L5 (Hunt)': number;
    'L5 (Purchase)': number;
    'Last Hunt Time': number;
    'Name': string;
    'Points (Hunt)': number;
    'Points (Purchase)': number;
    'Purchase': number;
    'Total': number;
    'User ID': number;
};

export const ValidColumns = [
    'User ID',
    'Name',
    'Total',
    'Hunt',
    'Purchase',
    'L1 (Hunt)',
    'L2 (Hunt)',
    'L3 (Hunt)',
    'L4 (Hunt)',
    'L5 (Hunt)',
    'L1 (Purchase)',
    'L2 (Purchase)',
    'L3 (Purchase)',
    'L4 (Purchase)',
    'L5 (Purchase)',
    'Points (Hunt)',
    'Goal Percentage (Hunt)',
    'Points (Purchase)',
    'Goal Percentage (Purchase)',
    'First Hunt Time',
    'Last Hunt Time',
];

export type SortingTabType = 'Hunt' | 'Purchase' | 'All';
