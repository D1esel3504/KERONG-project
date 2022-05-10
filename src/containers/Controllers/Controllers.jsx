import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import CheckLocks from '../../components/CheckLocks'
import './Controllers.css';


const Controllers = () => {
  const [controllers, SetControllers] = useState([])
  const navigate = useNavigate()
  const { id } = useParams()

  const getAllControllersfromApi = () => fetch('https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/')

  useEffect(() => {
    const getAllControllers = async () => {
      try {
        const getControllers = await getAllControllersfromApi()
        const result = await getControllers.json()
        SetControllers(result)
      }
      catch (error) {
        console.error('error-' + error);
      }
    }
    getAllControllers()
  }, [])

  const goToBoard = (id) => navigate(`/boards/${id}`)

  return (
    <div>
      <div className='info'>
        <div>
          <h1>CONTROLLERS:</h1>
          {controllers && controllers.map(i => (
            <ul>
              <li>NUMBER - {i.floor}</li>
              <li>IP - {i.id}</li>
              <button onClick={() => goToBoard(i.id)}>GO TO THE BOARD</button>
            </ul>
          ))}
        </div>
        <CheckLocks />
      </div>
    </div>
  )
}


export default Controllers
