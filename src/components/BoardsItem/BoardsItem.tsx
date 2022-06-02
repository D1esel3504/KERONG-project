import React, { FC } from 'react';
import { IBoard } from '../../types/types';
import Lock from '../Lock/Lock';

interface BoardsItemProps {
  board: IBoard;
  filterBoards?: Function;
  id?: string;
  updateLockInContext?: Function;
}

const BoardsItem: FC<BoardsItemProps> = ({ board, id, filterBoards, updateLockInContext }) => {
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
          boardNumber={board.number}
          id={id}
          setLock={updateLockInContext}
        />
      ))}
    </div>
  );
};

export default BoardsItem;
