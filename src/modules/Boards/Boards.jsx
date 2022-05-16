import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Lock from '../../components/Lock/Lock';
import { Context } from '../../context';
import './Boards.scss';

const Boards = () => {
  let [boardList, setBoardList] = useState([]);
  let [temp, setTemp] = useState([]);
  let [boardInput, setBoardInput] = useState('');
  let { id } = useParams();
  let { controllersList } = useContext(Context);

  useEffect(() => {
    let controller = controllersList.filter(i => i.ip === id);

    let boards = controller.reduce((acc, curr) => {
      return [...acc, ...curr.boards]
    }, [])

    setBoardList(boards);

    setTemp(boards);
  }, []);

  let filterBoards = (numberBoard) => {
    let tempBoards = [...boardList];

    let filtredBoard = tempBoards.filter(i => i.number.toString().includes(numberBoard));

    setTemp(filtredBoard);
  };

  return (
    <div>
      <div className="info">
        <h1>BOARDS:</h1>
        <div>
          <input onChange={(e) => setBoardInput(e.target.value)} type="text" placeholder='THE NUMBER OF BOARD' />
          <button onClick={() => filterBoards(boardInput)}>SEARCH</button>
        </div>
        <div className="boards">
          {temp.length
            ? temp.map(board => (
              <div>
                <span onClick={() => filterBoards(board.number)} className="choosed-board">
                  BOARD - {board.number}
                </span>
                {Object.keys(board.locks).map(lock => (
                  <Lock
                    lock={{
                      lockNumber: lock,
                      ...board.locks[lock]
                    }}
                  />
                )
                )}
              </div>
            ))
            : 'NO BOARDS AND LOCKS'}
        </div>
      </div>
    </div>
  );
};

export default Boards;