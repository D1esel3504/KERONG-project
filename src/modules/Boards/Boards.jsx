import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../context';
import './Boards.scss';


const Boards = () => {
  let [boardsList, setBoardsList] = useState([]);
  let { id } = useParams();
  let { controllersList } = useContext(Context);

  // let filterBoards = (id) => {
  //   let oneBoard = boards.filter(i => i.id === id);

  //   setBoard(oneBoard);
  // };

  useEffect(() => {
    let boards = controllersList.filter(i => i.ip === id)

    setBoardsList(boards)
  }, [])

  return (
    <div>
      <div className="info">
        <h1>BOARDS:</h1>
        <div className="boards">
          {boardsList.length
            ? boardsList.map(cntrl =>
              cntrl.boards.map(board => (
                <div>
                  <span className="choosed-board">
                    BOARD - {board.number}
                  </span>
                  {Object.keys(board.locks).map(lock => (
                    <div>
                      <span> NUMBER - {Object.keys(board.locks)[0]}</span>
                      <div>
                        <span>COMMENT - {board.locks[lock].comment}</span>
                        <button>EDIT COMMENT</button>
                      </div>
                      <div>
                        <span> STATUS - {board.locks[lock].state}</span>
                        <button>OPEN LOCK</button>
                      </div>
                    </div>
                  )
                  )}
                </div>
              )),
            )
            : 'NO BOARDS AND LOCKS'}
        </div>
      </div>
    </div>
  );
};

export default Boards;