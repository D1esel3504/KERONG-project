import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Lock from '../../components/Lock/Lock'
import { Context } from '../../context'
import { Button, Input, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './Boards.scss'


const Boards = () => {
  let [boardList, setBoardList] = useState([]);
  let [temp, setTemp] = useState([]);
  let [boardInput, setBoardInput] = useState('');
  let { id } = useParams();
  let { controllersList, updateLockInContext } = useContext(Context);

  useEffect(() => {
    let boards = controllersList.find((i) => i.ip === id).boards;

    setBoardList(boards)

    if (temp.length === 0) {
      setTemp(boards)
    }

  }, [controllersList])

  let filterBoards = (numberBoard) => {
    let tempBoards = [...boardList]

    let filtredBoard = tempBoards.filter((i) => i.number.toString().includes(numberBoard))

    setTemp(filtredBoard)
  }

  return (
    <div>
      <div className="info">
        <Typography.Title level={1}>BOARDS:</Typography.Title>
        <div className="search">
          <Input
            placeholder="THE NUMBER OF BOARD"
            allowClear
            onChange={(e) => setBoardInput(e.target.value)}
          />
          <Button
            style={{
              marginLeft: '10px',
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
          {temp.length
            ? temp.map((board) => (
              <div>
                <span
                  onClick={() => filterBoards(board.number)}
                  className="choosed-board"
                >
                  BOARD - {board.number}
                </span>
                {Object.keys(board.locks).map((lock) => (
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
            ))
            : 'NO BOARDS AND LOCKS'}
        </div>
      </div>
    </div>
  )
}

export default Boards