import { useState } from 'react';
import authProvider from '../backoffice/authProvider';

const Login = (props) => {
     const handleResetEvenFromSubmit = props.handleResetEvenFromSubmit;
    const [ formData, setFormData ] = useState({
        username: '',
        password: '',
        remember: false
    });

    const handleSubmit = (e) => {
        const { username, password } = formData;
       
        authProvider('AUTH_LOGIN', {username, password}).then( (data) => {
                alert('Welcome ', localStorage.username);
                handleResetEvenFromSubmit();
        })

        e.preventDefault();
    }

    const handleInputs = (e) => {
         const {name, value} = e.target;

         setFormData({
            ...formData,
            [name]: value
         })
    }

    const handleCheckEvent = (e) => {
        setFormData({
            ...formData,
            remember: !formData.remember
         })
    }

    return (
        <div className="login">
            <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-5 col-md-8">
                            <form onSubmit={handleSubmit} className="bg-white  rounded-5 shadow-5-strong p-5">
                                <div className="form-outline mb-4">
                                <input onChange={handleInputs} name="username" type="text" id="form1Example1" className="form-control" />
                                <label className="form-label" htmlFor="form1Example1">Username</label>
                                </div>

                                <div className="form-outline mb-4">
                                <input onChange={handleInputs} name="password" type="password" id="form1Example2" className="form-control" />
                                <label className="form-label" htmlFor="form1Example2">Password</label>
                                </div>

                                <div className="row mb-4">
                                <div className="col d-flex justify-content-center">
                                    <div className="form-check">
                                    <input onChange={handleCheckEvent} name="remember" className="form-check-input" type="checkbox" value="" id="form1Example3" />
                                    <label className="form-check-label" htmlFor="form1Example3">
                                        Remember me
                                    </label>
                                    </div>
                                </div>

                                <div className="col text-center">
                                    <a href="#!">Forgot password?</a>
                                </div>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Login;