import React from 'react'
import './Login.css'

const Login = ({}) => {
  return (
    <>
      <div class="container">
        <div class="form row">
          <form class="form-horizontal col-sm-offset col-md-offset-3">
            <h3 class="form-title">Login</h3>
            <div class="col-sm-9 col-md-9">
              <div class="form-group">
                <i class="fa fa-user" aria-hidden="true"></i>
                <input
                  class="form-control required"
                  type="text"
                  name="username"
                  id="username"
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
                  type="submit"
                  value="go"
                  class="btn btn-success pull-right"
                  style={{ marginLeft: 30 }}
                />
                <input
                  type="button"
                  value="register"
                  class="btn btn-success pull-right"
                  style={{ marginLeft: 30 }}
                  onClick={()=>
                    window.location.href ="/register"
                  }
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default Login
