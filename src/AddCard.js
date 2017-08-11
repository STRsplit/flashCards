import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './AddCard.css';

class AddCard extends Component {
  constructor(){
    super();
    this.state = {
      scale: 1
    }
  }
  render() {
    return (
    <div className="AddCard-Inner-Container">
      <form>
      <ul>
        <li>
        <label for="card-type">Select Topic</label>
          <select id="card-type" name="newCard">
            <option value="CSS">CSS</option>
            <option value="DATABASE">DATABASE</option>
            <option value="FRAMEWORKS">FRAMEWORKS</option>
            <option value="HTML">HTML</option>
            <option value="JAVASCRIPT">JAVASCRIPT</option>
            <option value="SERVER">SERVER</option>
          </select>
        </li>
        <li>
         <label for="question">Enter Question</label>
          <textarea rows="6" id="question" placeholder="Enter your question"></textarea>
        </li>
        <li>
         <label for="question">Enter Question</label>
         <textarea rows="6" id="answer" placeholder="Enter your answer"></textarea>
        </li>
      </ul>
      <div className="button-container">
        <button type="submit">Submit</button>
      </div>
      </form>
    </div>
    )
  }
}

export default AddCard;