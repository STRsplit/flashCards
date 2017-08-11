import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import './AddCard.css';
import AddCard from './AddCard';
const logo = 'http://static1.squarespace.com/static/522a22cbe4b04681b0bff826/t/581cc65fe4fcb5a68ecd940c/1478280803080/hrhq-avatar.png?format=1000w'
class App extends Component {
  constructor(){
    super();
    this.state = {
      offset: 25,
      questionPool: [],
      isLoading: true,
      curr: 0,
      displayAnswer: false,
      addCard: false,
      effects: {
        flip: false,
        slide: false
      }
    }
    this.getFlashCards = this.getFlashCards.bind(this)
    this.getNextCard = this.getNextCard.bind(this)
    this.showAnswer = this.showAnswer.bind(this)
    this.displayCardForm = this.displayCardForm.bind(this)
  }
  componentWillMount () {
  
  }
  async getFlashCards () {
    let { offset } = this.state
    try {
      let {data: [ [...questions] ]} = await axios.get('http://localhost:3000/cards/html')
      this.setState({
        questionPool: questions,
        isLoading: false,
        curr: 0
      })
    } catch (e) {
      console.log('ERROR', e)
    }
  }
  getNextCard () {
    const { curr, effects: currEffects } = this.state
    let i = curr + 1;
    this.setState({effects: { ...currEffects, slide: true }}, () => {
      setTimeout(() => { this.setState({curr: i, displayAnswer: false, effects: {...currEffects, slide: false}}); }, 1500)
    })
  }

  showAnswer () {
    const { effects: currEffects } = this.state
    this.setState({effects: { ...currEffects, flip: true }}, () => {
      setTimeout(() => { this.setState({displayAnswer: true, effects: {...currEffects, flip: false}}); }, 1000)
    })
  }

  displayCardForm (e) {
    e.preventDefault()
    this.setState({addCard: !this.state.addCard})
  }

  render () {
    const { addCard, curr, displayAnswer, effects: { slide, flip }, isLoading, questionPool = null} = this.state
    let anim = slide ? 'slide' : flip ? 'flip' : '';
    let questionCard = (<div></div>)
    if (!isLoading) {
      const { id, question, answer } = questionPool[curr]
      questionCard = (
        <div className={'FlashCard ' + anim}>
          <ul>
            <li>{id}</li>
            <li>{displayAnswer ? <span style={{color: 'red'}}>{question}</span> : question}
            </li>
            <li>{displayAnswer ? answer : ''}</li>
          </ul>
        </div>
      )
    }

    const buttonState = isLoading ? <div className="Card-Buttons"><button onClick={this.getFlashCards}>Get Cards</button></div> : <div className="Card-Buttons"><button onClick={this.getNextCard}>Get Next Card</button> <button onClick={this.showAnswer}>See Answer</button></div>

    const addCardClick = <div className="AddCard-Link"><a onClick={this.displayCardForm}>{addCard ? 'I\'m all done' : 'Add your own cards'}</a></div>

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Hacker</h2>
        </div>
        <div className="App-Inner-Container">
          <div className="FlashCard-Container">
            {questionCard}
          </div>
          {buttonState}
        </div>
        <div className="AddCard-Container">
          <div className="AddCard">
            {addCard ? <AddCard /> : ''}
            {addCardClick}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
