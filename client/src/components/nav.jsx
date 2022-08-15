import React from "react";

import logo from '../imgs/logo.png'
import imageMenu from '../imgs/menu.png'

const Nav = ( props ) => {
    const {handleMenuEvent, pagePositionY, handleSideBarMenuEvent, sideMenuOpen } = props;
    
    return (
        <nav className={`nav ${pagePositionY > 0 ? 'shrink' : '' }` }>
            <div className={`nav__title ${pagePositionY > 0 ? 'shrink' : '' }` }>
                <p>Decisões Vibrantes</p>
                <img className="logo" src={logo}/>
            </div>
            <div className="nav__logo"></div>
            <ul className="nav__list">
                <li className="nav__item" onClick={handleMenuEvent}><a name="who" href="#section1">Quem somos</a></li>
                <li className="nav__item" onClick={handleMenuEvent}><a name="contacts" href="#section2">Contactos</a></li>
                <li className="nav__item" onClick={handleMenuEvent}><a name="realstate" href="#section3">Imóveis</a></li>
            </ul>
            <div className="nav__menu" onClick={handleSideBarMenuEvent}>
                <img src={imageMenu} />
                <div className={`navigation-menu ${!sideMenuOpen ? 'close' : 'open' }` }>
                    <ul className="nav__list">
                        <li className="nav__item sidebar" onClick={handleMenuEvent}><a name="who" href="#section1">Quem somos</a></li>
                        <li className="nav__item sidebar" onClick={handleMenuEvent}><a name="contacts" href="#section2">Contactos</a></li>
                        <li className="nav__item sidebar" onClick={handleMenuEvent}><a name="realstate" href="#section3">Imóveis</a></li>
                        <li className="nav__item sidebar" onClick={handleMenuEvent}><a name="createimovel">Adicionar Imóvel</a></li>
                        <li className="nav__item sidebar" onClick={handleMenuEvent}><a name="createuser">Criar conta</a></li>
                        <li className="nav__item sidebar" onClick={handleMenuEvent}><a name="admin">BackOffice</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav;