import React, { useEffect, useState } from 'react';
import './create-user.scss'
const CreateUser = (props) =>{
    const handleEvent = props.event,
    [ formData, setFormData ] = useState({
        name:'',
        username:'',
        password:'',
        confirmpassword:'',
        email: '',
        mobile_number: 0,
        zipcode:0,
        vatnumber:0
    });

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])

    const handleSubmit = (e) => {
        const validateEmail = () => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email))
            {
              return (true)
            }
            return (false)
        }
        const validatePassword = (password) => {
            var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            return strongRegex.test(password);
        }
        const validateFormFields = () => {
            if( validateEmail && validatePassword && (formData.password === formData.confirmpassword)) return true;
            else return false;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( formData )
        };

        if(validateFormFields){
            fetch('http://localhost:8080/add/user', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('id: ', data)
                alert('user Criado '+ data.id);
                setFormData({
                    name:'',
                    username:'',
                    password:'',
                    confirmpassword:'',
                    email: '',
                    mobile_number: 0,
                    zipcode:0,
                    vatnumber:0
                })
                handleEvent();
            });
        }else{
            if(validateEmail) alert('Email is inválid!')
            if(!validatePassword) alert('Password is too weak. Password needs to contain letters, numbers, uppercase letters and special characters')
            if(formData.password !== formData.confirmpassword) alert('Passwords are different!')
        }

        e.preventDefault();
    }

      const handleInput = (e) => {
        const { value, name } = e.target;

        setFormData(formData =>({
            ...formData,//keep same data from obj
            ...{ [name]: value }//update the new value
        }));

        e.preventDefault();
      }
    return(
        <div className="create-user">
            <h1>Criar Utilizador</h1>
            <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                    <div className="col">
                    <div className="form-outline">
                        <input onChange={handleInput} type="text" name="name" id="name" className="form-control" />
                        <label className="form-label" htmlFor="name">Nome</label>
                    </div>
                    </div>
                    <div className="col">
                    <div className="form-outline">
                        <input onChange={handleInput} required type="text" name="username" className="form-control" />
                        <label className="form-label" htmlFor="username">Username</label>
                    </div>
                    </div>
                </div>

                <div className="form-outline mb-4">
                    <input onChange={handleInput} required type="text" name="password" id="password" className="form-control" />
                    <label className="form-label"  htmlFor="password">Password</label>
                </div>

                <div className="form-outline mb-4">
                    <input onChange={handleInput} required type="text" name="confirmpassword" id="confirmpassword" className="form-control" />
                    <label className="form-label" htmlFor="confirmpassword">Confirm Password</label>
                </div>

                <div className="form-outline mb-4">
                    <input onChange={handleInput} required type="email" name="email" id="email" className="form-control" />
                    <label className="form-label" htmlFor="email">Email</label>
                </div>

                <div className="form-outline mb-4">
                    <input onChange={handleInput} required maxLength="9" type="number" name="mobile_number" id="mobile_number" className="form-control" />
                    <label className="form-label" htmlFor="mobile_number">Telemóvel</label>
                </div>

                <div className="form-outline mb-4">
                    <input onChange={handleInput} type="number" maxLength="4" name="zip_code" id="zip_code" className="form-control" />
                    <label className="form-label" htmlFor="zip_code">Código Postal</label>
                </div>

                <div className="form-outline mb-4">
                    <input onChange={handleInput} maxLength="12" type="number" name="vatnumber" id="vatnumber" className="form-control" />
                    <label className="form-label" htmlFor="vatnumber">Vat Number</label>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4">Criar Utilizador</button>
            </form>
        </div>
    )
}

export default CreateUser;