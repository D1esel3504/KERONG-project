import React, { FC } from 'react';
import { Button, Tooltip } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { LockProps } from '../../types/types';

interface CommentButtonProps extends LockProps {
  setisShowEditInput: Function;
}

const CommentButton: FC<CommentButtonProps> = ({ lock, setisShowEditInput }) => {
  return (
    <div className="lock-description">
      <span className="lock-description__comment">
        COMMENT - {lock.comment || 'empty'}
      </span>
      <Tooltip title="edit comment">
        <Button
          type="primary"
          size="large"
          onClick={() => setisShowEditInput(true)}
          icon={<EditFilled />}
          danger
        />
      </Tooltip>
    </div>
  );
};

export default CommentButton;
