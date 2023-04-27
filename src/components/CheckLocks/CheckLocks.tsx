import React, { FC, useState } from 'react';
import './CheckLocks.scss';
import Lock from '../Lock/Lock';
import { Modal, Button, Input, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ILockKeys } from '../../types/types';
import axios from 'axios';

const CheckLocks: FC = () => {
  let [lock, setLock] = useState<ILockKeys | null>(null);
  let [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  let [lockInput, setLockInput] = useState<string>('');
  let [isShowAlertErorr, setIsShowAlertError] = useState<boolean>(false);
  let [showError, setShowError] = useState<string>('');
  let [isShowAlertSuccess, setIsShowAlertSuccess] = useState<boolean>(false);

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
      await axios.get<ILockKeys>(
        `https://jsonplaceholder.typicode.com/user/${lockNumber}`)
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
        setIsShowAlertError(true);
        throw error;
      }
    }
  }

  let handleChangeLockState = (): void => {
    setIsShowAlertSuccess(true)
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
      {isShowAlertErorr && (
        <Alert
          message="Error"
          description={showError}
          type="error"
          showIcon
          closable
        />
      )}
      {isShowAlertSuccess && (
        <Alert
          message="Success"
          description="Сhanges successfully saved"
          type="success"
          showIcon
        />
      )}
      <Modal
        title={`LOCK - ${lockInput}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {lock !== null && <Lock lock={{
          lockNumber: lock.lockNumber,
          state: lock.state,
          comment: lock.comment
        }}
          onStateSubmitted={handleChangeLockState}
        />}
      </Modal>
    </div>
  );
};

export default CheckLocks;
