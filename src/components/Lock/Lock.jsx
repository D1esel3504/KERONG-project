import React, { useState } from 'react'

const Lock = ({ setLock, lock }) => {

    let [commentInputComponent, setCommentInputComponent] = useState('');
    let [isShowEditInput, setisShowEditInput] = useState(false);

    let dataForChangeStatus = {
        ...lock,
        floor: 333,
        // state: opened,
    };

    let dataForChangeComment = {
        ...lock,
        floor: commentInputComponent,
        // comment: commentInputComponent,
    };


    let requestForLockonServer = (lockNumber, data) => {
        return fetch(`https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/${lockNumber}`,
            {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlbWFsa2FsYW5kYXJvdkBnbWFpbC5jb20iLCJpZCI6IjYxMDJiOWMxMmFhYTkwMGMwZTI2OGFkZSIsImV4cCI6MTY1NzMxNTM1NSwiaWF0IjoxNjUyMTMxMzU1fQ.c62OU82mCuRHxOZDMDyXaKhm3LYXS7kvywUXXfiMH2M`,
                },
            });
    };

    let openLockOnServer = async () => {
        try {
            let result = await requestForLockonServer(lock.id, dataForChangeStatus);
            let json = await result.json();

            console.log('Success:', JSON.stringify(json));

            setLock(json);

        } catch (error) {
            console.error('error-' + error);
        };
    };

    let changeCommentOnServer = async () => {
        try {
            let result = await requestForLockonServer(lock.id, dataForChangeComment)
            let json = await result.json();

            console.log('Success:', JSON.stringify(json));

            setLock(json);

            setisShowEditInput(false);

        } catch (error) {
            console.error('error-' + error);
        };
    };
    console.log(lock);
    return (
        <>
            {lock.map(lock => (
                <div>
                    <span> NUMBER - {lock.lockNumber}</span>
                    {isShowEditInput ? (
                        <div>
                            <input onChange={(e) => setCommentInputComponent(e.target.value)} type="text" placeholder='ENTER THE COMMENT' />
                            <button onClick={changeCommentOnServer}>SAVE COMMENT</button>
                            <button onClick={() => setisShowEditInput(false)}>CANCEL</button>
                        </div>
                    ) : (<div>
                        <span>COMMENT - {lock.comment}</span>
                        <button onClick={() => setisShowEditInput(true)}>EDIT COMMENT</button>
                    </div>)}
                    <div>
                        <span>STATUS - {lock.state}</span>
                        <button onClick={openLockOnServer}>OPEN LOCK</button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Lock;
