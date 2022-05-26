import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Controllers.scss';
import { Context } from '../../context';
import { Button, Typography, Table } from 'antd';

const Controllers = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let { controllersList, getControllers } = useContext(Context);

  useEffect(() => {
    getControllers();
  }, []);

  let columns = [
    {
      title: 'Number',
      dataIndex: 'number',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
    },
    {
      title: 'Boards',
      render: boards => (
        <Button type="primary" danger onClick={() => goToBoard(boards.ip)}>
          {' '}
          GO TO THE BOARDS
        </Button>
      ),
    },
  ];

  let goToBoard = ip => navigate(`/boards/${ip}`);

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
