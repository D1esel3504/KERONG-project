import React, { useState, FC } from 'react';
import { Input, Button, Tooltip } from 'antd';
import { SaveFilled, CloseCircleFilled } from '@ant-design/icons';
import { ILockInfo, LockProps } from '../../types/types';

interface EditCommentComponentProps extends LockProps {
  setisShowEditInput: (param: boolean) => void;
  changeLockInLocalState: (lockNumber: string, dataLock: ILockInfo, id: string, boardNumber: string) => void;
}

const EditCommentComponent: FC<EditCommentComponentProps> = ({
  changeLockInLocalState,
  lock,
  id,
  boardNumber,
  setisShowEditInput,
}) => {
  let [commentInputComponent, setCommentInputComponent] = useState<string>('');

  return (
    <div className="lock-description">
      <Input
        placeholder="ENTER THE COMMENT"
        allowClear
        onChange={e => setCommentInputComponent(e.target.value)}
        size="small"
        defaultValue={lock.comment}
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
