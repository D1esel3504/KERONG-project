import React, { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../context';
import { Button, Input, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './Boards.scss';
import { IBoard, IController } from '../../types/types';
import BoardsItem from '../../components/BoardsItem/BoardsItem'

type PropsParams = {
  controllerNumber: string;
};

const Boards: FC = () => {
  let [boardList, setBoardList] = useState<IBoard[]>([]);
  let [renderedBoardList, setRenderedBoardList] = useState<IBoard[]>([]);
  let [boardInput, setBoardInput] = useState<string>('');
  let { controllerNumber = '' } = useParams<PropsParams>();
  let { controllersList, updateLockInContext } = useContext(Context);

  useEffect(() => {
    let boards = controllersList.find((controller: IController, index: number) => String(index) === controllerNumber)
      .boards;

    setBoardList(boards);

    if (renderedBoardList.length === 0) {
      setRenderedBoardList(boards);
    }

  }, [controllersList]);

  let filterBoards = (numberBoard: string): void => {
    let coppiedBoards = [...boardList];

    let filtredBoards = coppiedBoards.filter((board: IBoard) =>
      board.number.toString().includes(numberBoard)
    );

    setRenderedBoardList(filtredBoards);
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
              <BoardsItem
                board={board}
                key={board.number}
                controllerNumber={controllerNumber}
                filterBoards={filterBoards}
                updateLockInContext={updateLockInContext}
              />
            ))
            : 'NO BOARDS AND LOCKS'}
        </div>
      </div>
    </div>
  );
};

export default Boards;
