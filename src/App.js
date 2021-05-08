import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import axios from 'axios'
import './App.css';


function App2() {
  return (<div className='app'>
  <h1>Comp 426 project</h1>
  <Navigation />
  <Main />
</div>);
}

const Navigation = () => (
  <nav>
    <ul>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/Trivia'>Trivia</NavLink></li>
      <li><NavLink to='/Pokemon'>Pokemon</NavLink></li>
      <li><NavLink to='/NASA'>NASA</NavLink></li>
      <li><NavLink to='/Dogs'>Dogs</NavLink></li>
      <li><NavLink to='Kanye'>Kanye West</NavLink></li>
      <li><NavLink to='QuickClick'>QuickClick</NavLink></li>
    </ul>
  </nav>
);

function Home() { return (
  <div className='home'>
    <h1>Welcome to my Comp 426 website!</h1>
    <p>Click a subject on the navigation pane to see what I've created.</p>
  </div>
)
}

function QuickClick() { return (
  <div className='home'>
    <h2>How many times can you click in 10 seconds?</h2>
    <ClickFast/>
  </div>
)
}

class ClickFast extends React.Component {
  constructor(...args) {
    super(...args);
  this.state = {
    Info: [],
    GameStart: false,
    Count: 0,
    seconds: 10,
    disabled: false,
  };
  this.timer = 0;
  this.gameStart = this.gameStart.bind(this);
  this.captureClicks = this.captureClicks.bind(this);
  this.timerFoundation = this.timerFoundation.bind(this);
  this.timerStart = this.timerStart.bind(this);
  this.finalScore = this.finalScore.bind(this);
}

componentDidMount() {
  this.setState({seconds: 10});
  this.setState({disabled:false});
}
componentWillUnmount() {
  clearInterval(this.timer);
}
gameStart() {
  this.setState({GameStart: true});
}

captureClicks() {
  this.setState({Count: this.state.Count+1});
}

timerFoundation() {
  if (this.timer === 0 && this.state.seconds > 0) {
    this.timer = setInterval(this.timerStart, 1000);
  }
}

timerStart() {
  this.setState({seconds: this.state.seconds -1});
  if (this.state.seconds === 0) {
    this.setState({disabled:true});
    clearInterval(this.timer);
  }
}

finalScore() {
  if (this.state.Count<= 20) {
    return (<div><div>wow my grandma could click faster than you.</div> <div>your final score was {this.state.Count} clicks per second</div></div>);
  }
  if (this.state.Count > 20 && this.state.Count <= 50) {
    return (<div><div>I know you can click faster than that!</div> <div>your final score was {this.state.Count} clicks per second</div></div>); 
  }
  if (this.state.Count > 50 && this.state.Count <= 70) {
    return (<div><div> You've got some fast fingers! </div> <div>your final score was {this.state.Count} clicks per second</div></div>);
  }
  if (this.state.Count > 70 && this.state.Count <= 80) {
    return (<div><div>GODLY FINGERS.</div> <div>your final score was {this.state.Count} clicks per second</div></div>);
  }
  if (this.state.Count > 80) {
    return (<div><div>You've got to be a bot, theres no other way lol.</div> <div>your final score was {this.state.Count} clicks per second</div></div>)
  }
}

render() { return(
  <div key = 'Click'>
    {this.state.Info.quote}
    <div>
    { (this.state.disabled)? 
      <div> 
        {this.finalScore()}
      </div>
    :
      this.state.GameStart ?
      <div > 
        <div className = "timer">
        timer: {this.state.seconds}
        </div>
        <div className = "scorebox">
        score:  {this.state.Count}
        </div>
        <div className= "center">
        <button id= "click" onClick={() => this.captureClicks()} disabled ={this.state.disabled}>click me!</button>
        </div>
      </div>
      :
      <div className= "center"> 
        <button id="click" onClick={() => {this.gameStart(); this.timerFoundation()}}> Click to start </button>
      </div>
    }
  </div>
  </div>);
}
}

function Kanye() { return (
  <div className='home'>
    <h1>A random Kanye Quote blessed you!</h1>
    <West/>
  </div>
)
}

class West extends React.Component {
  constructor(...args) {
    super(...args);
    
  this.state = {
    Info: [],
  };
  this.newAxios = this.newAxios.bind(this);
}
  componentDidMount() {
    axios.get(
    'https://api.kanye.rest/')
    .then(response => response.data)
    .then( (data) => {
      this.setState({Info: data})
    }) 
  }

  newAxios() {
    axios.get(
    'https://api.kanye.rest/')
    .then(response => response.data)
    .then( (data) => {
      this.setState({Info: data}) 
    })
  }

  render() { return(
  <div key = 'Kanye'>
    {this.state.Info.quote}
    <div>
      <button onClick={() => this.newAxios()}>New Quote</button>
    </div>
  </div>);
  
  }
}

function Dogs() { return (
  <div className='dogs'>
    <h1> Look at cute dogs here! </h1>
    <Dogsapi/>
  </div>
)
}

class Dogsapi extends React.Component {
  constructor(...args) {
    super(...args); 
  this.state = {
    Info: [],
  };
  this.newAxios = this.newAxios.bind(this);
}
  componentDidMount() {
    axios.get(
    'https://api.thedogapi.com/v1/images/search')
    .then(response => response.data)
    .then( (data) => {
      this.setState({Info: data})
    }) 
}

newAxios() {
  axios.get(
    'https://api.thedogapi.com/v1/images/search')
    .then(response => response.data)
    .then( (data) => {
      this.setState({Info: data}) 
    })
}


render() { return(
  <div key = 'Dogs'>
    <DogsDetail dogs = {this.state.Info}/>
    <button onClick = {() => this.newAxios()}> Next Animal</button>
  </div>); 
}
}
const DogsDetail = ({ dogs }) => {
  if(dogs[0] === undefined){
      return(
        <div>
        Loading...
        </div>
      );
  } 
  else {
    return (
      <div>
        <img src={dogs[0].url} alt = 'dogs' /> 
      </div>
    );
  }
};





function NASA() { return (
  <div className='home'>
    <h1>NASA's picture of the day:</h1>
    <NASAapi/>
  </div>
)
}

class NASAapi extends React.Component {
  constructor(...args) {
    super(...args);
    let today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  this.state = {
    Info: [],
    currentDate: date,
  };
}
  componentDidMount() {
    axios.get(
    'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=' + this.state.currentDate)
    .then(response => response.data)
    .then( (data) => {
      this.setState({Info: data})
  }) 
  }

  render() { return(
  <div key = 'NASAphoto'>
    <NASADetail NASA = {this.state.Info}/>
  </div>);
  }
}
const NASADetail = ({ NASA }) => {
  if(NASA.url === undefined){
    return(
      <div>
        Loading...
      </div>
    );
  } 
  else {
    return (
      <div>
        <div>{NASA.date}</div>
        <img src={NASA.url} alt ={NASA.media_type}/>
        {NASA.explanation}
      </div>
    );
  }
};


function Pokemon() {
  return (
    <div>
      <h1>Random Pokemon Generator!</h1>
      <p> click the "New Pokemon" button to bring up a random first generation pokemon!</p>
      <PokemonGenerator/>
    </div>
  )
}

class PokemonGenerator extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
    pokeInfo: [],
    };
    this.randomNumGenerator = this.randomNumGenerator.bind(this);
    this.newAxios = this.newAxios.bind(this);
  }
  componentDidMount() {
    axios.get(
    'https://pokeapi.co/api/v2/pokemon/' + this.randomNumGenerator())
    .then(response => response.data)
    .then( (data) => {
      this.setState({pokeInfo: data})
    })
}
  randomNumGenerator() {
    return Math.floor(Math.random()*151);
  }
  newAxios() {
    axios.get(
      'https://pokeapi.co/api/v2/pokemon/' + this.randomNumGenerator())
      .then(response => response.data)
      .then( (data) => {
        this.setState({pokeInfo: data})
      })
  }
render() { return(
  <div key = 'allpokemon'>
    <PokemonDetail pokemon = {this.state.pokeInfo}/>
    <button onClick = {() => this.newAxios()}> New Pokemon</button>
  </div>);
}
}

const PokemonDetail = ({ pokemon }) => {
  if(pokemon.sprites === undefined){
      return(
        <div>
        Loading...
        </div>
      );
  } 
  else {
    return (
      <div>
        <div>{pokemon.name}</div>
        <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
        {pokemon.id}
      </div>
    );
  }
};

function Trivia() { return(
  <div className='triviaHome'>
    <h1>Welcome to Trivia!</h1>
    <p> Let's see how many questions you can answer correctly!</p>
    <Game/>
  </div>
);
}

class TriviaInfoHub extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
    triviaInfo: [],
    amCorrect: 0,
    clickedButton: 0,
    };
  this.increment2 = this.increment2.bind(this);
  this.newAxios = this.newAxios.bind(this);
  this.stringChanger = this.stringChanger.bind(this);
  this.fullGame2 = this.fullGame2.bind(this);
  this.incrementButton = this.incrementButton.bind(this);
}
  componentDidMount() {
    axios.get(
    'https://opentdb.com/api.php?amount=1&type=multiple')
    .then(response => response.data)
    .then( (data) => {
      this.setState({triviaInfo: data})
    })
  }
  fullGame2() {
    this.props.fullGame1();
  }
 increment2(){
    this.props.amCorrect();
  }
  incrementButton(){
    this.setState({clickedButton: this.state.clickedButton+1})
  }
  newAxios() {
    axios.get(
      'https://opentdb.com/api.php?amount=1&type=multiple')
    .then(response => response.data)
    .then( (data) => {
        this.setState({triviaInfo: data})      
    })
    if (this.state.clickedButton>0) { 
      this.setState({clickedButton:0})
    } else { 
      this.fullGame2();
    }
  }

  stringChanger(textFromData) {
    let text = textFromData.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacut;/,"é").replace(/&ndash;/,"-");
    return <div> {text} </div>
  }
   
  render() { return(
    <div key = 'block'>
          {(this.state.triviaInfo.results ? this.state.triviaInfo.results.map((Info) => {        
           return <div key = 'qablock'>
              <div className="questionbox">
              <div>
                <h3>{this.stringChanger(Info.question)} </h3>
              </div>
              <Buttons key = {Info.incorrect_answers} Info = {Info} amCorrect2 = {() => this.increment2()} fullGame2inc = {() => this.fullGame2()} clickedButton = {() => this.incrementButton()}/>
              </div>
              <button onClick = {() => this.newAxios()}>Next Question</button>
           </div> })
          : <p>"loading..."</p>)}
    </div>);
  }
}
class Game extends React.Component {
  constructor(...args) {
    super(...args);
  this.state = {
    amCorrect:0,
    gameCount:0
  };
  this.increment = this.increment.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.fullGame = this.fullGame.bind(this);
}
  fullGame() {
    this.setState({gameCount: this.state.gameCount+1})
  }
  increment(){
    this.setState({
        amCorrect: this.state.amCorrect+1
    })
  }
  handleClick() {
    return (<TriviaInfoHub amCorrect = {() => this.increment()}/>);
  }
  render() { return(<div key = "game">
    <h4>amount correct: {this.state.amCorrect} / {this.state.gameCount}</h4>
    <TriviaInfoHub amCorrect = {() => this.increment()} fullGame1 = {() => this.fullGame()}/>  
    </div>
  )}
}


class Buttons extends React.Component {
  constructor (props) {
    super(props);
    this.Info= props.Info;
    this.state = {
      everyAnswer: [],
      disabled: false,
      prevProps: []
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    let Arr = [];
    let Arr2 = [0,1,2,3]
    let answerArr = [];
    let everyAnswer = [];

    if (this.Info !== this.props.Info) {
      this.setState({Info: this.props.Info})
    }
    
    while (Arr2.length >= 1) {
      let rNum = Math.floor(Math.random()*Arr2.length);
      let pos = Arr2[rNum];
      Arr.push(pos);
      Arr2.splice(rNum, 1);
    }
  
    for (let i = 0; i < 3; i++) {
      answerArr.push(this.Info.incorrect_answers[i]);
    }
    answerArr.push(this.Info.correct_answer);

    while (Arr.length >= 1) {
      this.state.everyAnswer.push(answerArr[Arr.pop()]); 
    }
    this.setState(everyAnswer);
  }

  handleClick(buttonClicked) {
    buttonClicked.preventDefault();
    if (this.state.disabled) {
      return;
    }
    if (buttonClicked.target.id === this.Info.correct_answer) {
      this.props.amCorrect2();
      alert('correct! the answer was:' + this.Info.correct_answer);
    } else {
      alert('wrong! correct answer was: ' + this.Info.correct_answer);
    }
    this.setState({disabled:true});
    this.props.fullGame2inc(); 
    this.props.clickedButton();
  }
  
  render() {return(
    <div key = {this.props.Info}>  
      {(this.state.everyAnswer ? 
      <div key = {this.props.Info}>   
      <button id = {this.state.everyAnswer[this.state.everyAnswer.length-1]} key = {this.state.everyAnswer[this.state.everyAnswer.length-1]} disabled ={this.state.disabled} onClick={(e) => this.handleClick(e)}> {this.state.everyAnswer.pop()}</button>
      <button id = {this.state.everyAnswer[this.state.everyAnswer.length-1]} key = {this.state.everyAnswer[this.state.everyAnswer.length-1]} disabled ={this.state.disabled} onClick={(e) => this.handleClick(e)}> {this.state.everyAnswer.pop()}</button>
      <button id = {this.state.everyAnswer[this.state.everyAnswer.length-1]} key = {this.state.everyAnswer[this.state.everyAnswer.length-1]} disabled ={this.state.disabled} onClick={(e) => this.handleClick(e)}> {this.state.everyAnswer.pop()}</button>
      <button id = {this.state.everyAnswer[this.state.everyAnswer.length-1]} key = {this.state.everyAnswer[this.state.everyAnswer.length-1]} disabled ={this.state.disabled} onClick={(e) => this.handleClick(e)}> {this.state.everyAnswer.pop()}</button> 
      </div>
      : 'loading...')}  
    </div>
  );
  }
}

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/Trivia' component={Trivia}></Route>
    <Route exact path='/Pokemon' component={Pokemon}></Route>
    <Route exact path='/NASA' component={NASA}></Route>
    <Route exact path='/Dogs' component={Dogs}></Route>
    <Route exact path='/Kanye' component={Kanye}></Route>
    <Route exact path='/QuickClick' component={QuickClick}></Route>
  </Switch>
);

export default App2;