import ImageGalery from '../components/image-galery';
import WhoPage from './who'
import ContactsPage from './contacts'
import heroBackGroundImage from '../imgs/3.jpg'

const Home = () => {
    return(
        <div className="home-page">
            <div className="hero" style={{ 
                backgroundImage: `url("${heroBackGroundImage}")` 
            }}>
            </div>
            
            <section className="section">
                <h2>Imóveis em destaque</h2>
                <ImageGalery />
            </section>
                    
            <section id="section1" name="section3"className="section">
                <h2>Quem somos</h2>
                <WhoPage />
            </section>

            <section id="section2" name="section3" className="section">
                <h2>Contactos</h2>
                <ContactsPage />
            </section>

        </div>
    )
}

export default Home;