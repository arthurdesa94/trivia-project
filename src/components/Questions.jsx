import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { questionCount } from '../store/reducer/user.action';
import './Questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
    this.handleAnswerButtonClick = this.handleAnswerButtonClick.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.handleButtonsState = this.handleButtonsState.bind(this);
    this.timeOut = this.timeOut.bind(this);
    this.state = {
      timer: 30,
      isDisabled: false,
      isVisible: false,
      isRedirect: false,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    const { timer, isVisible } = this.state;
    if (timer < 1 && !isVisible) {
      this.timeOut();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  timeOut() {
    clearInterval(this.timerID);
    this.handleButtonsState();
  }

  startTimer() {
    const TIMER_CLOCK = 1000;
    this.timerID = setInterval(
      () => this.updateTime(),
      TIMER_CLOCK,
    );
  }

  handleButtonsState() {
    const { isDisabled, isVisible } = this.state;
    this.setState({
      isDisabled: !isDisabled,
      isVisible: !isVisible,
    });
  }

  updateTime() {
    const TIMER_DECREASE = 1;
    this.setState((previousState) => ({
      timer: previousState.timer - TIMER_DECREASE,
    }));
  }

  handleAnswerButtonClick({ target: { name } }) {
    this.handleButtonsState();
    clearInterval(this.timerID);
    if (name === 'correct') this.updateScore();
  }

  handleNextButtonClick() {
    const { dispatchQuestionCount, questionCounter } = this.props;
    const NEXT_QUESTIONS_LIMIT = 4;
    if (questionCounter === NEXT_QUESTIONS_LIMIT) this.setState({ isRedirect: true });
    dispatchQuestionCount();
    this.setState({
      timer: 30,
    });
    this.handleButtonsState();
    this.startTimer();
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
    const ASSERTIONS_ADD = 1;
    const { difficulty } = questions[questionCounter];
    const questionScore = BASE_SCORE + weight[difficulty] + timer;
    localStorage.setItem('state', JSON
      .stringify({
        player: {
          ...player,
          score: player.score + questionScore,
          assertions: player.assertions + ASSERTIONS_ADD,
        },
      }));
  }

  render() {
    const { handleAnswerButtonClick, handleNextButtonClick } = this;
    const { timer, isDisabled, isVisible, isRedirect } = this.state;
    const { questionCounter, questions } = this.props;
    if (isRedirect) return <Redirect to="/feedback" />;
    if (!questions) return <div>Loading...</div>;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionCounter];
    return (
      <div>
        <div className="questions-div">
          <p data-testid="question-category">{ category }</p>
          <p data-testid="question-text">{ question }</p>
        </div>
        <button
          disabled={ isDisabled }
          type="button"
          name="correct"
          className="correct-answer"
          data-testid="correct-answer"
          onClick={ (event) => handleAnswerButtonClick(event) }
        >
          { correctAnswer }
        </button>
        {
          incorrectAnswers
            .map((answer, index) => (
              <button
                disabled={ isDisabled }
                name="wrong"
                key={ answer }
                className="wrong-answer"
                type="button"
                onClick={ (event) => handleAnswerButtonClick(event) }
                data-testid={ `wrong-answer-${index}` }
              >
                { answer }
              </button>))
        }
        <div className="time-div">
        <p>{ `Tempo: ${timer}s` }</p>
        </div>
        {
          (isVisible)
          && (
            <button
              type="button"
              data-testid="btn-next"
              className="btn-next"
              onClick={ handleNextButtonClick }
            >
              Próxima
            </button>
          )
        }
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
