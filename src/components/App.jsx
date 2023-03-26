import React, { useReducer } from 'react';

import PropTypes from 'prop-types';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

function feedbackReducer(state, action) {
  switch (action.type) {
    case 'good':
      return { ...state, good: state.good + action.payload };
    case 'neutral':
      return { ...state, neutral: state.neutral + action.payload };
    case 'bad':
      return { ...state, bad: state.bad + action.payload };
    default:
      throw new Error(`Unsuported action type ${action.type}`);
  }
}
const initialState = {
  good: 0,
  neutral: 0,
  bad: 0,
};
function App() {
  const [state, dispatch] = useReducer(feedbackReducer, initialState);
  const { good, neutral, bad } = state;
  const countTotalFeedback = () => {
    const stateValues = Object.values(state);
    return stateValues.reduce((acc, value) => {
      return acc + value;
    }, 0);
  };
  const total = countTotalFeedback();
  const countPositiveFeedbackPercentage = () => {
    return total === 0 ? 0 : ((good / total) * 100).toFixed();
  };
  const positivePercentage = countPositiveFeedbackPercentage();
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={state}
          onLeaveFeedback={dispatch}
        ></FeedbackOptions>
      </Section>
      <Section title="Statistics">
        {total === 0 ? (
          <Notification message="There is no feedback"></Notification>
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          ></Statistics>
        )}
      </Section>
    </div>
  );
}

App.propTypes = {
  state: PropTypes.shape({
    good: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
    bad: PropTypes.number.isRequired,
  }),
};

export default App;
