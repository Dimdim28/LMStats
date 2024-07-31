export type Step = 'user' | 'guild' | 'upload' | 'info';
export type ExcelUser = {
    [key: string]: string | number;
};

export enum ValidColumnsEnum {
    UserID = 'User ID',
    Name = 'Name',
    Total = 'Total',
    Hunt = 'Hunt',
    Purchase = 'Purchase',
    L1Hunt = 'L1 (Hunt)',
    L2Hunt = 'L2 (Hunt)',
    L3Hunt = 'L3 (Hunt)',
    L4Hunt = 'L4 (Hunt)',
    L5Hunt = 'L5 (Hunt)',
    L1Purchase = 'L1 (Purchase)',
    L2Purchase = 'L2 (Purchase)',
    L3Purchase = 'L3 (Purchase)',
    L4Purchase = 'L4 (Purchase)',
    L5Purchase = 'L5 (Purchase)',
    PointsHunt = 'Points (Hunt)',
    GoalPercentageHunt = 'Goal Percentage (Hunt)',
    PointsPurchase = 'Points (Purchase)',
    GoalPercentagePurchase = 'Goal Percentage (Purchase)',
    FirstHuntTime = 'First Hunt Time',
    LastHuntTime = 'Last Hunt Time',
}

export const ValidColumns: ValidColumnsEnum[] = [
    ValidColumnsEnum.UserID,
    ValidColumnsEnum.Name,
    ValidColumnsEnum.Total,
    ValidColumnsEnum.Hunt,
    ValidColumnsEnum.Purchase,
    ValidColumnsEnum.L1Hunt,
    ValidColumnsEnum.L2Hunt,
    ValidColumnsEnum.L3Hunt,
    ValidColumnsEnum.L4Hunt,
    ValidColumnsEnum.L5Hunt,
    ValidColumnsEnum.L1Purchase,
    ValidColumnsEnum.L2Purchase,
    ValidColumnsEnum.L3Purchase,
    ValidColumnsEnum.L4Purchase,
    ValidColumnsEnum.L5Purchase,
    ValidColumnsEnum.PointsHunt,
    ValidColumnsEnum.GoalPercentageHunt,
    ValidColumnsEnum.PointsPurchase,
    ValidColumnsEnum.GoalPercentagePurchase,
    ValidColumnsEnum.FirstHuntTime,
    ValidColumnsEnum.LastHuntTime,
];

export type SortingTabType = 'Hunt' | 'Purchase' | 'All';

export type ColumnNames =
    | 'UserID'
    | 'Name'
    | 'TotalActions'
    | 'HuntActions'
    | 'PurchActions'
    | 'L1Hunt'
    | 'L2Hunt'
    | 'L3Hunt'
    | 'L4Hunt'
    | 'L5Hunt'
    | 'L1Purch'
    | 'L2Purch'
    | 'L3Purch'
    | 'L4Purch'
    | 'L5Purch'
    | 'HuntPoints'
    | 'PurchsPoints'
    | 'HuntCompletion'
    | 'PurchCompletion';

export const columnNamesArray: ColumnNames[] = [
    'UserID',
    'Name',
    'TotalActions',
    'HuntActions',
    'PurchActions',
    'L1Hunt',
    'L2Hunt',
    'L3Hunt',
    'L4Hunt',
    'L5Hunt',
    'L1Purch',
    'L2Purch',
    'L3Purch',
    'L4Purch',
    'L5Purch',
    'HuntPoints',
    'PurchsPoints',
    'HuntCompletion',
    'PurchCompletion',
];
