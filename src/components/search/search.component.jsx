import React from "react"

import "./search.styles.scss"
import { firestore } from "../../firebase/firebase.utils"
import { connect } from "react-redux"
import { setCurrentUser } from "../../redux/user/user.actions"
import _ from "lodash"

class Search extends React.Component {

    // remove current user from state after persisting data
    state = {
        data: [],
        currentUser: {}
    }

    componentDidMount() {

        const { currentUser = {} } = this.props;

        if (!_.isEmpty(currentUser)) {

            console.log("passs")

            const userRef = firestore.doc(`users/${currentUser.id}`).get()


            userRef.then(snapshot => {

                if (snapshot.exists) {
                    const user = snapshot.data();

                    this.props.dispatch(setCurrentUser(user))

                }
            })

        }


        const userCollection = firestore.collection("users").get()


        userCollection.then(snapshot => {

            let data = []
            snapshot.docs.forEach(doc => {

                data.push({
                    id: doc.id,
                    ...doc.data()
                })
            });


            // filter out current user;

            const { currentUser: { id } } = this.props;

            const filtered = data.filter(item => item.id !== id);

            this.setState({
                data: filtered
            })
        })
    }

    handleConnect = async user => {

        const { currentUser } = this.props;

        // todo -  refactor to code to add user to database 
        const requestCollection = firestore.collection("requests")

        // how should the data structure look

        // 0 - pending 1 - accepted
        const dataToSubmit = {
            userId: user.id,
            requestDetails: currentUser,
            status: 0
        };


        try {


            await requestCollection.add(dataToSubmit);

            console.log("request added")
        } catch (error) {

            console.log(error.message)
        }
    }

    render() {

        const { currentUser: { followers = [] } = {} } = this.props;
        const { data } = this.state;


        if (!_.isEmpty(followers)) {

            console.log(followers)
        }



        return <div className="search">


            <div className="container">

                <form action="">
                    <input type="Search User" name="search" placeholder="Search User" />
                </form>
            </div>

            {/* display list of users here */}

            <div className="container">
                <div className="user-list">

                    {
                        data.map(user => {

                            return <div key={user.id} className="user-unit">

                                <img src={user.photoURL} alt="" />
                                <h1> {user.displayName} </h1>
                                <p> {user.email} </p>

                                {

                                    followers.includes(user.id) ? <button className="unfollow" style={{
                                        background: "red"
                                    }}> UnFollow</button> : <button className="follow"> Follow </button>
                                }

                            </div>
                        })
                    }

                </div>
            </div>
        </div>
    }
}


const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps)(Search);