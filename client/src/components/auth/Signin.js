import React, {useState} from "react";
import { Link, useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {signin} from '../../actions/index';


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    //dispatch(signup(), cb)
    dispatch(signin({email, password}, () => {
      history.push('/welcome')
    }));
    
  }

  return( 
  <div className="mt-5">
  
    <div className="grid align__item">

      <div className="register">

        <img height="100px" src="https://avatars.githubusercontent.com/u/67744643?s=200&v=4" alt=""/>
       

        <h2>Sign In</h2>

        <form onSubmit={handleSubmit} className="form">

            <div className="form__field">
              <input type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="info@mailaddress.com" />
            </div>

            <div className="form__field">
              <input type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="••••••••••••" />
            </div>

            <div className="form__field">
              <input type="submit" value="Log In" />
            </div>

        </form>

        <p>Don't have an account? <Link to="/signup">Register Here</Link></p>

      </div>

    </div>
  
  </div>);
};

export default Signin;
