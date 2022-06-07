import React, { FC, useState } from 'react';
import './Lock.scss';
import { Typography } from 'antd';
import EditCommentComponent from '../EditCommentComponent/EditCommentComponent';
import CommentButton from '../CommentButton/CommentButton';
import ChangeStatusButton from '../ChangeStatusButton/ChangeStatusButton';
import { LockProps, ILockInfo } from '../../types/types';
import axios from 'axios';

interface LockComponentProps extends LockProps {
  onStateSubmitted: (data: ILockInfo) => void;
}

const Lock: FC<LockComponentProps> = ({ lock, onStateSubmitted }) => {
  let [isShowEditInput, setisShowEditInput] = useState<boolean>(false);

  let changeLockState = async (lockNumber: string, dataLock: ILockInfo) => {
    // try {
    //   await axios({
    //     method: 'put',
    //     url: `https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/${lockNumber}`,
    //     data: dataLock,
    //   })
    //     .then((res) => {
    //       let result = res.data
    //       console.log(result);

    //       onCommentSubmitted(dataLock)


    //       setisShowEditInput(false);
    //     })
    // } catch (error) {
    //   console.log(error);
    // }

    onStateSubmitted(dataLock)
    setisShowEditInput(false);
  }

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
              changeLockState={changeLockState}
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
            changeLockState={changeLockState}
          />
        </div>
      )}
    </>
  );
};

export default Lock;
