import React from 'react';
import { Button, Tooltip } from 'antd';
import { EditFilled } from '@ant-design/icons';

const CommentButton = ({ lock, setisShowEditInput }) => {
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
