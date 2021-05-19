 import React from "react"
 import { Switch, Route } from "react-router-dom"

import Header from "./components/header/header.component"
import Search from "./components/search/search.component"
import Login from "./components/login/Login.component"
import Home from "./components/home/home.component"
import Profile from "./components/profile/profile.component"
import Requests from "./components/requests/requests.component"
import Request from "./components/request/requrest.component"

//  redux stuff
 import { connect } from "react-redux"
 import { setCurrentUser } from "./redux/user/user.actions"

 import {  auth, createUserProfile, firestore } from "./firebase/firebase.utils"



 import "./app.styles.scss"

 class App extends React.Component {
        

      componentDidMount() {

            

            // when there are changes in authentication
            auth.onAuthStateChanged(  async user => {

                        if(user !== null) {

                              const { displayName, email, photoURL, uid,  ...rest} = user;

                                    const userData = {
                                    id: uid, 
                                    displayName, 
                                    email,
                                     photoURL
                              }


                              createUserProfile(userData)

                              this.props.dispatch(setCurrentUser(userData))

                               
                        } else {

                              this.props.dispatch(setCurrentUser())
                        }
            })

            const { currentUser } = this.props;
            if(currentUser !== null) {

                  const userRef = firestore.doc(`users/${currentUser.id}`);

                  userRef.onSnapshot ( snapshot => {


                        const user = snapshot.data();

                        this.props.dispatch( setCurrentUser(user))

                  })
            }

      }

  render() {

      const { currentUser }  = this.props;



    return <div> 
          <Header /> 
          <Switch> 

                <Route path="/" exact render={ () => currentUser ? <Home /> : <Login />  } />
                <Route path="/profile" exact component={Profile} />
                <Route path="/search" exact component={Search} />
                <Route path="/requests" exact component={Requests} />
                <Route  path="/requests/:id" exact component={Request}  />
                
s          </Switch>

    </div>
  }
 }

 const mapStateToProps = state => {

      return {
            currentUser: state.user.currentUser
      }
 }
 export default connect(mapStateToProps)(App)