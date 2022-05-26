import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Lock from '../../components/Lock/Lock';
import { Context } from '../../context';
import { Button, Input, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './Boards.scss';

const Boards = () => {
  let [boardList, setBoardList] = useState([]);
  let [renderedBoardList, setRenderedBoardList] = useState([]);
  let [boardInput, setBoardInput] = useState('');
  let { id } = useParams();
  let { controllersList, updateLockInContext } = useContext(Context);

  useEffect(() => {
    let boards = controllersList.find(controller => controller.ip === id)
      .boards;

    setBoardList(boards);

    if (renderedBoardList.length === 0) {
      setRenderedBoardList(boards);
    }
  }, [controllersList]);

  let filterBoards = numberBoard => {
    let coppiedBoards = [...boardList];

    let filtredBoard = coppiedBoards.filter(board =>
      board.number.toString().includes(numberBoard)
    );

    setRenderedBoardList(filtredBoard);
  };

  return (
    <div>
      <div className="info">
        <Typography.Title level={1}>BOARDS:</Typography.Title>
        <div className="search">
          <Input
            placeholder="THE NUMBER OF BOARD"
            allowClear
            onChange={e => setBoardInput(e.target.value)}
          />
          <Button
            style={{
              marginLeft: '10px'
            }}
            danger
            type="primary"
            onClick={() => filterBoards(boardInput)}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
        </div>
        <div className="boards">
          {renderedBoardList.length
            ? renderedBoardList.map(board => (
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
                        ...board.locks[lock]
                      }}
                      boardNumber={board.number}
                      id={id}
                      setLock={updateLockInContext}
                    />
                  ))}
                </div>
              ))
            : 'NO BOARDS AND LOCKS'}
        </div>
      </div>
    </div>
  );
};

export default Boards;
