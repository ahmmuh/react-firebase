import React, { Component } from 'react'
import {Link} from "@reach/router"

export class Home extends Component {
  render() {

    const {user} = this.props;
      const plead ={
          fontSize: 1.4 + 'em',
          fontWeight: 200,
         
      }
    return (
        <div className="container text-center ">
        <div className="row justify-content-center">
        <div className="col-10 col-md-10 col-lg-8 col-xl-7">
        
        <div className="display-4 text-primary mt-3 mb-2">
            Meetings Log  
        </div>
        <p className="lead" style={plead}>A meeting is when two or more people come together to discuss one or more topics.</p>

            {user === null && (
                <span>
                <Link to="/register" className="btn btn-outline-danger m-1">Register</Link>
                <Link to="/login" className="btn btn-outline-success m-1">Login</Link>
                </span>
            )}
            {user && (
             <Link to="/meetings" className="btn btn-primary">Meetings</Link>

            )}

     
        </div>
        </div>        
      </div>
        
      
    )
  }
}

export default Home
