import React from 'react';
import Lock from '../../components/Lock/Lock';

const BoardsItem = ({ board, id, filterBoards, updateLockInContext }) => {
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
