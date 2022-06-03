export enum status {
    closed = 'closed',
    opened = 'opened',
}

export interface ILockInfo {
    state: status;
    comment: string;
}

export interface ILock {
    [lockNumber: string]: ILockInfo;
};

export interface IBoard {
    number: string;
    locks: ILock;
};

export interface IController {
    number: number;
    ip: string;
    boards: IBoard[];
};

export interface LockProps {
    lock: ILockKeys;
    id: string;
    boardNumber: string;
}

export type ILockKeys = {
    lockNumber: string;
    state: status;
    comment: string;
}

