import React from 'react'
import './Login.css'

const Register = ({}) => {
  return (
    <>
      <div class="container">
        <div class="form row">
          <form class="form-horizontal col-sm-offset col-md-offset-3">
            <h3 class="form-title">Register</h3>
            <div class="col-sm-9 col-md-9">
              <div class="form-group">
                <i class="fa fa-user" aria-hidden="true"></i>
                <input
                  class="form-control required"
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First Name"
                  required
                />
              </div>
              <div class="form-group">
                <i class="fa fa-user" aria-hidden="true"></i>
                <input
                  class="form-control required"
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div class="form-group">
                <i class="fa fa-user" aria-hidden="true"></i>
                <input
                  class="form-control required"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div class="form-group">
                <i class="fa fa-key" aria-hidden="true"></i>
                <input
                  class="form-control required"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                />
              </div>

              <div class="form-group">
                <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                <input
                  class="form-control required"
                  type="password"
                  name="resetpw"
                  id="resetpw"
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <div class="form-group"></div>

              <div class="form-group">
                <input
                  type="registe"
                  value="registe"
                  class="btn btn-success pull-right"
                  style={{ marginLeft: 20 }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default Register
