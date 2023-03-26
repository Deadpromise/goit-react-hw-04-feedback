import React, { Component } from "react";

import PropTypes from 'prop-types';
import Statistics from "./Statistics/Statistics";
import FeedbackOptions from "./FeedbackOptions/FeedbackOptions";
import Section from "./Section/Section";
import Notification from "./Notification/Notification";

class App extends Component {
  static propTypes = {
    state: PropTypes.shape({
      good: PropTypes.number.isRequired,
      neutral: PropTypes.number.isRequired,
      bad: PropTypes.number.isRequired,
    })

  }
  state = {
    good: 0,
    neutral: 0,
    bad: 0
  };
  addFeedback = (butId) => {
    for (const review in this.state) {
      review === butId && this.setState(prevState => ({
        [review]: prevState[review] + 1,
      }))
    }
  };
  render() {
    const { good, neutral, bad } = this.state;
    const countTotalFeedback = () => {
            const stateValues = Object.values(this.state);
            return stateValues.reduce((acc, value) => {
                return acc + value;
            }, 0);
        };
    const total = countTotalFeedback();
    const countPositiveFeedbackPercentage = () => {
            return total === 0 ? 0 : (good / total * 100).toFixed();
        }; 
    const positivePercentage = countPositiveFeedbackPercentage(); 
    return <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 40,
        color: '#010101'
      }}
    ><Section title='Please leave feedback'>
        <FeedbackOptions options={this.state} onLeaveFeedback={this.addFeedback}>     
        </FeedbackOptions>
      </Section>
      <Section title='Statistics'>
        {total === 0 ?
        <Notification message='There is no feedback'></Notification> :
        <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        positivePercentage={positivePercentage}>
        </Statistics>}
      </Section>
    </div>
  }
}

export default App;
