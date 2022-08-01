import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { message } from 'antd';
import './index.css'
import * as env from '../../env.json';

function index() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const input_username = useRef(null)
  const input_password = useRef(null)
  const input_name = useRef(null)

  const success = () => {
    message.success('This is a success message');
  };

  const onSignup = async () => {

    if (username != '' && password != '' && name != '') {
      await axios({
        method: "POST",
        data: {
          name: name,
          username: username,
          password: password
        },
        withCredentials: true,
        url: env.host_api_auth + "/auth/register",
      })
        .then(function (response) {
          // console.log(response);
          if (response.status == 200) {
            message.success('Sign up is a success');
            setUsername('');
            setPassword('');
            setName('');
            input_username.current.value = '';
            input_password.current.value = '';
            input_name.current.value = '';
          } else {
            console.log(response);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      message.error('This is an error message');
    }




  }

  return (
    <>
      <div className="container">

        <div className="row d-flex flex-row justify-content-center ">

          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-signin">
            <div className='p-1'>
              SIGN UP
            </div>

            {/* <form action="" className="form-inline" role="form" onSubmit={onSignup}> */}

            <div>
              <div className="form-group p-1">
                <label htmlFor='name' className="col-sm-2 control-label">name</label>
                <div className="col-sm-12">
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text" name="name" id="name" className="form-control" placeholder="" required ref={input_name} />
                </div>
              </div>

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

              <button type="button" className="btn btn-primary" onClick={onSignup}>Click for signup</button>

            </div>

            {/* </form> */}

          </div>

        </div>

      </div>

    </>

  )
}

export default index