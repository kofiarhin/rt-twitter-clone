import React from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { auth } from "../../firebase/firebase.utils";


import "./header.styels.scss"

const Header = ({ currentUser }) => {


    return <div>
        <header className="main-header">

            <Link to='/'>
                <img src="/img/logo.png" alt="" />
            </Link>

            <div className="links">
                {
                    currentUser ? <span>
                        <Link to="/Profile"> {currentUser.displayName} </Link>
                        <Link to="/search">Search</Link>
                        <Link to="/requests">Requests</Link>
                        <span onClick={() => auth.signOut()} className="cta"> Sign Out</span>
                    </span> :

                        <span>

                            <Link to="/search"> Search </Link>
                            <Link to="/"> Login </Link>
                        </span>
                }

            </div>


        </header>
    </div>
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps)(Header);