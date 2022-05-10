import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CheckLocks from '../../components/CheckLocks'




const Boards = () => {

  const [boards, setBoard] = useState([])
  const { id } = useParams()


  const getBoardfromApi = () => fetch(`https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/${id}`)

  useEffect(() => {
    const getAllControllers = async () => {
      try {
        const getBoard = await getBoardfromApi()
        const result = await getBoard.json()
        setBoard(result)
      }
      catch (error) {
        console.error('error-' + error);
      }
    }
    getAllControllers()
  }, [])

  return (
    <div>
      <div className='info'>
        <div>
          <h1>BOARDS:</h1>
          {boards.length ? boards.map(i => (
            <div>
              <span>NUMBER - {i.floor}</span>
              <div>
                <ul>
                  <li> NUMBER - {i.floor}</li>
                  <li> COMMENT - {i.address}
                    <button>EDIT</button>
                  </li>
                  <li> STATUS - CLOSED</li>
                </ul>
              </div>
            </div>
          )): 'NO BOARDS AND LOCKS'}
        </div>
        <CheckLocks />
      </div>
    </div>
  )

}

export default Boards
