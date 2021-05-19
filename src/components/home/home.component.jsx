import React from "react"
import { connect } from "react-redux"
import { firestore } from "../../firebase/firebase.utils"

import "./home.styles.scss"

class Home extends React.Component {

    state = {
        tweet: "",
        data: []
    }

    componentDidMount() {

        const tweetCollection = firestore.collection("tweets")

        tweetCollection.onSnapshot(snapshot => {

            const changes = snapshot.docChanges()

            let data = []

            changes.forEach(change => {

                if (change.type === "added") {

                    data.push(change.doc.data())
                }
            })

            this.setState({
                data: [...data, ...this.state.data,]
            })
        })
    }

    handleChange = e => {

        const { name, value } = e.target;


        this.setState({
            [name]: value
        })

    }

    handleSubmit = async e => {
        e.preventDefault()

        const { tweet } = this.state;

        const { currentUser: { id: userId, photoURL, displayName } } = this.props;



        // add tweet to database
        const tweetCollection = firestore.collection("tweets").get();

        if (tweet !== "") {

            const dataToSubmit = {
                userId,
                tweet,
                photoURL,
                displayName,
                comments: [],
                createdAt: new Date()
            }


            try {

                const tweetCollection = firestore.collection("tweets");

                await tweetCollection.add(dataToSubmit)

                console.log("tweet added")

                this.setState({
                    tweet: ""
                })


            } catch (error) {

                console.log(error.message)
            }
        }





    }




    render() {

        const { currentUser: { photoURL } } = this.props;

        const { data } = this.state;

        return <div className="home">

            <div className="container">

                <form action="" onSubmit={this.handleSubmit}>
                    <div className="input-wrapper">
                        <img src={photoURL} alt="" />
                        <input type="text" placeholder="What is on your happening?" name="tweet" value={this.state.tweet} onChange={this.handleChange} />
                    </div>

                    <div className="button-wrapper">
                        <button>Tweet</button>
                    </div>
                </form>

                <div className="tweet-wrapper">
                    {
                        data.map(item => {

                            console.log(item)

                            return <div className="tweet-unit">

                                <img src={item.photoURL} alt="" />

                                <div className="text-wrapper">
                                    <p className="name">{item.displayName} </p>
                                    <p className="tweet">  {item.tweet}  </p>

                                    <div className="icon-wrapper">
                                        {/* like */}
                                        <img src="/img/like.svg" alt="" />
                                        {/* comment */}
                                        <img src="/img/comment.svg" alt="" />
                                    </div>
                                </div>

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
export default connect(mapStateToProps)(Home);