import React, { useState } from 'react'
import './Lock.scss'
import { Button, Input, Typography, Tooltip } from 'antd'
import {
    UnlockFilled,
    EditFilled,
    SaveFilled,
    CloseCircleFilled,
} from '@ant-design/icons'

const Lock = ({ lock, setLock, index }) => {
    let [commentInputComponent, setCommentInputComponent] = useState('')
    let [isShowEditInput, setisShowEditInput] = useState(false)

    // let requestForLockonServer = (lockNumber, data) => {
    //     return fetch(`https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/${lockNumber}`,
    //         {
    //             method: 'PUT',
    //             body: JSON.stringify(data),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: Token `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlbWFsa2FsYW5kYXJvdkBnbWFpbC5jb20iLCJpZCI6IjYxMDJiOWMxMmFhYTkwMGMwZTI2OGFkZSIsImV4cCI6MTY1NzMxNTM1NSwiaWF0IjoxNjUyMTMxMzU1fQ.c62OU82mCuRHxOZDMDyXaKhm3LYXS7kvywUXXfiMH2M`,
    //             },
    //         });
    // };

    // let openLockOnServer = async () => {
    //     try {
    //         let result = await requestForLockonServer(lock.id, dataForChangeStatus);
    //         let json = await result.json();

    //         console.log('Success:', JSON.stringify(json));

    //         setLock(json);

    //     } catch (error) {
    //         console.error('error-' + error);
    //     };
    // };

    // let changeCommentOnServer = async () => {
    //     try {
    //         let result = await requestForLockonServer(lock.id, dataForChangeComment)
    //         let json = await result.json();

    //         console.log('Success:', JSON.stringify(json));

    //         setLock(json);

    //         setisShowEditInput(false);

    //     } catch (error) {
    //         console.error('error-' + error);
    //     };
    // };

    let changeLockInLocalState = (index, lockNumber, data) => {
        setLock(index, lockNumber, data)
        setisShowEditInput(false)
    }

    return (
        <>
            {lock && (
                <div className="lock-block">
                    <Typography.Title style={{ margin: 0 }} level={5}>
                        NUMBER - {lock.lockNumber}
                    </Typography.Title>
                    {isShowEditInput ? (
                        <div className="lock-description">
                            <Input
                                placeholder="ENTER THE COMMENT"
                                allowClear
                                onChange={(e) => setCommentInputComponent(e.target.value)}
                                size="small"
                            />
                            <div className="lock-description__buttons">
                                <Tooltip title="save comment">
                                    <Button
                                        size="large"
                                        type="primary"
                                        onClick={() =>
                                            changeLockInLocalState(index, lock.lockNumber, {
                                                ...lock,
                                                comment: commentInputComponent,
                                            })}
                                        icon={<SaveFilled />}
                                        danger
                                    ></Button>
                                </Tooltip>
                                <Tooltip title="close">
                                    <Button
                                        size="large"
                                        type="primary"
                                        onClick={() => setisShowEditInput(false)}
                                        icon={<CloseCircleFilled />}
                                        danger
                                        style={{
                                            marginLeft: '5px',
                                        }}
                                    ></Button>
                                </Tooltip>
                            </div>
                        </div>
                    ) : (
                        <div className="lock-description">
                            <span className="lock-description__comment"> COMMENT - {lock.comment || 'empty'}</span>
                            <Tooltip title="edit comment">
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={() => setisShowEditInput(true)}
                                    icon={<EditFilled />}
                                    danger
                                ></Button>
                            </Tooltip>
                        </div>
                    )}
                    <div className="lock-description">
                        <span> STATUS - {lock.state}</span>
                        <Tooltip title="open lock">
                            <Button
                                type="primary"
                                size="large"
                                icon={<UnlockFilled />}
                                onClick={() =>
                                    changeLockInLocalState(index, lock.lockNumber, {
                                        ...lock,
                                        state: lock.state === 'closed' ? 'opened' : 'closed',
                                    })
                                }
                                danger
                            ></Button>
                        </Tooltip>
                    </div>
                </div>
            )}
        </>
    )
}

export default Lock