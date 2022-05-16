import React, { useRef, useState } from 'react';
import './CheckLocks.scss';
import Lock from '../Lock/Lock';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const CheckLocks = () => {
    let [lock, setLock] = useState(null);
    let lockInput = useRef();

    let checkLockOnServer = (lockNumber) => fetch(`https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/${lockNumber}`);

    let searchLock = async () => {
        try {
            if (lockInput.current.value !== '') {
                let result = await checkLockOnServer(lockInput.current.value);
                let json = await result.json();

                setLock(json);

                lockInput.current.value = '';

            }
        } catch (error) {
            console.error('error-' + error);
        }
    };

    return (
        <div className='block'>
            <strong>CHECK LOCK</strong>
            <div className='search'>
                <Input
                    ref={lockInput}
                    placeholder='ENTER THE NUMBER'
                    allowClear
                />
                <Button
                    style={{
                        marginLeft: '10px'
                    }}
                    danger
                    type="primary"
                    onClick={searchLock}
                    icon={<SearchOutlined />}>
                    Search
                </Button>
            </div>
            <Lock
                lock={lock}
                setLock={setLock}
            />
        </div>
    );
};

export default CheckLocks;