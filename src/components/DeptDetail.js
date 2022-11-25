import React from 'react';
import { Card, CardImg, CardBody, CardTitle, Breadcrumb } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FadeTransform } from 'react-animation-components';
import { Loading } from './Loading';

// render staff in department
function RenderStaffInDept({ staffInDept }) {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: 'scale(0.2) translateY(-50%)',
      }}
    >
      <Card className='mt-2'>
        <CardBody className='border border-success'>
          <Link to={`/nhanvien/${staffInDept.id}`}>
            <CardImg src={staffInDept.image} alt={staffInDept.name} />
            <CardTitle className='text-center mt-1'>
              {staffInDept.name}
            </CardTitle>
          </Link>
        </CardBody>
      </Card>
    </FadeTransform>
  );
}

// fetch api data staffs in department
function StaffsInDept(props) {
  // hiển thị loading khi fetch data
  if (props.staffsInDept.isLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <Loading />
        </div>
      </div>
    );
  }
  // hiện lỗi khi fetch data lỗi
  else if (props.staffsInDept.errMess) {
    return (
      <div className='container'>
        <div className='row mt-2'>
          <h3 style={{ color: 'red' }}>{this.props.staffs.errMess}</h3>
        </div>
      </div>
    );
  }
  // hiện thông báo khi k có nhân viên nào
  else if (props.staffsInDept.staffsInDept.length === 0) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <Breadcrumb>
              <h6>
                Danh Sách Nhân Viên Trong Phòng Ban{' '}
                {props.dept.find(dept => dept.id === props.deptId).name}
              </h6>
            </Breadcrumb>
          </div>
          <h3 style={{ color: 'red' }}>
            Không có nhân viên nào trong phòng ban
          </h3>
        </div>
      </div>
    );
  }
  // hiện danh sách nhân viên
  else {
    const staffsInDept = props.staffsInDept.staffsInDept.map(staff => {
      return (
        <div className='col-lg-2 col-md-4 col-6' key={staff.id}>
          <RenderStaffInDept staffInDept={staff} />
        </div>
      );
    });
    return (
      <div className='container'>
        <div className='col-12'>
          <Breadcrumb>
            <h6>
              Danh Sách Nhân Viên Trong Phòng Ban{' '}
              {props.dept.find(dept => dept.id === props.deptId).name}
            </h6>
          </Breadcrumb>
        </div>
        <div className='row'>{staffsInDept}</div>
      </div>
    );
  }
}

export default StaffsInDept;
