import React from "react";

import logo from '../imgs/logo.png'
import imageMenu from '../imgs/menu.png'
import './nav.scss'
import authProvider from "../backoffice/authProvider";

const Nav = ( props ) => {
    const {handleMenuEvent, pagePositionY, handleSideBarMenuEvent, sideMenuOpen, handleResetEvenFromSubmit} = props;
    const {username, role} = localStorage;
    
    const handleLogout = (e) => {
        authProvider('AUTH_LOGOUT').then( () => {
            alert('Logged off!')
            handleResetEvenFromSubmit();
        })
    }

    const handleLogoEvent = (e) => {
        window.scrollTo(0, 0);
    }

    return (
        <nav className={`nav ${pagePositionY > 0 ? 'shrink' : '' }` }>
            <div onClick={handleLogoEvent} className={`nav__title ${pagePositionY > 0 ? 'shrink' : '' }` }>
                <p>RealState Properties</p>
                <img className="logo" src={logo}/>
            </div>
            <div className="nav__logo"></div>
            <ul className="nav__list main-menu">
                <li className="nav__item" onClick={handleMenuEvent}><a name="who" href="#section1">Who</a></li>
                <li className="nav__item" onClick={handleMenuEvent}><a name="contacts" href="#section2">Contacts</a></li>
                <li className="nav__item" onClick={handleMenuEvent}><a name="realstate" href="#section3">List</a></li>
            </ul>
            <div className="nav__menu" onClick={handleSideBarMenuEvent}>
                <img src={imageMenu} />
                <div className={`navigation-menu ${!sideMenuOpen ? 'close' : 'open' }` }>
                    <ul className="nav__list">
                        <li className="nav__item sidebar" onClick={handleMenuEvent}><a name="who" href="#section1">Who</a></li>
                        <li className="nav__item sidebar" onClick={handleMenuEvent}><a name="contacts" href="#section2">Contacts</a></li>
                        <li className="nav__item sidebar" onClick={handleMenuEvent}><a name="realstate" href="#section3">List</a></li>
                        { 
                            username ? <li className="nav__item sidebar" onClick={handleMenuEvent}><a name="createimovel">Add property</a></li> : null
                        }

                        { 
                            username ? <li className="nav__item sidebar" onClick={handleMenuEvent}><a name="myimoveis">My properties</a></li> : null
                        }

                        {
                             !username ?   <li className="nav__item sidebar" onClick={handleMenuEvent}><a name="createuser">Create account</a></li> : null
                        }
                      
                        {
                           ( role === 'admin' || role === 'super-admin') && username ? <li className="nav__item sidebar" onClick={handleMenuEvent}><a name="admin">BackOffice</a></li> : null
                        }

                        {
                            !username ? <li className="nav__item sidebar" onClick={handleMenuEvent}><a name="login">Login</a></li> : <li className="nav__item sidebar" onClick={handleLogout}><a name="logout">Logout</a></li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav;