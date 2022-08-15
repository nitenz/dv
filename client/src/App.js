// in src/App.js
import React from "react";

import { Route,Routes } from 'react-router-dom'

import { connect } from 'react-redux'

import './App.scss';

import Admin from './pages/admin'
import Nav from './components/nav'
import Home from './pages/home'
import RealStatePage from './pages/realstate'
import Footer from './components/footer'
import CreateUser from './pages/create-user'
import CreateImovel from './pages/create-imovel';

import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page:'home',
      pagePositionY:0,
      sideMenuOpen: false,
      data: {}
    };

    this.handleResetEvenFromSubmit = () => {
      return new Promise((resolve, reject) => {
        fetch('http://localhost:8080/imoveis/')
        .then(response => response.json())
        .then(data => {
            if(data){
                this.setState({data, page:'home'})
            }
        });
        
      })
    }

    this.handleNavigation = (e) => {
      const window = e.currentTarget;
  
      this.setState( {pagePositionY: window.scrollY} )
    };
  }


  componentDidMount(){
    window.addEventListener("scroll", (e) => this.handleNavigation(e));

    return new Promise((resolve, reject) => {
      fetch('http://localhost:8080/imoveis/')
      .then(response => response.json())
      .then(data => {
          if(data){
              this.setState({data})
          }
      });
      
    })
  }

  componentWillUnmount(){
  
  }
  
  
  render(){
    
    const handleMenuEvent = (e) => {
      const menuOptionText = e.target.text ? e.target.text.trim() : '';
      let mainMenuOption = '';
      [document.querySelectorAll('li.nav__item')].forEach((item) => {
        item.forEach( (menuOption) => {
          menuOption.children[0].classList.remove('active')
          if(menuOption.children[0].text === menuOptionText && !menuOption.classList.contains('sidebar') ) mainMenuOption = menuOption;
        })      
      })

      if(mainMenuOption){
        mainMenuOption.children[0].classList.toggle('active');
      }
      if(this.state.sideMenuOpen) this.setState({page: e.target.name,sideMenuOpen: !this.state.sideMenuOpen})
      else this.setState({page: e.target.name})
    }

    const handleSideBarMenuEvent = (e) => {
      this.setState({sideMenuOpen: !this.state.sideMenuOpen})
    }

    return (
      <div className="page">
        <div className="page-content">
          {
            this.state.page === 'admin' ? <Admin /> : (
              <div className="site">
                <Nav handleMenuEvent={handleMenuEvent} pagePositionY={this.state.pagePositionY} handleSideBarMenuEvent={handleSideBarMenuEvent} sideMenuOpen={this.state.sideMenuOpen} />
                
                { 
                  this.state.page === 'createuser' ?  <CreateUser event={this.handleResetEvenFromSubmit} />  : 
                  this.state.page === 'realstate' ? <RealStatePage data={this.state.data} /> : 
                  this.state.page === 'createimovel' ? <CreateImovel event={this.handleResetEvenFromSubmit} /> : <Home />
                }
              
                <Footer />
            </div>
            )
          }
        </div>
      </div>
  );
 }
} 

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);