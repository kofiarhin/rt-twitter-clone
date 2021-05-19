import React from "react"
import { firestore } from "../../firebase/firebase.utils"
import { Link } from "react-router-dom"

import "./requests.styles.scss"

// and they ask why i love redux
import { connect } from "react-redux"

class Requests extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {

        // get list of request

        const requestsCollection = firestore.collection("requests").get();


        requestsCollection.then(snapshot => {

            let data = [];

            snapshot.docs.forEach(doc => {

                data.push({
                    id: doc.id,
                    ...doc.data()
                })
            });

            // filter only request for current user


            const { currentUser } = this.props;


            const filtered = data.filter(item => item.userId === currentUser.id);

            this.setState({
                data: filtered
            })
        })

    }

    render() {

        const { data } = this.state;

        return <div className="container">
            <div className="requests-wrapper">


                {
                    data.map(({ id, requestDetails: { displayName } }) => {

                        return <div key={id}>

                            <Link to={`/requests/${id}`}>
                                <p>You have a request from  {displayName} </p>
                            </Link>
                        </div>
                    })
                }

            </div>
        </div>
    }
}

// todo - use reselect libray to do reselection

const mapStateToProps = state => {

    return {
        currentUser: state.user.currentUser
    }
}
export default connect(mapStateToProps)(Requests);