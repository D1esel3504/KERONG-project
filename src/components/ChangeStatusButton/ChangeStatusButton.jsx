import React from 'react';
import { Button, Tooltip } from 'antd';
import { UnlockFilled } from '@ant-design/icons';

const ChangeStatusButton = ({
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
                state: lock.state === 'closed' ? 'opened' : 'closed',
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
