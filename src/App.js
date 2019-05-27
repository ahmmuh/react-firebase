import React, { Component } from 'react';
import { Router, navigate} from "@reach/router"
import './App.css';
import Meetings from './components/Meetings'
import Login from './components/Login'
import Logout from './components/Logout'
import Home from './components/Home'
import Register from './components/Register'
import Menu from './components/Menu';
import Welcome from './components/Welcome';
import firebase from './Firebase'

class App extends Component {
 constructor(){
   super();
   this.state = {
     user: null,
     displayName: null,
     userID: null
   };
 }
componentDidMount() {
  firebase.auth().onAuthStateChanged(FBUser =>{
    if(FBUser){
      this.setState({
        user: FBUser,
        displayName: FBUser.displayName,
        userID: FBUser.uid
      });

      const meetingRef = firebase
      .database()
      .ref('meetings/' + FBUser.uid);

      meetingRef.on('value', snapshot =>{
        let meetings = snapshot.val();
        let meetingList = [];
        for(let item in meetings){
          meetingList.push({
            meetingID: item,
            meetingName: meetings[item].meetingName
          })
        }
        this.setState({
          meetings: meetingList,
          howManyMeetings : meetingList.length
        })
      })

    }else {
      this.setState({user: null})
    }
  });
}

displayUser = userName => {
  firebase.auth().onAuthStateChanged(FBUser => {
    FBUser.updateProfile({
      displayName: userName
    }).then(() =>{
      this.setState({
        user: FBUser,
        displayName: FBUser.displayName,
        userID: FBUser.uid
      });
      navigate('/meetings')

    })
  })

}

logOutUser = e =>{
  e.preventDefault();
  this.setState({
    displayName: null,
    user: null,
    userID: null
  });
  firebase.auth().signOut()
  .then(() =>{
    navigate('/login')
  })
}
// add meeting 
addMeeting = meetingName =>{
  const ref = firebase
  .database()
  .ref(`meetings/${this.state.user.uid}`);
    ref.push({meetingName: meetingName});
}
  render() {
    return (
      <div>
        <Menu user={this.state.user}
        logOutUser={this.logOutUser}/>
        {this.state.user && <Welcome
        userName={this.state.displayName}
        logOutUser={this.logOutUser} />}

        <Router>
       <Home path="/" user={this.state.user}/>
       <Register path="/register" displayUser={this.displayUser}/>
       <Login path="/login"/>
       <Logout path="/logout"/>
       <Meetings path="/meetings"
       meetings={this.state.meetings}
       addMeeting={this.addMeeting}
       userID={this.state.userID}/>
  </Router>
          

       
    
    </div>
    );
  }
}

export default App;
