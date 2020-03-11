import React from 'react';
import Fade from 'react-reveal/Fade';
import Trash from './icons/trash.svg';
import Mind from './icons/mind.svg';
import './App.scss';
import {
  CSSTransition
} from 'react-transition-group';

const status = [
  {
    code: 'mulai',
    label: 'Mulai',
    color: 'green'
  },
  {
    code: 'berhenti',
    label: 'Berhenti',
    color: 'red'
  }
]

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      status:'berhenti',
      habit:'',
      habits : [
        {
          id: 0,
          status: 'berhenti',
          habit: 'Merokok'
        },
        {
          id: 1,
          status: 'mulai',
          habit: 'Tidur'
        },
        {
          id: 2,
          status: 'mulai',
          habit: 'Makan'
        }
      ]
    }

    // this.addHabit = this.addHabit.bind(this)
  }

  addHabit = (event) => {
    event.preventDefault();

    const status = event.target.status.value
    const habit = event.target.habit.value

    if(status && habit) {
      // this.setState((prevState) => {
      //   return {
      //     habits: [...prevState.habits,{status: status,habit:habit}]
      //   }
      // })
      this.setState({
        id: this.state.id + 1,
        habits: [
          ...this.state.habits,
          { id: this.state.id, status: this.state.status, habit: this.state.habit || '-'}
        ],
        status: 'berhenti',
        habit: ''
      })
    }
  }

  removeHabit = (event) => {
    this.setState({
      habits: this.state.habits.filter(item =>
        item.id !== +event.currentTarget.getAttribute('data-id')
      )
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div id="habit-app">
        <div className="header">
          <img src={Mind} />
          <h1>Habit App</h1>
        </div>
        <div className="form">
          <form id="habitForm" onSubmit={this.addHabit}>
            <fieldset>
              <div className="fieldgroup status">
                <div className="field">
                  <select name="status" id="status" value={this.state.status} onChange={this.handleChange}>
                    {status.map((stat, index) => (
                      <option key={index} value={stat.code}>{stat.label}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <input name="habit" id="habit" value={this.state.habit} onChange={this.handleChange} />
                </div>
                <div className="field action">
                  <button className="action submit primary"><span>Simpan</span></button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <Fade top cascade>
        <ul className="habit-list">
          {this.state.habits.map((habit, index) => (
            <li key={index}>
              <span className={"status " + habit.status}>{habit.status}</span>
              <strong className="habit">{habit.habit}</strong>
              <button data-id={index} onClick={this.removeHabit} type="button" className="remove" aria-label="Remove"><img src={Trash} /></button>
            </li>
          ))}
        </ul>
        </Fade>
      </div>
    )
  }
}

export default App;
