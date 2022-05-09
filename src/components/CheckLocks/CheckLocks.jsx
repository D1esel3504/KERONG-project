import React, { useRef, useState } from 'react'




const CheckLocks = () => {
    const [lock, setLock] = useState([])
    const lockInput = useRef()

    // 620e6b45093f480016037d9a


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

    const requestForLockonServer = (lockNumber) => {
        // const data = {
        //     number,
        //     ip,
        //     boards: [
        //         {
        //             number,
        //             locks: {
        //                 number: {
        //                     state: opened,
        //                     comment,
        //                 }
        //             }
        //         }
        //     ]
        // }
        const data = {
            address: "22222222222222222222222222",
            floor: 333
        }
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
            const result = await requestForLockonServer(lock.id)
            const json = await result.json();
            console.log('Успех:', JSON.stringify(json));
            setLock(json)
        } catch (error) {
            console.error('error-' + error)
        }
    }







    console.log(lock);
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
                    <span> COMMENT - {lock.address}</span>
                    <button onClick={openLockOnServer}>OPEN</button>
                </div>
            ) : ''}
        </div>
    )
}

export default CheckLocks