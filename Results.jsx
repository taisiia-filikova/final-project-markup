import { Link } from 'react-router-dom';

import cat from '../../img/cat.svg';
import s from './Results.module.scss';
import { VictoryPie, VictoryLabel } from 'victory';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as operation from '../../redux/questions/questions-operations';
import action from '../../redux/questions/questions-action';

export default function Results({ answers, setAnswers }) {
  const dispatch = useDispatch();
  const rightAnswers = useSelector(state => state.questions.rightAnswer);
  const curentTest = useSelector(state => state.questions.curentTest);
  const percentRightAnswers = Math.round((100 / 12) * rightAnswers);
  const resultText = { title: '', sentence: '' };
  switch (true) {
    case rightAnswers <= 4:
      resultText.title = 'Bad!';
      resultText.sentence = 'Prepare better and take the test again.';
      break;
    case rightAnswers <= 9:
      resultText.title = 'Not bad!';
      resultText.sentence = 'But you still need to learn some materials.';
      break;
    case rightAnswers <= 11:
      resultText.title = 'Good!';
      resultText.sentence = 'You prepared well.';
      break;
    case rightAnswers > 11:
      resultText.title = 'Perfectly!';
      resultText.sentence = 'You have a wonderful result.';
      break;
    default:
      break;
  }
  const onTryAgain = () => {
    dispatch(action.getRightAnswersSuccess(null));
    setAnswers([]);
  };

  useEffect(() => {
    console.log('curentTest in Results.js:', curentTest);
    dispatch(operation.getRightAnswers(answers, curentTest));
  }, [dispatch, answers, curentTest]);
  return (
    <div className={s.mainConteiner}>
      <h2 className={s.title}>Results</h2>
      <p className={s.textContent1}>[ Testing theory_]</p>
     <hr className={s.lineHorizontal} />
      <div className={s.imgGraf}>
        <VictoryPie
          width={500}
          startAngle={90}
          endAngle={495}
          responsive={true}
          animate={{
            duration: 1000,
          }}
          colorScale={['#FF6B01', '#D7D7D7']}
          style={{
            labels: {
              fontSize: 23,
              fontWeight: 500,
              fill: '#000000',
            },
          }}
          data={[
            {
              x: `${percentRightAnswers}% Correct`,
              y: rightAnswers,
            },
            {
              x: `${100 - percentRightAnswers}% Incorrect`,
              y: 12 - rightAnswers,
            },
          ]}
          labelComponent={
            <VictoryLabel className="myLabel" textAnchor="middle" />
          }
        />
      </div>
      <div className={s.resultTextContent}>
        <p>
          Correct answers - <span>{rightAnswers}</span>
        </p>
        <span className={s.lineVertical}></span>
        <p>
          Total questions - <span>12</span>
        </p>
      </div>
      <img className={s.catImage} src={cat} alt="" />
      <p className={s.grateText}>{resultText.title}</p>
      <p className={s.sentenceText}>{resultText.sentence}</p>
      <Link
        to={{
          pathname: `/`,
        }}
      >
        <button className={s.btnTryAgain} onClick={onTryAgain}>
          Try again
        </button>
      </Link>
    </div>
  );
}
