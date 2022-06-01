import React, { FC, useState } from 'react';
import './Lock.scss';
import { Typography } from 'antd';
import EditCommentComponent from '../EditCommentComponent/EditCommentComponent';
import CommentButton from '../CommentButton/CommentButton';
import ChangeStatusButton from '../ChangeStatusButton/ChangeStatusButton';
import { ILock, LockProps } from '../../types/types';
import axios from 'axios';

const Lock: FC<LockProps> = ({ lock, setLock, id, boardNumber }) => {
  let [isShowEditInput, setisShowEditInput] = useState<boolean>(false);

  // let changeLockInLocalState = async (lockNumber: string, dataLock: object) => {
  //   try {
  //     await axios({
  //       method: 'put',
  //       url: `https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/${lockNumber}`,
  //       data: dataLock,
  //     })
  //       .then((res) => {
  //         let result = res.data

  //         setLock(result);
  //         setisShowEditInput(false);
  //       })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  let changeLockInLocalState = (lockNumber: string, dataLock: object, id: string, boardNumber: number) => {
    setLock(lockNumber, dataLock, id, boardNumber);
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
