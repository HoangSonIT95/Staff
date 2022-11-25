import React from 'react';
import { Card, CardText, CardTitle, CardBody } from 'reactstrap';
import { Loading } from './Loading';
import { FadeTransform } from 'react-animation-components';
import { Link } from 'react-router-dom';

// render từng phòng ban
function RenderDept(props) {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: 'scale(0.2) translateY(30%)',
      }}
    >
      <Link to={`/phongban/${props.dept.id}`}>
        <Card className='mt-3 mb-3'>
          <CardTitle className='m-2 ml-3'>{props.dept.name}</CardTitle>
          <CardBody>
            <CardText>Số Lượng Nhân Viên: {props.numOfStaff.length}</CardText>
          </CardBody>
        </Card>
      </Link>
    </FadeTransform>
  );
}

// nhận dữ liệu từ props fetch api
const Dept = props => {
  // hiển thị loading khi fetch data
  if (props.dept.isLoading) {
    return (
      <div className='container '>
        <div className='row'>
          <Loading />
        </div>
      </div>
    );
  }
  // hiện lỗi khi fetch data lỗi
  else if (props.dept.errMess) {
    return (
      <div className='container'>
        <div className='row mt-2'>
          <h3 style={{ color: 'red' }}>{props.dept.errMess}</h3>
        </div>
      </div>
    );
  } else {
    // map từng phần tử trong props
    const departments = props.dept.dept.map(dept => {
      return (
        <div className='col-lg-4 col-md-5' key={dept.id}>
          {/* truyền từng phần tử vào RenderDept để render */}
          <RenderDept
            dept={dept}
            numOfStaff={props.staffs.filter(
              staff => staff.departmentId === dept.id
            )}
          />
        </div>
      );
    });
    return (
      <div className='container'>
        <div className='row'>{departments}</div>
      </div>
    );
  }
};

export default Dept;
