import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import apiService from '../../service/APIservice';
import { testTypes } from '../MainPageView/constants';
import sprite from '../../img/sprite.svg';
import CardView from './CardView';
import s from './TestPage.module.css';

const TestPage = ({ typeQuestions, setTypeQuestions, answers, setAnswers }) => {
  const [questions, setQuestions] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  //   const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetchQuestions();

    async function fetchQuestions() {
      if (typeQuestions === testTypes.tech && !questions) {
        const newQuestions = await apiService.fetchTechQuestions();
        console.log(newQuestions.data);
        setQuestions(newQuestions.data);
        setTotalQuestions(newQuestions.data.length);
        return;
      }

      if (typeQuestions === testTypes.theory && !questions) {
        const newQuestions = await apiService.fetchTheoryQuestions();
        setQuestions(newQuestions.data);
        setTotalQuestions(newQuestions.data.length);
        return;
      }

      console.log('Тест не вибрано!');
    }
  }, []);

  const handlePrevClick = () => {
    setQuestionIndex(questionIndex - 1);
  };

  const handleNextClick = () => {
    setQuestionIndex(questionIndex + 1);
  };

  const handleFinishClick = () => {
    if (!isCompleted) {
      resetTestState();
    }
  };

  const resetTestState = () => {
    setTypeQuestions(null);
    setAnswers([]);
  };

  return (
    <section className={`${s.testing} ${s.container}`}>
      <div className={s.testingHeader}>
        {typeQuestions === testTypes.tech && (
          <p className={s.testingTheory}>
            [ QA technical
            <br />
            training_ ]
          </p>
        )}

        {typeQuestions === testTypes.theory && (
          <p className={s.testingTheory}>
            [ Testing
            <br />
            theory_ ]
          </p>
        )}

        <Link
          className={s.testFinish}
          onClick={handleFinishClick}
          to={{
            pathname: isCompleted ? '/results' : '/',
          }}
        >
          Finish test
        </Link>
      </div>

      {!questions && <p>Loading...</p>}

      {questions && (
        <CardView
          questions={questions}
          answers={answers}
          setAnswers={setAnswers}
          questionIndex={questionIndex}
          setIsCompleted={setIsCompleted}
        />
      )}

      <div
        className={`${s.questionButtonContainer} 
                  ${questionIndex === 0 && s.alignRight} 
                  ${totalQuestions - 1 === questionIndex && s.alignLeft} 
                  `}
      >
        {Boolean(questionIndex) && (
          <button
            type="button"
            onClick={handlePrevClick}
            className={s.questionButton}
          >
            <svg width="24" height="24">
              <use href={sprite + '#arrow-left'}></use>
            </svg>
            <span className={s.buttonText}>Previous question</span>
          </button>
        )}

        {totalQuestions - 1 !== questionIndex && (
          <button
            type="button"
            onClick={handleNextClick}
            className={s.questionButton}
          >
            <span className={s.buttonText}>Next question</span>
            <svg width="24" height="24">
              <use href={sprite + '#arrow-right'}></use>
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

export default TestPage;
