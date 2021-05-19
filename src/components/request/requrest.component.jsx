import React from "react"
import { firestore } from "../../firebase/firebase.utils"
import { connect } from "react-redux";

import { setCurrentUser } from "../../redux/user/user.actions"

import "./request.styles.scss"



class Request extends React.Component {


    // remove current user after persisting data
    state = {
        data: {},
        currentUser: {}
    }

    componentDidMount() {

        const { id } = this.props.match.params;


        // remove this code after persisting data
        const { currentUser } = this.props;


        // get request from database

        const requestRef = firestore.doc(`requests/${id}`).get()

        requestRef.then(snapshot => {

            if (snapshot.exists) {

                const request = snapshot.data();

                this.setState({
                    data: request
                })
            }
        })
    }

    handleAccept = () => {

        // get current user

        const { currentUser } = this.props;
        const { data } = this.state;

        const followerId = data.requestDetails.id;


        // embed to user data; 
        const userRef = firestore.doc(`users/${currentUser.id}`).get();


        userRef.then(snapshot => {

            let { followers } = snapshot.data();

            if (!followers) {
                followers = []
            }

            followers.push(data.requestDetails.id);

            //add followers to userData

            const dataToSubmit = {
                ...snapshot.data(),
                followers
            };

            // will refactor later
            firestore.doc(`users/${currentUser.id}`).set(dataToSubmit).then(() => {
                this.props.dispatch(setCurrentUser(dataToSubmit));

                // remove request from database

                const requestId = this.props.match.params.id;

                firestore.doc(`requests/${requestId}`).delete().then(() => {

                    // redirect to search page
                    this.props.history.push("/search")
                })


            }
            )
        })



    }

    render() {

        const { data: { requestDetails: { displayName, photoURL, email } = {

        } }, status } = this.state;


        return <div className="container">

            <div className="user-wrapper">
                <img src={photoURL} alt="" />
                <h2> {displayName} </h2>

                <div className="button-wrapper">
                    <button className="accept" onClick={this.handleAccept}>Accept</button>
                    <button className="delete">Delete</button>
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

export default connect(mapStateToProps)(Request);