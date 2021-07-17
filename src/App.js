import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebase.config';
import { useState } from 'react';



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
function App() {
  // google signin
  const [user, setUser]=useState({

    isSignedIn:false,
    name:'',
    email:'',
    photo:''
  })
  var provider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignIn=()=>{
    firebase.auth()
    .signInWithPopup(provider)
    .then(res => {
      const {displayName,photoURL,email}=res.user;
       const isSingedInUser={
         isSignedIn:true,
         name:displayName,
         email:email,
         photo:photoURL
       }
       setUser(isSingedInUser);
     
      }).catch((error) => {
  
     console.log(error)
     
    });
  
  }
  const handleGoogleSignOut=()=>{
    firebase.auth().signOut()
    .then(res=> {
      
      const isSingedOutUser={
        isSignedIn:false,
        name:'',
        email:'',
        photo:''
      }
      setUser(isSingedOutUser)
    }).catch((error) => {
      console.log(error)
    });
  }
   // email-password 

  const handleChange=(e)=>{
    console.log(e.target.name,e.target.value)
   if(e.target.name==='email'){
       const isEmailValid=/\S+@\S+\.\S+/.test(e.target.value);
       console.log(isEmailValid)
   }
   if(e.target.name==='password'){
    const isPasswordValid=e.target.value.length>6;
    const passwordHasNumber=/\d{1}/.test(e.target.value)
    console.log(isPasswordValid && passwordHasNumber)
   }
  }
  const handleSubmit=()=>{

  }

  return (
    
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleGoogleSignIn}>Sign Out</button>:<button onClick={handleGoogleSignOut}>Sign In</button>
      }
      {
        user.isSignedIn &&
        <div>
          <p>Welcome, {user.name}</p>
          <p><small>Your Email : {user.email}</small></p>
          <img src={user.photo} alt="img"></img>
        </div>
      }

     <form action="" onSubmit={handleSubmit}>
     <h1>Our Own Authentication</h1>
      <input type="text" name="email" onBlur={handleChange} placeholder="Enter your E-mail" required></input>
      <br />
      <br></br>
      <input type="password" name="password"  onBlur={handleChange} id="" placeholder="Enter your password" required ></input>  
      <br></br>
      <br />
     <input type="submit" value="Submit"></input>
     </form>
    </div>
  );
}

export default App;

 


// <button onClick={handleGoogleSignIn}>Sign in using google</button>
// <h1>Name:{user.displayName}</h1>
// <h2>Email:{user.email}</h2>
// <img src={user.photoURL}></img>


// {/* Facebook login */}
// <button onClick={handleFacebookSignIn}>Sign in using Facebook</button>
// <br/>
//   {/* Github login */}
//   <button onClick={handleGithubSignIn}>Sign in using Github</button>







// 
//   
//   var fbProvider = new firebase.auth.FacebookAuthProvider();
//   var githubProvider = new firebase.auth.GithubAuthProvider();
//   const handleGoogleSignIn=()=>{
//     firebase.auth()
//     .signInWithPopup(provider)
//     .then(result => {
//        var user=result.user;
//       var credential = result.credential;
//      var token = credential.accessToken;
//       var user = result.user;
//     setUser(user);
//       console.log(user);
     
//       }).catch((error) => {
  
//       var errorCode = error.code;
//       var errorMessage = error.message;
    
//       var email = error.email;
    
//       var credential = error.credential;
//       console.log(errorCode,errorMessage);
     
//     });
  
//   }
//   // facebook login method


//   const handleFacebookSignIn=()=>{
//     firebase
//   .auth()
//   .signInWithPopup(fbProvider)
//   .then(result => {
//      var credential = result.credential;
//       var user = result.user;
//    var accessToken = credential.accessToken;
//   setUser(user);
//   console.log(user);

// })
//   .catch((error) => {
    
//     var errorCode = error.code;
//     var errorMessage = error.message;
 
//     var email = error.email;
   
//     var credential = error.credential;
//     console.log(errorCode,errorMessage,email,credential);

//   });
//    }
//   // Github loging///
//   const handleGithubSignIn=()=>{
//     firebase
//     .auth()
//     .signInWithPopup(githubProvider)
//     .then((result) => {
      
//   var user = result.user;
//   setUser(user);
//   console.log(user);
      
//     }).catch((error) => {
     
//       var errorCode = error.code;
//       var errorMessage = error.message;
     
//       var email = error.email;

//       var credential = error.credential;
//       console.log(errorCode,errorMessage,email,credential);
//     });
//   }
