import React, { useRef, useState } from 'react';
import Lock from '../Lock/Lock';

const CheckLocks = () => {
    let [lock, setLock] = useState([]);
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
        <div>
            <h4>CHECK LOCK</h4>
            <div>
                <input ref={lockInput} type="text" placeholder='ENTER THE NUMBER' />
                <button onClick={searchLock}>SEARCH</button>
            </div>
            <Lock
             lock={lock}
             setLock={setLock}
            />
        </div>
    );
};

export default CheckLocks;