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

  // let checkLockOnServer = (lockNumber: string): Promise<any> =>
  //   fetch(
  //     `https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/${lockNumber}`
  //   );

  // let searchLock = async (): Promise<any> => {
  //   try {
  //     if (lockInput !== '') {
  //       let result = await checkLockOnServer(lockInput);
  //       let json = await result.json();

  //       setLock(json);

  //       showModal();

  //       lockInput = '';
  //     }
  //   } catch (error) {
  //     setIsShowAlert(true);
  //   }
  // };

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
      setShowError(error.message)
      setIsShowAlert(true);
    }
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
        <Lock lock={lock} setLock={setLock} />
      </Modal>
    </div>
  );
};

export default CheckLocks;
