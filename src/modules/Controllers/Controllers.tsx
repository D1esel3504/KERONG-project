import React, { useEffect, useContext, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './Controllers.scss';
import { Context } from '../../context';
import { Button, Typography, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { IController } from 'types/types';

const Controllers: FC = () => {
  let navigate = useNavigate();
  let { controllersList, getAllControllers } = useContext(Context);

  useEffect(() => {
    getAllControllers();
  }, []);

  let columns: ColumnsType<IController> = [
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
      render: (controller: any) => (
        <Button type="primary" danger onClick={() => goToBoard(controller.number)}>
          GO TO THE BOARDS
        </Button>
      )
    }
  ];

  let goToBoard = (controllerNumber: string): void => navigate(`controllers/${controllerNumber}/boards/`);

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
            rowKey='ip'
          />
        </div>
      </div>
    </div>
  );
};

export default Controllers;
