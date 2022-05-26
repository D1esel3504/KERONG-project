import React, { useState } from 'react';
import { Input, Button, Tooltip } from 'antd';
import { SaveFilled, CloseCircleFilled } from '@ant-design/icons';

const EditCommentComponent = ({
  changeLockInLocalState,
  lock,
  id,
  boardNumber,
  setisShowEditInput,
}) => {
  let [commentInputComponent, setCommentInputComponent] = useState('');

  return (
    <div className="lock-description">
      <Input
        placeholder="ENTER THE COMMENT"
        allowClear
        onChange={e => setCommentInputComponent(e.target.value)}
        size="small"
      />
      <div className="lock-description__buttons">
        <Tooltip title="save comment">
          <Button
            size="large"
            type="primary"
            onClick={() =>
              changeLockInLocalState(
                lock.lockNumber,
                {
                  ...lock,
                  comment: commentInputComponent,
                },
                id,
                boardNumber,
              )
            }
            icon={<SaveFilled />}
            danger
          />
        </Tooltip>
        <Tooltip title="close">
          <Button
            size="large"
            type="primary"
            onClick={() => setisShowEditInput(false)}
            icon={<CloseCircleFilled />}
            danger
            style={{
              marginLeft: '5px',
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default EditCommentComponent;
