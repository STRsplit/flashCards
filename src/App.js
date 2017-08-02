import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      offset: 25,
      questionPool: [],
      isLoading: true,
      curr: 0,
      displayAnswer: false,
    }
    this.getFlashCards = this.getFlashCards.bind(this)
    this.getNextCard = this.getNextCard.bind(this)
    this.showAnswer = this.showAnswer.bind(this)
  }
  componentWillMount() {
  
  }
  async getFlashCards() {
    let { offset } = this.state
    try {
      let {data: [ [...questions] ]} = await axios.get('http://localhost:3000/cards/html')
      this.setState({
        questionPool: questions,
        isLoading: false,
        curr: 0
      })
    } catch(e){
      console.log('ERROR', e)
    }
  }
  getNextCard () {
    let i = this.state.curr + 1;
    if(i === 98){
      this.getFlashCards()
    } else {
      this.setState({curr: i, displayAnswer: false})
    }
  }

  showAnswer(e) {
    e.preventDefault();
    this.setState({
      displayAnswer: true
    })
  }
  render() {
    let questionCard = (<div></div>)
    if(!this.state.isLoading){
    const { questionPool, curr } = this.state
    const { id, question, answer } = questionPool[curr];
    questionCard = (
      <div>
        <ul>
          <li>{id}</li>
          <li>{question}</li>
          <li>{this.state.displayAnswer ? answer : ''}</li>
        </ul>
      </div>
      )
    }

    const buttonState = this.state.isLoading ? <button onClick={this.getFlashCards}>Get Cards</button> : <div><button onClick={this.getNextCard}>Get Next Card</button> <button onClick={this.showAnswer}>See Answer</button></div>
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro"></p>
          <div>
            {questionCard}
          </div>

        {buttonState}
      </div>
    );
  }
}

export default App;
