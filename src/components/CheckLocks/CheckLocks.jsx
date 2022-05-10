import React, { useRef, useState } from 'react'




const CheckLocks = () => {
    const [lock, setLock] = useState([])
    const lockInput = useRef()
    let [commentInputComponent,setCommentInputComponent] = useState ('')
    let [isShowEditInput, setisShowEditInput] = useState(false)

    // 620e6b45093f480016037d9a

    let dataForChangeStatus = {
        ...lock,
        floor: 333
    }

    let dataForChangeComment = {
        ...lock,
        floor: commentInputComponent
    }




    const checkLockOnServer = (lockNumber) => fetch(`https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/${lockNumber}`)


    const searchLock = async () => {
        try {
            if (lockInput.current.value !== '') {
                const result = await checkLockOnServer(lockInput.current.value)
                const json = await result.json()
                setLock(json)
                lockInput.current.value = ''
            }
        }
        catch (error) {
            console.error('error-' + error)
        }

    }

    const requestForLockonServer = (lockNumber,data) => {

        return fetch(`https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/${lockNumber}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlbWFsa2FsYW5kYXJvdkBnbWFpbC5jb20iLCJpZCI6IjYxMDJiOWMxMmFhYTkwMGMwZTI2OGFkZSIsImV4cCI6MTY1NzMxNTM1NSwiaWF0IjoxNjUyMTMxMzU1fQ.c62OU82mCuRHxOZDMDyXaKhm3LYXS7kvywUXXfiMH2M`,
            }
        })
    }


    const openLockOnServer = async () => {
        try {
            const result = await requestForLockonServer(lock.id,dataForChangeStatus)
            const json = await result.json();
            console.log('Success:', JSON.stringify(json));
            setLock(json)
        } catch (error) {
            console.error('error-' + error)
        }
    }

    const changeCommentOnServer = async () => {
        try {
            const result = await requestForLockonServer(lock.id,dataForChangeComment)
            const json = await result.json();
            console.log('Success:', JSON.stringify(json));
            setLock(json)
            setisShowEditInput(false)
        } catch (error) {
            console.error('error-' + error)
        }
    }


    let changeComment = (e) => {
        setisShowEditInput(true)
    }

    let cancelEditComment = (e) => {
        setisShowEditInput(false)
    }

    return (
        <div>
            <h1>CHECK LOCK</h1>
            <div>
                <input ref={lockInput} type="text" placeholder='ENTER THE NUMBER' />
                <button onClick={searchLock}>SEARCH</button>
            </div>
            {lock.length !== 0 ? (
                <div>
                    <span> NUMBER - {lock.floor}</span>
                    {isShowEditInput ? (
                        <div>
                            <input onChange={(e) => setCommentInputComponent(e.target.value)} type="text" placeholder='ENTER THE COMMENT' />
                            <button onClick={changeCommentOnServer}>SAVE COMMENT</button>
                            <button onClick={cancelEditComment}>CANCEL</button>
                        </div>
                    ) : (<div>
                        <span>COMMENT - {lock.floor}</span>
                        <button onClick={changeComment}>EDIT COMMENT</button>
                    </div>)}
                    <div>
                        <span>STATUS - CLOSED</span>
                        <button onClick={openLockOnServer}>OPEN LOCK</button>
                    </div>
                </div>
            ) : 'LOCK NOT FOUND'}
        </div>
    )
}

export default CheckLocks