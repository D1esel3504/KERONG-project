import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Lock from '../../components/Lock/Lock'
import { Context } from '../../context'
import { Button, Input, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './Boards.scss'

const Boards = () => {
  let [boardList, setBoardList] = useState([])
  let [temp, setTemp] = useState([])
  let [boardInput, setBoardInput] = useState('')
  let { id } = useParams()
  let { controllersList } = useContext(Context)

  useEffect(() => {
    let controller = controllersList.filter((i) => i.ip === id)

    let boards = controller.reduce((acc, curr) => {
      return [...acc, ...curr.boards]
    }, [])

    setBoardList(boards)

    setTemp(boards)
  }, [])

  let filterBoards = (numberBoard) => {
    let tempBoards = [...boardList]

    let filtredBoard = tempBoards.filter((i) =>
      i.number.toString().includes(numberBoard),
    )

    setTemp(filtredBoard)
  }

  let setLastModifications = (index, lockNumber, data) => {
    let changedArr = [...temp];

    let changedLock = {
      ...changedArr[index].locks[lockNumber],
      ...data
    }

    changedArr.splice(index, 1, {
      ...changedArr[index],
      locks: {
        ...changedArr[index].locks,
        [lockNumber]: {
          ...changedLock
        },
      },
    })

    setTemp(changedArr);
    setBoardList(changedArr)
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
            ? temp.map((board, index) => (
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
                    index={index}
                    setLock={setLastModifications}
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