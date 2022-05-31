import React, { FC } from 'react';
import { Button, Tooltip } from 'antd';
import { UnlockFilled } from '@ant-design/icons';
import { LockProps, status } from '../../types/types';

interface ChangeStatusButtonProps extends LockProps {
  changeLockInLocalState: Function,
}

const ChangeStatusButton: FC<ChangeStatusButtonProps> = ({
  changeLockInLocalState,
  lock,
  id,
  boardNumber,
}) => {
  let statusText: string = `STATUS - ${lock.state}`;
  let lockState: string = lock.state.toString() === status.closed ? status.opened : status.closed;

  return (
    <div className="lock-description">
      <span>{statusText}</span>
      <Tooltip title="open lock">
        <Button
          type="primary"
          size="large"
          icon={<UnlockFilled />}
          onClick={() =>
            changeLockInLocalState(
              lock.lockNumber,
              {
                ...lock,
                state: lockState,
              },
              id,
              boardNumber,
            )
          }
          danger
        />
      </Tooltip>
    </div>
  );
};

export default ChangeStatusButton;
