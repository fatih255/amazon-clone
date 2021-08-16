import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signin } from '../actions/userActions';

function SigninScreen(props) {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const userSignin = useSelector(state=>state.userSignin);
    const {loading,userInfo,error} = userSignin;

    const dispatch = useDispatch();

    const redirect = props.location.search ? props.location.search.split("=")[1]:'/';
    useEffect(() => {
     if(userInfo){
         props.history.push(redirect);
     }
        return () => {
            //
        };
    }, [userInfo]);

    const submitHandler = (e)=>{
        e.preventDefault();
        console.log(userInfo);
        dispatch(signin(email,password));
    }

    


    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Sign-In</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input name="email" type="email" id="email" onChange={(e)=>setEmail(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input name="password" type="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className="button button-primary">Signin</button>
                </li>
                <li>
                    New to amazona?
                </li>
                <li>
                    <Link to={redirect === "/" ? "register" : "register?redirect="+redirect } className="button button-secondary text-center">Create your amazona account</Link>
                </li>
            </ul>
        </form>
    </div>
}
export default SigninScreen;