import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


/*function tac(){
	const element = (
		<div>
			<h1>time</h1>
			<h2>It is {new Date().toLocaleTimeString()}.</h2>
		</div>
	);
	ReactDOM.render(
		element,
		document.getElementById("root")
	);
}

setInterval(tac,1000)*/

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
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
	);
}



