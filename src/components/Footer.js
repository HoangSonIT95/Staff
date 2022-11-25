import React from 'react';

function Footer() {
  return (
    <div className='footer mt-1'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-6 col-md-6 col-sm-12'>
            <h5>Thông Tin Liên Hệ</h5>
            <address>
              Số nhà 24/1, Đường 17, Khu phố 5, Phường Linh Trung
              <br /> Thành Phố Thủ Đức, Thành Phố Hồ Chí Minh, Việt Nam
              <br />
              <i className='fa fa-phone fa-lg'></i>: +84 378 126 162
              <br />
              <i className='fa fa-envelope fa-lg'></i>:{' '}
              <a href='mailto:sonhvFx16039@funix.edu.vn'>
                sonhvFx16039@funix.edu.vn
              </a>
            </address>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 align-self-center'>
            <div className='text-center'>
              <a
                className='btn btn-social-icon btn-google m-2'
                href='http://google.com/+'
              >
                <i className='fa fa-google-plus'></i>
              </a>
              <a
                className='btn btn-social-icon btn-facebook m-2'
                href='http://www.facebook.com/profile.php?id='
              >
                <i className='fa fa-facebook'></i>
              </a>
              <a
                className='btn btn-social-icon btn-twitter m-2'
                href='http://twitter.com/'
              >
                <i className='fa fa-twitter'></i>
              </a>
              <a
                className='btn btn-social-icon btn-google m-2'
                href='http://youtube.com/'
              >
                <i className='fa fa-youtube'></i>
              </a>
            </div>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-auto'>
            <p>© Copyright 2022 Hoang Van Son</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
