
const Footer = () => {
    const footerComponents = () =>{
        const components = ['fab fa-twitter','fab fa-instagram','fab fa-linkedin','fab fa-github','fab fa-google','fab fa-facebook-f'];

        let htmlLayout  = [];
        components.map( (item, idx) => {
            htmlLayout.push(
                <a key={idx}
                    className="btn btn-link btn-floating btn-lg text-white m-1"
                    href="#!"
                    role="button"
                    data-mdb-ripple-color="dark"
                    >
                        <i className={item}></i>
                </a>
            )
        })

        return htmlLayout;
    }
    return (
        <div className="footer">
           <footer className="text-center text-white">
                <div className="container pt-4">
                    <section className="mb-4">
                        {footerComponents()}
                    </section>
                </div>
                
                <div className="text-center text-white p-3" >
                    © 2020 Copyright:
                    <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
                </div>
                </footer>
        </div>
    )
}

export default Footer;