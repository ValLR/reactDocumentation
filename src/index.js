import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


function Welcome(props){//<---the simplest way to define a component: a javascript function
	return <h1>Hello, {props.name}</h1>
}

//the same, but now using ES6 CLASS
class Welcome2 extends React.Component{
	render() {
		return <h1>Hello, {this.props.name}</h1>
	}
}
////////// I'm not sure how CLASSES work

//Now, with props
/*const element = <Welcome name= "Sara"/>;//llamamos a la función en un tag
ReactDOM.render(
	element,
	document.getElementById("root")
);*/


////// Now we create a Salut component that renders Welcome many times
function Salut() { /*this function gives format, welcome gives prints each one*/
	return(
		<div>
			<Welcome name="Sara"/>
			<Welcome name="Magdalene"/>
			<Welcome name="Ester"/>
		</div>
	);
}
ReactDOM.render(
	<Salut />,
	document.getElementById("root")
);

///Extracting Components-> splitting componenets into smaller components
///"COMMENT" COMPONENT:


function formatDate(date){
  return date.toLocaleDateString();
}
/*Here the component, it accepts:
author->an object
text-> a string
date-> a date i'm generating there at the top
*/

//////////////////////////super nested component//////////////////////////
/*
function Comment(props){
  return(
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
*/
////////////////////////////////////////////////////////////////////////

/*there's a lot of nesting in this one, so let's extract a few components*/
///////FIRST, AVATAR

function Avatar(props){
	return(
        <img className="Avatar"
          src={props.user.avatarUrl}
          alt={props.user.name}
        />
	);
}/*the AVATAR doesn't need to know that it's being rendered inside a Comment
That's why we renamed its prop from author to user.
*/

////////////Now, LET'S SIMPLIFY COMMENT/////////////////////
/*function Comment(props){
  return(
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author}/>
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}*/
//////////////////////////////////////////////////////////

///EXTRACTING UserInfo

function UserInfo(props){
	return(
      <div className="UserInfo">
        <Avatar user={props.user}/>
        <div className="UserInfo-name">
          {props.user.name}
        </div>
      </div>		
	)
}

////////////Now, LET'S SIMPLIFY COMMENT AGAIN/////////////////////
function Comment(props){
  return(
    <div className="Comment">
    <UserInfo user={props.author}/>
    	<div className="Comment-text">
        	{props.text}
      	</div>
      	<div className="Comment-date">
       		{formatDate(props.date)}
      	</div>
    </div>
  );
}
///////////////////////////////////////////////////////////////////

//now, for let's create a comment const
const comment ={
	date: new Date(), //here you generate a date
	text:
		"I'm starting to like react. I think.",
	author:{
		name: "Val LR",
		avatarUrl:
			"http://placekitten.com/g/64/64",
	},
};
///AND NOW WE RENDER!
ReactDOM.render(
	<Comment
		date={comment.date}
		text={comment.text}
		author={comment.author}
	/>,
	document.getElementById("another")
);

//Props are READ-ONLY, the function/class must never modify its own props
function  sum(a,b){
	return a+b; //"PURE" it doesn't attempt to change their inputs.
				//ALWAYS returns the SAME RESULT for the SAME INPUTS
}

function withdraw(account,amount){
	account.total -= amount; //"IMPURE" it changes its own input.
}

////////////////////////////////////////////////////////////////////////////////////
/*STATE AND LIFECYCLE*/



/*function tac(){
	const element = (
		<div>
			<h1>Hi, there</h1>
			<h2>It is {new Date().toLocaleTimeString()}.</h2>
		</div>
	);
	ReactDOM.render(
		element,
		document.getElementById("first")
	);
}*/


//Now we'll make the Clock component truly reusable and encapsulated.
//It will set up its own timer and update itself every second

/*function Clock(props){
	return(
		<div>
			<h1>Hi, there</h1>
			<h2>It is {props.date.toLocaleTimeString()}.
			</h2>
		</div>
	);
}
function tac(){
// --> but Clock updates de User Interface, ideally we want to wirte this once
// and have the Clock update itself:
	ReactDOM.render(
		<Clock/>,/*THIS WE WANT TO CHANGE*/
		/* what we want to write: <Clock/>,
		document.getElementById("first")
	);
}

setInterval(tac,1000);
*/

/*NOW WE LEARN HOW TO TURN functions TO A class*/

/*class Clock extends React.Component{
	render(){
		return(
			<div>
				<h1>Hi, there</h1>
				<h2>It is {this.props.date.toLocaleTimeString()}.
				</h2>
			</div>
		);
	}
}*/
//when we use this classes, we can use ADDITIONAL FEATURES, such as LOCAL STATE and LIFECYCLE HOOKS

/*NOW WE'RE GONNA ADD LOCAL STATE TO A CLASS*/
class Clock extends React.Component {
//we add a CLASS CONSTRUCTOR, passing props as the base constructor
	constructor(props) {
		super(props);
		this.state = { date: new Date() };
//btw, we're saving the timer ID right on this
	}
/*METHODS!*/
	componentDidMount() {
//this runs after the component output has been rendered to the DOM. Good place for a timer
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);		
	}

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }



//1.we change this.props.date --> this.state.date 
	render(){
		return(
			<div>
				<h1>Hi, there</h1>
				<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
			</div>
		);
	}
}

ReactDOM.render(
	<Clock/>,
	document.getElementById("first")
);

/*And now we make the clock update itself every second by...
	adding LIFECYCLE methods to a Class
We want to:
1) SET UP A TIMER whenever our component Clock is rendered to de Dom
for the first time ("MOUNTING")
2) CLEAR SAID TIMER whenever the DOM produced by Clock is removed ("REMOVED")

SO, we're gonna need special METHODS on the component class to run some code when a component
mounts and unmounts
*/








