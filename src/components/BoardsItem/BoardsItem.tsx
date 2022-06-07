import React, { FC } from 'react';
import { IBoard, ILockInfo } from '../../types/types';
import Lock from '../Lock/Lock';

interface BoardsItemProps {
  board: IBoard;
  filterBoards: (numberBoard: string) => void;
  controllerNumber: string;
  updateLockInContext: (lockNumber: string, data: ILockInfo, controllerNumber: string, boardNumber: string) => void;
}

const BoardsItem: FC<BoardsItemProps> = ({ board, filterBoards, updateLockInContext }) => {

  let handleChangeLockState = (lockNumber: string) => (data: ILockInfo): void => {
    let [lockControllerNumber, boardNumber] = lockNumber.split(':');
        
    updateLockInContext(lockNumber, data, lockControllerNumber, boardNumber);
  }

  return (
    <div>
      <span
        onClick={() => filterBoards(board.number)}
        className="choosed-board"
      >
        BOARD - {board.number}
      </span>
      {Object.keys(board.locks).map(lock => (
        <Lock
          lock={{
            lockNumber: lock,
            ...board.locks[lock],
          }}
          onStateSubmitted={handleChangeLockState(lock)}
          key={lock}
        />
      ))}
    </div>
  );
};

export default BoardsItem;
