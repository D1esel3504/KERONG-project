import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Controllers.scss";
import { Context } from "../../context";
import { Button, Typography, Table } from "antd";

function withParams(Component) {
  return (props) => (
    <Component
      {...props}
      params={useParams()}
      navigate={useNavigate()}
      contextValue={useContext(Context)}
    />
  );
}

class Controllers extends React.Component {
  id = this.props.params;
  navigate = this.props.navigate;
  contextValue = this.props.contextValue;

  goToBoard = (ip) => this.navigate(`/boards/${ip}`);

  componentDidMount() {
    this.contextValue.getControllers();
  }

  columns = [
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "IP",
      dataIndex: "ip",
    },
    {
      title: "Boards",
      render: (boards) => (
        <Button type="primary" danger onClick={() => this.goToBoard(boards.ip)}>
          GO TO THE BOARDS
        </Button>
      ),
    },
  ];

  render() {
    console.log(this.contextValue);
    return (
      <div>
        <div className="info-controller">
          <Typography.Title level={1}>CONTROLLERS:</Typography.Title>
          <div>
            <Table
              columns={this.columns}
              pagination={false}
              dataSource={this.props.contextValue.controllersList}
              bordered
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(Controllers);

// const Controllers = () => {
//   let navigate = useNavigate();
//   let { id } = useParams();
//   let { controllersList, getControllers } = useContext(Context);

//   useEffect(() => {
//     getControllers();
//   }, [])

//   let columns = [
//     {
//       title: 'Number',
//       dataIndex: 'number',
//     },
//     {
//       title: 'IP',
//       dataIndex: 'ip',
//     },
//     {
//       title: 'Boards',
//       render: ((boards) => <Button type="primary" danger onClick={() => goToBoard(boards.ip)}> GO TO THE BOARDS</Button>)
//     },
//   ]

//   let goToBoard = (ip) => navigate(`/boards/${ip}`);

//   return (
//     <div>
//       <div className='info-controller'>
//         <Typography.Title level={1}>CONTROLLERS:</Typography.Title>
//         <div>
//           <Table columns={columns} pagination={false} dataSource={controllersList} bordered />
//         </div>
//       </div>
//     </div>

//   );
// };

// export default Controllers;
