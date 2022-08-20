import React, { useState } from 'react';
import './contacts.scss'
const Contacts = (props) => {
    const [ formData, setFormData ] = useState({
        name:'',
        email:'',
        message:''
    });

    const handleSubmit = (e) => {
        const form =  e.target;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( formData )
        };

        fetch('http://localhost:8080/add/contact', requestOptions)
        .then(response => response.json())
        .then(data => {
            alert('Email sent');
            form.reset();
        });

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
        <div className="contacts-page">
            <div className="contact-place">

            </div>
            <div className="contact-info-container">
                <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="name">Name</label>
                            <input onChange={handleInput} type="text" id="name" name="name" className="form-control" />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="email">Email address</label>
                            <input onChange={handleInput} type="email" id="email" name="email" className="form-control" />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="message">Message</label>
                            <textarea onChange={handleInput} className="form-control" name="message" id="message" rows="4"></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4">Send</button>
                    </form>
                </div>
                <div className="contact-info">
                    <div className="cms-content">
                        <h3>Office address</h3>
                        <p>Fairfax House<br/> Causton Road<br/> Colchester<br/> Essex CO1 1RJ</p>
                        <h3>Telephone</h3>
                        <p>020 7193 2844</p>
                        <h3>Email</h3>
                        <p><a href="mailto:info@10ninety.co.uk">info@10ninety.co.uk</a></p>
                    </div>
                    <div className="cms-content">
                        <div className="row no-gutters">
                            <div className="col-xs-12">
                                <h3>Opening Times</h3>
                            </div>
                        </div>
                        <div className="row no-gutters">
                            <div className="col-xs-6">
                                <p>Monday</p>
                            </div>
                            <div className="col-xs-6">
                                <p>9am to 5:30pm</p>
                            </div>
                        </div>
                        <div className="row no-gutters">
                            <div className="col-xs-6">
                                <p>Tuesday</p>
                            </div>
                            <div className="col-xs-6">
                                <p>9am to 5:30pm</p>
                            </div>
                        </div>
                        <div className="row no-gutters">
                            <div className="col-xs-6">
                                <p>Wednesday</p>
                            </div>
                            <div className="col-xs-6">
                                <p>9am to 5:30pm</p>
                            </div>
                        </div>
                        <div className="row no-gutters">
                            <div className="col-xs-6">
                                <p>Thursday</p>
                            </div>
                            <div className="col-xs-6">
                                <p>9am to 5:30pm</p>
                            </div>
                        </div>
                        <div className="row no-gutters">
                            <div className="col-xs-6">
                                <p>Friday</p>
                            </div>
                            <div className="col-xs-6">
                                <p>9am to 5:30pm</p>
                            </div>
                        </div>
                        <div className="row no-gutters">
                            <div className="col-xs-6">
                                <p>Saturday</p>
                            </div>
                            <div className="col-xs-6">
                                <p>Closed</p>
                            </div>
                        </div>
                        <div className="row no-gutters">
                            <div className="col-xs-6">
                                <p>Sunday</p>
                            </div>
                            <div className="col-xs-6">
                                <p>Closed</p>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Contacts;