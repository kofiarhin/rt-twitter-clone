import React from "react"
import { connect } from "react-redux"
import { firestore } from "../../firebase/firebase.utils"
import _ from "lodash"

import { handleFollow } from "../../redux/user/user.actions"

import "./search.styles.scss"


class Search extends React.Component {

    state = {
        users: [],
        currentUser: {}
    }

    componentDidMount() {


        // get list of users

        firestore.collection("users").get().then(snapshot => {

            let users = []
            snapshot.docs.forEach(doc => {

                users.push({
                    id: doc.id,
                    ...doc.data()
                })
            });

            // filter out current user
            const { currentUser } = this.props;




            this.setState({
                users
            })

        })

    }

    renderButton = () => {

        const { currentUser } = this.props;


    }

    render() {



        const { users, currentUser } = this.props;

        console.log({
            id: currentUser.id,
            users
        })

        const filtered = users.filter(user => user.id !== currentUser.id)


        return <div className="search">

            <div className="container">
                <div className="user-list">
                    {

                        // filtered.map(user => {
                        //     return <div key={user.id} className="user-unit">
                        //         <img src={user.photoURL} alt="" />
                        //         <h1>{user.displayName} </h1>


                        //     </div>
                        // })
                    }
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = state => {

    return {
        currentUser: state.user.currentUser,
        users: state.user.users
    }
}

export default connect(mapStateToProps)(Search);