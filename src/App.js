import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import ShopPage from './pages/shop/shop.component';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import {setCurrenUser} from  './redux/user/user.actions'

class App extends React.Component {
 
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrenUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrenUser ({
              id : snapShot.id,
              ...snapShot.data()
            });
         });   
        } 
      setCurrenUser(userAuth);    
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/signin' 
            render={() => this.props.currentUser ? (<Redirect to='/' />) 
            : 
            (<SignInAndSignUp />) 
          }/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchtToProps = dispatch => ({
  setCurrenUser: user => dispatch(setCurrenUser(user))
}); 

export default connect(mapStateToProps, mapDispatchtToProps)(App);
