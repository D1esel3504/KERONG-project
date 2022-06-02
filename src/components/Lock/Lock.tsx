import React, { FC, useState } from 'react';
import './Lock.scss';
import { Typography } from 'antd';
import EditCommentComponent from '../EditCommentComponent/EditCommentComponent';
import CommentButton from '../CommentButton/CommentButton';
import ChangeStatusButton from '../ChangeStatusButton/ChangeStatusButton';
import { LockProps } from '../../types/types';

const Lock: FC<LockProps> = ({ lock, setLock, id, boardNumber }) => {
  let [isShowEditInput, setisShowEditInput] = useState<boolean>(false);
  

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

  let changeLockInLocalState = (lockNumber: string, data: object, id: string, boardNumber: number) => {
    setLock(lockNumber, data, id, boardNumber);
    setisShowEditInput(false);
  };

  return (
    <>
      {lock && (
        <div className="lock-block">
          <Typography.Title style={{ margin: 0 }} level={5}>
            {` NUMBER - ${lock.lockNumber}`}
          </Typography.Title>
          {isShowEditInput ? (
            <EditCommentComponent
              lock={lock}
              changeLockInLocalState={changeLockInLocalState}
              id={id}
              boardNumber={boardNumber}
              setisShowEditInput={setisShowEditInput}
            />
          ) : (
            <CommentButton
              lock={lock}
              setisShowEditInput={setisShowEditInput}
            />
          )}
          <ChangeStatusButton
            lock={lock}
            changeLockInLocalState={changeLockInLocalState}
            id={id}
            boardNumber={boardNumber}
          />
        </div>
      )}
    </>
  );
};

export default Lock;
