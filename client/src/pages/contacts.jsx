const Contacts = () => {

    return(
        <div className="contacts-page">
            <div className="contact-place">

            </div>
            <div className="contact-info-container">
                <div className="contact-form">
                    <form>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form4Example1">Name</label>
                            <input type="text" id="form4Example1" className="form-control" />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form4Example2">Email address</label>
                            <input type="email" id="form4Example2" className="form-control" />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form4Example3">Message</label>
                            <textarea className="form-control" id="form4Example3" rows="4"></textarea>
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