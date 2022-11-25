import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  // setState is open nav when navigation in mobile mode
  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  render() {
    return (
      <Navbar dark color='success' expand='md'>
        <div className='container'>
          <NavbarToggler onClick={this.toggleNav} />
          <NavbarBrand className='mr-5' href='/'>
            <img
              src='assets/images/staffManager.png'
              height='40'
              width='51'
              alt='Quan Ly Nhan Su'
            />
          </NavbarBrand>
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className='nav-link mr-2' to='/nhanvien'>
                  <span className='fa fa-users fa-lg'></span> Nhân Viên
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className='nav-link mr-2' to='/phongban'>
                  <span className='fa fa-id-card fa-lg'></span> Phòng Ban
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className='nav-link mr-2' to='/bangluong'>
                  <span className='fa fa-money fa-lg'></span> Bảng Lương
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default Header;
