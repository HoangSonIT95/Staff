import React, { useState } from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './Loading';
import { FadeTransform } from 'react-animation-components';

// render lương từng nhân viên
function RenderSalary({ staff }) {
  return (
    <Card className='col-lg-3 col-md-5 m-1'>
      <CardTitle className='m-2'>{staff.name}</CardTitle>
      <CardBody>
        <CardText>Mã Nhân Viên: {staff.id}</CardText>
        <CardText>Hệ Số Lương: {staff.salaryScale}</CardText>
        <CardText>Số Ngày Làm Thêm: {staff.overTime}</CardText>
        <CardText className='bg-light p-2 shadow'>
          Lương: {staff.salary}
        </CardText>
      </CardBody>
    </Card>
  );
}

function Salary(props) {
  let staffList = props.salary.salary;
  const [staffs, setStaffs] = useState({
    staffs: staffList,
  });
  // sắp xếp
  const idDown = () => {
    staffList.sort(function (a, b) {
      return b.id - a.id;
    });
    setStaffs({
      staffs: staffList,
    });
  };
  const idUp = () => {
    staffList.sort(function (a, b) {
      return a.id - b.id;
    });
    setStaffs({
      staffs: staffList,
    });
  };

  const salaryDown = () => {
    staffList.sort(function (a, b) {
      return b.salary - a.salary;
    });
    setStaffs({
      staffs: staffList,
    });
  };

  const salaryUp = () => {
    staffList.sort(function (a, b) {
      return a.salary - b.salary;
    });
    setStaffs({
      staffs: staffList,
    });
  };
  // hiện loading khi fetch data
  if (props.salary.isLoading) {
    return (
      <div className='container '>
        <div className='row'>
          <Loading />
        </div>
      </div>
    );
  }
  // hiện lỗi khi fetch data lỗi
  else if (props.salary.errMess) {
    return (
      <div className='container'>
        <div className='row mt-2'>
          <h3 style={{ color: 'red' }}>{props.salary.errMess}</h3>
        </div>
      </div>
    );
  } else {
    // map từng props truyền vào hàm RenderSalary để render
    const staffSalary = staffs.staffs.map(staff => {
      return <RenderSalary staff={staff} />;
    });

    return (
      <div className='container'>
        <div className='row mt-2'>
          <div className='col-lg-7 col-md-6 col-sm-6'>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to='/nhanvien'>Nhân Viên</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
            </Breadcrumb>
          </div>

          <div className='col-lg-3 col-md-4 col-sm-6'>
            <UncontrolledDropdown className='ml-5' direction='down'>
              <DropdownToggle caret color='primary'>
                Sắp Xếp
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={idUp}>ID tăng dần</DropdownItem>
                <DropdownItem onClick={idDown}>ID giảm dần</DropdownItem>
                <DropdownItem onClick={salaryUp}>Lương tăng dần</DropdownItem>
                <DropdownItem onClick={salaryDown}>Lương giảm dần</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
        <FadeTransform
          in
          transformProps={{
            exitTransform: 'scale(0.2) translateY(-30%)',
          }}
        >
          <div className='row'>{staffSalary}</div>
        </FadeTransform>
      </div>
    );
  }
}

export default Salary;
