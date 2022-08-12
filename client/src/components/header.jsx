import Menu from './Menu'

import Logo from '../imgs/logo.png'

const Header = ({handleClick}) => {
    return(
        <div className="header">
             <div className="logo"> 
                <div className="logo-text">
                    <p>Devicisões</p>
                    <p>Vibrantes</p>
                </div>
                <div className="logo-img">
                    <img src={Logo} alt="logo" />
                </div>
            </div>
           
            <Menu handleClick={handleClick} />
        </div>
    )
}
export default Header;