import React, { useState } from 'react';
import './CheckLocks.scss';
import Lock from '../Lock/Lock';
import { Modal, Button, Input, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const CheckLocks = () => {
  let [lock, setLock] = useState(null);
  let [isModalVisible, setIsModalVisible] = useState(false);
  let [lockInput, setLockInput] = useState('');
  let [isShowAlert, setIsShowAlert] = useState(false);

  let showModal = () => {
    setIsModalVisible(true);
  };

  let handleOk = () => {
    setIsModalVisible(false);
  };

  let handleCancel = () => {
    setIsModalVisible(false);
  };

  let checkLockOnServer = lockNumber =>
    fetch(
      `https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/${lockNumber}`,
    );

  let searchLock = async () => {
    try {
      if (lockInput !== '') {
        let result = await checkLockOnServer(lockInput);
        let json = await result.json();

        setLock(json);

        showModal();

        lockInput = '';
      }
    } catch (error) {
      setIsShowAlert(true);
    }
  };

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
            marginLeft: '10px',
          }}
          danger
          type="primary"
          onClick={searchLock}
          icon={<SearchOutlined />}
        >
          Search
        </Button>
      </div>
      {isShowAlert && (
        <Alert
          message="Error"
          description="SERVER ERROR"
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
        <Lock lock={lock} setLock={setLock} />
      </Modal>
    </div>
  );
};

export default CheckLocks;
