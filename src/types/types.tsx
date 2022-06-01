export enum status {
    closed = 'closed',
    opened = 'opened',
}

export interface ILockInfo {
    state: status;
    comment: string;
}

export interface ILock {
    [lockNumber: string] : any;
};

export interface IBoard {
    number: number;
    locks: ILock;
};

export interface IController {
    number: number;
    ip: string;
    boards: IBoard;
};

export interface LockProps {
    lock: ILock;
    setLock?: Function;
    id?: string;
    boardNumber?: number;
  }
