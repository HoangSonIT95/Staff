import React, { useState } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Col,
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import { FadeTransform } from 'react-animation-components';

// điều kiện validate form sửa thông tin
const required = val => val && val.toString().length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;
const isNumber = val => !isNaN(Number(val));

// render ảnh nhân viên
function RenderImg({ staff }) {
  return (
    <div className='col-12 col-lg-3 col-md-4 col-sm-12'>
      <Card>
        <CardImg src={staff.image} alt={staff.name} />
      </Card>
    </div>
  );
}

// render thông tin nhân viên
function RenderDescription({ staff, dept }) {
  return (
    <div className='col-12 col-lg-9 col-md-8 col-sm-12'>
      <CardBody className='card-taolao'>
        <CardTitle>Họ và tên: {staff.name}</CardTitle>
        <CardText>Ngày sinh: {dateFormat(staff.doB, 'dd/mm/yyyy')}</CardText>
        <CardText>
          Ngày vào công ty: {dateFormat(staff.startDate, 'dd/mm/yyyy')}
        </CardText>
        <CardText>
          Phòng ban: {dept.find(dept => dept.id === staff.departmentId).name}
        </CardText>
        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
      </CardBody>
    </div>
  );
}

function StaffDetail(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  // xử lý sửa thông tin nhân viên
  const handleUpdateStaff = value => {
    // lấy dữ liệu từ form đưa vào biến mới
    const updateStaff = {
      id: props.staff.id,
      name: value.name,
      doB: value.doB,
      salaryScale: value.salaryScale,
      startDate: value.startDate,
      departmentId: props.dept.find(dept => dept.name === value.department).id,
      annualLeave: value.annualLeave,
      overTime: value.overTime,
      image: '/assets/images/alberto.png',
      salary: (value.salaryScale * 3000000 + value.overTime * 200000).toFixed(
        0
      ),
    };
    toggleModal();
    props.updateStaff(updateStaff); // truyền biến vào callback từ props post lên api
  };
  if (props.staff && props.dept.length) {
    return (
      <div className='container'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/nhanvien'>Nhân Viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12 row mb-3'>
            <h3 className='col-4'>{props.staff.name}</h3>
            <Button onClick={toggleModal} className='btn btn-info ml-3'>
              Sửa
            </Button>
            <hr />
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
              <ModalHeader>Cập nhật thông tin nhân viên</ModalHeader>
              <ModalBody>
                <LocalForm onSubmit={value => handleUpdateStaff(value)}>
                  <FormGroup row>
                    <Label htmlFor='name' className='col-5'>
                      Họ và Tên
                    </Label>
                    <Col className='col-7 '>
                      <Control.text
                        model='.name'
                        id='name'
                        name='name'
                        className='form-control'
                        defaultValue={props.staff.name}
                        validators={{
                          required,
                          minLength: minLength(3),
                          maxLength: maxLength(30),
                        }}
                      />
                      <Errors
                        className='text-danger'
                        model='.name'
                        show='touched'
                        messages={{
                          minLength: 'Tên nhân viên phải nhiều hơn 3 kí tự',
                          maxLength: 'Tên nhân viên phải ít hơn 30 kí tự',
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label htmlFor='doB' className='col-5'>
                      Ngày sinh
                    </Label>
                    <Col className='col-7 '>
                      <Control.text
                        model='.doB'
                        id='doB'
                        name='doB'
                        type='date'
                        className='form-control'
                        defaultValue={dateFormat(props.staff.doB, 'isoDate')}
                        validators={{
                          required,
                        }}
                      />
                      <Errors
                        className='text-danger'
                        model='.doB'
                        show='touched'
                        messages={{
                          required: 'Vui lòng nhập sinh',
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label htmlFor='startDate' className='col-5'>
                      Ngày vào công ty
                    </Label>
                    <Col className='col-7 '>
                      <Control.text
                        model='.startDate'
                        id='startDate'
                        name='startDate'
                        type='date'
                        className='form-control'
                        defaultValue={dateFormat(
                          props.staff.startDate,
                          'isoDate'
                        )}
                        validators={{
                          required,
                        }}
                      />
                      <Errors
                        className='text-danger'
                        model='.startDate'
                        show='touched'
                        messages={{
                          required: 'Vui lòng nhập ngày vào công ty',
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label htmlFor='department' className='col-5'>
                      Phòng Ban
                    </Label>
                    <Col className='col-7 '>
                      <Control.select
                        model='.department'
                        id='department'
                        name='department'
                        className='form-control'
                        defaultValue={
                          props.dept.find(
                            dept => dept.id === props.staff.departmentId
                          ).name
                        }
                        validators={{
                          required,
                        }}
                      >
                        <option>Sale</option>
                        <option>HR</option>
                        <option>Marketing</option>
                        <option>IT</option>
                        <option>Finance</option>
                      </Control.select>
                      <Errors
                        className='text-danger'
                        model='.department'
                        show='touched'
                        messages={{
                          required: 'Vui lòng chọn phòng ban',
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label htmlFor='salaryScale' className='col-5'>
                      Hệ số lương
                    </Label>
                    <Col className='col-7 '>
                      <Control.text
                        model='.salaryScale'
                        id='salaryScale'
                        name='salaryScale'
                        className='form-control'
                        defaultValue={props.staff.salaryScale}
                        validators={{
                          required,
                          isNumber,
                        }}
                      />
                      <Errors
                        className='text-danger'
                        model='.salaryScale'
                        show='touched'
                        messages={{
                          required: 'Vui lòng nhập hệ số lương',
                          isNumber: 'Chỉ nhập số',
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label htmlFor='annualLeave' className='col-5'>
                      Số ngày nghỉ còn lại
                    </Label>
                    <Col className='col-7 '>
                      <Control.text
                        model='.annualLeave'
                        id='annualLeave'
                        name='annualLeave'
                        className='form-control'
                        defaultValue={props.staff.annualLeave}
                        validators={{
                          required,
                          isNumber,
                        }}
                      />
                      <Errors
                        className='text-danger'
                        model='.annualLeave'
                        show='touched'
                        messages={{
                          required: 'Vui lòng nhập ngày phép còn lại',
                          isNumber: 'Chỉ nhập số',
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label htmlFor='overTime' className='col-5'>
                      Số giờ làm thêm
                    </Label>
                    <Col className='col-7 '>
                      <Control.text
                        model='.overTime'
                        id='overTime'
                        name='overTime'
                        className='form-control'
                        defaultValue={props.staff.overTime}
                        validators={{
                          required,
                          isNumber,
                        }}
                      />
                      <Errors
                        className='text-danger'
                        model='.overTime'
                        show='touched'
                        messages={{
                          required: 'Vui lòng nhập số giờ làm thêm',
                          isNumber: 'Chỉ nhập số',
                        }}
                      />
                    </Col>
                  </FormGroup>

                  <Button type='submit' value='submit' color='primary'>
                    Cập nhật
                  </Button>
                </LocalForm>
              </ModalBody>
            </Modal>
          </div>
        </div>
        <div className='container'>
          <FadeTransform
            in
            transformProps={{
              exitTransform: 'scale(0.2) translateY(-50%)',
            }}
          >
            <div className='row'>
              <RenderImg staff={props.staff} />
              <RenderDescription staff={props.staff} dept={props.dept} />
            </div>
          </FadeTransform>
        </div>
      </div>
    );
  } else return <div></div>;
}

export default StaffDetail;
