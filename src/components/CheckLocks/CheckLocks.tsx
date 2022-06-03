import React, { FC, useState } from 'react';
import './CheckLocks.scss';
import Lock from '../Lock/Lock';
import { Modal, Button, Input, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ILock } from '../../types/types';
import axios from 'axios';

const CheckLocks: FC = () => {
  let [lock, setLock] = useState<ILock | null>(null);
  let [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  let [lockInput, setLockInput] = useState<string>('');
  let [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  let [showError, setShowError] = useState<string>('');

  let showModal = (): void => {
    setIsModalVisible(true);
  };

  let handleOk = (): void => {
    setIsModalVisible(false);
  };

  let handleCancel = (): void => {
    setIsModalVisible(false);
  };

  let searchLock = async (lockNumber: string) => {
    try {
      await axios.get<ILock>(
        `https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/${lockNumber}`)
        .then(res => {
          let result = res.data;
          setLock(result);

          showModal();

          lockInput = '';
        })
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        setShowError(error.message)
        setIsShowAlert(true);
        throw error;
      }
    }
  }

  let handleCommentSubmitted = () => {
    showModal()
  }

  let handleOpened = () => {
    showModal()
  }

  return (

    <div className="block">
      <strong>CHECK LOCK</strong>
      <div className="search">
        <Input
          onChange={e => setLockInput(e.target.value)}
          placeholder="ENTER THE NUMBER"
          allowClear
        />
        <Button
          style={{
            marginLeft: '10px'
          }}
          danger
          type="primary"
          onClick={() => searchLock(lockInput)}
          icon={<SearchOutlined />}
        >
          Search
        </Button>
      </div>
      {isShowAlert && (
        <Alert
          message="Error"
          description={showError}
          type="error"
          showIcon
          closable
        />
      )}
      <Modal
        title={`LOCK - ${lockInput}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {lock !== null && <Lock lock={{
          lockNumber: lock.number,
          state: lock.state,
          comment: lock.comment
        }}
          onCommentSubmitted={handleCommentSubmitted}
          onLockOpened={handleOpened}
        />}
      </Modal>
    </div>
  );
};

export default CheckLocks;
