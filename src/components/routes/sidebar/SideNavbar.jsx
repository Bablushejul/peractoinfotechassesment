import React from 'react';

const SideNavbar = () => {
  return (
    <div class="container-fluid">
      <div className="row flex-nowrap">
        <div className="bg-dark col-auto col-md-2  min-vh-100">
          <div className="bg-dark p-2">
            <a className='d-flex text-decoration-none mt-1 align-items-center text-white'>
              <span className='fs-4 d-none d-sm-inline'>SideMenu</span>
            </a>
            <ul className='nav nav-pills flex-column mt-4'>
              <li className='nav-item'>
                <a href='#' className='nav-link text-white'>
                  <i className='fs-5 fa fa-guage'></i><span className='fs-4 d-none d-sm-inline'>DashBoard</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;
