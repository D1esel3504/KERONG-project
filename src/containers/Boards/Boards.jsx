import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckLocks from '../../components/CheckLocks';

const Boards = () => {
  let [boards, setBoard] = useState([]);
  let { id } = useParams();

  let getBoardfromApi = () => fetch(`https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/${id}`);

  useEffect(() => {
    let getAllControllers = async () => {

      try {
        let getBoard = await getBoardfromApi();
        let result = await getBoard.json();

        setBoard(result);
      } catch (error) {
        console.error('error-' + error);
      }
    }

    getAllControllers();

  }, []);

  let filterBoards = (id) => {
    let oneBoard = boards.filter(i => i.id === id);

    setBoard(oneBoard);
  };

  console.log(boards);

  return (
    <div>
      <div className='info'>
        <div>
          <h1>BOARDS:</h1>
          {boards.length ? boards.map(i => (
            <div onClick={() => filterBoards(i.id)}>
              <span>NUMBER - {i.floor}</span>
              <div>
                <span> NUMBER - {i.floor}</span>
                <div>
                  <span>COMMENT - {i.address}</span>
                  <button>EDIT COMMENT</button>
                </div>
                <div>
                  <span> STATUS - CLOSED</span>
                  <button>OPEN LOCK</button>
                </div>


              </div>
            </div>
          )) : 'NO BOARDS AND LOCKS'}
        </div>
        <CheckLocks />
      </div>
    </div >
  );
};

export default Boards;
