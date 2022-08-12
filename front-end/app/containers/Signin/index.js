import React, { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'
import { message, Space } from 'antd';
import './index.css'
import { AuthContext } from '../App/auth'
import { Redirect } from 'react-router-dom';
import * as env from '../../env.json'

function index() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const input_username = useRef(null)
  const input_password = useRef(null)

  const [currentUser, setCurrentUser] = useContext(AuthContext);

  const onSignup = async () => {

    if (username != '' && password != '') {
      await axios({
        method: "POST",
        data: {
          username: username,
          password: password,
        },
        withCredentials: true,
        url: env.host_api + "/api/auth/login",
      })
        .then(function (response) {
          console.log(response.data.status);
          if (response.data.status == "ok") {
            // message.success('Sign up is a success');

            localStorage.setItem("token", response.data.token)

            setUsername('');
            setPassword('');

            input_username.current.value = '';
            input_password.current.value = '';

            setCurrentUser(true);
          } else {
            // console.log(response);
            message.error(response.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      message.error('This is an error message');
    }

  }


  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="container">

        <div className="row d-flex flex-row justify-content-center ">

          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-signin">
            <div className='p-1'>
              SIGN IN
            </div>
            <div>

              <div className="form-group p-1">
                <label htmlFor='username' className="col-sm-2 control-label">username</label>
                <div className="col-sm-12">
                  <input onChange={(e) => setUsername(e.target.value)}
                    type="text" name="username" id="username" className="form-control" required ref={input_username} />
                </div>
              </div>

            </div>
            <div>

              <div className="form-group p-1">
                <label htmlFor='password' className="col-sm-2 control-label">password</label>
                <div className="col-sm-12">
                  <input onChange={(e) => setPassword(e.target.value)}
                    type="password" name="" id="password" className="form-control" required ref={input_password} />
                </div>
              </div>

            </div>
            <div className='p-1'>
              <Space>
                <button type="button" className="btn btn-primary" onClick={onSignup}>Sign in</button>

              </Space>
            </div>

          </div>

        </div>

      </div>

    </>

  )
}

export default index