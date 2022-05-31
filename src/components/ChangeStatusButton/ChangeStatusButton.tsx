import React, { FC } from 'react';
import { Button, Tooltip } from 'antd';
import { UnlockFilled } from '@ant-design/icons';
import { LockProps, status } from '../../types/types';

interface ChangeStatusButtonProps extends LockProps {
  changeLockInLocalState: Function,
  children?: React.ReactNode
}

const ChangeStatusButton: FC<ChangeStatusButtonProps> = ({
  changeLockInLocalState,
  lock,
  id,
  boardNumber,
}) => {

  return (
    <div className="lock-description">
      <span> STATUS - {lock.state}</span>
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
                state: lock.state=== status.closed ? status.opened : status.closed,
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
