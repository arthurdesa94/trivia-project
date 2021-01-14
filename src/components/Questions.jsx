import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { questionCount } from '../store/reducer/user.action';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.buttonDisable = this.buttonDisable.bind(this);
    this.state = {
      timer: 30,
      isDisabled: false,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    const { timer, isDisabled } = this.state;
    if (timer < 1) {
      clearInterval(this.timerID);
      if (!isDisabled) this.buttonDisable();
    }
  }

  startTimer() {
    const TIMER_CLOCK = 1000;
    this.timerID = setInterval(
      () => this.updateTimer(),
      TIMER_CLOCK,
    );
  }

  buttonDisable() {
    this.setState({
      isDisabled: true,
    });
  }

  updateTimer() {
    const TIMER_DECREASE = 1;
    this.setState((previousState) => ({
      timer: previousState.timer - TIMER_DECREASE,
    }));
  }

  handleButtonClick() {
    const { dispatchQuestionCount } = this.props;
    dispatchQuestionCount();
    this.updateScore();
    this.setState({
      timer: 30,
    });
  }

  updateScore() {
    const { timer } = this.state;
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { questionCounter, questions } = this.props;
    const weight = {
      easy: 1,
      medium: 2,
      hard: 2,
    };
    const BASE_SCORE = 10;
    const { difficulty } = questions[questionCounter];
    const questionScore = BASE_SCORE + weight[difficulty] + timer;
    localStorage.setItem('state', JSON
      .stringify({ player: { ...player, score: player.score + questionScore } }));
  }

  render() {
    const { timer, isDisabled } = this.state;
    const { questionCounter, questions } = this.props;
    if (!questions) {
      return <div>Loading...</div>;
    }
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionCounter];
    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <button
          disabled={ isDisabled }
          type="button"
          className="correct-answer"
          data-testid="correct-answer"
          onClick={ this.handleButtonClick }
        >
          { correctAnswer }
        </button>
        {
          incorrectAnswers
            .map((answer, index) => (
              <button
                disabled={ isDisabled }
                key={ answer }
                className="wrong-answer"
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                { answer }
              </button>))
        }
        <p>{ `Tempo: ${timer}s` }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.triviaReducer.results,
  questionCounter: state.userReducer.questionCount,
  isFetching: state.triviaReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchQuestionCount: () => dispatch(questionCount()),
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchQuestionCount: PropTypes.func.isRequired,
  questionCounter: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
