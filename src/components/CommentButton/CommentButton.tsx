import React, { FC } from 'react';
import { Button, Tooltip } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { ILockKeys, LockProps } from '../../types/types';

interface CommentButtonProps {
  lock: ILockKeys;
  setisShowEditInput: (param: boolean) => void;
}

const CommentButton: FC<CommentButtonProps> = ({ lock, setisShowEditInput }) => {
  let commentText: string = `COMMENT - ${lock.comment || 'empty'}`;

  return (
    <div className="lock-description">
      <span className="lock-description__comment">
        {commentText}
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
