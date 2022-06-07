import React, { FC } from 'react';
import { Button, Tooltip } from 'antd';
import { UnlockFilled } from '@ant-design/icons';
import { ILockInfo, LockProps, status } from '../../types/types';

interface ChangeStatusButtonProps extends LockProps {
  changeLockState: (lockNumber: string, dataLock: ILockInfo) => void;
}

const ChangeStatusButton: FC<ChangeStatusButtonProps> = ({
  changeLockState,
  lock,
}) => {
  let statusText: string = `STATUS - ${lock.state}`;
  let lockState: status = lock.state.toString() === status.closed ? status.opened : status.closed;

  return (
    <div className="lock-description">
      <span>{statusText}</span>
      <Tooltip title="open lock">
        <Button
          type="primary"
          size="large"
          icon={<UnlockFilled />}
          onClick={() =>
            changeLockState(
              lock.lockNumber,
              {
                ...lock,
                state: lockState,
              }
            )
          }
          danger
        />
      </Tooltip>
    </div>
  );
};

export default ChangeStatusButton;
