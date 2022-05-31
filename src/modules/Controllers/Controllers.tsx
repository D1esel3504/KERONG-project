import React, { useEffect, useContext, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './Controllers.scss';
import { Context } from '../../context';
import { Button, Typography, Table } from 'antd';

const Controllers: FC = () => {
  let navigate = useNavigate();
  let { controllersList, getControllers } = useContext(Context);

  useEffect(() => {
    getControllers();
  }, []);

  let columns: any[] = [
    {
      title: 'Number',
      dataIndex: 'number'
    },
    {
      title: 'IP',
      dataIndex: 'ip'
    },
    {
      title: 'Boards',
      render: (boards: any) => (
        <Button type="primary" danger onClick={() => goToBoard(boards.ip)}>
          GO TO THE BOARDS
        </Button>
      )
    }
  ];

  let goToBoard = (ip: string): void => navigate(`/boards/${ip}`);

  return (
    <div>
      <div className="info-controller">
        <Typography.Title level={1}>CONTROLLERS:</Typography.Title>
        <div>
          <Table
            columns={columns}
            pagination={false}
            dataSource={controllersList}
            bordered
          />
        </div>
      </div>
    </div>
  );
};

export default Controllers;
