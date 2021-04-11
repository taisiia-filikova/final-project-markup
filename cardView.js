import s from './TestPage.module.css';

const CardView = ({
  questions,
  answers,
  setAnswers,
  questionIndex,
  setIsCompleted,
}) => {
  let isUpdated;

  const handleChoise = e => {
    const currentAnswer = e.target.value;
    updateExistingAnswers(currentAnswer);

    if (!isUpdated) {
      addNewAnswer(currentAnswer);
    }

    chekCompleted();
  };

  const updateExistingAnswers = currentAnswer => {
    const updatedAnswers = [...answers];
    isUpdated = false;

    answers.map((answer, index) => {
      if (answer.questionId === questions[questionIndex].questionId) {
        updatedAnswers[index].answer = currentAnswer;
        setAnswers([...updatedAnswers]);
        isUpdated = true;
        return;
      }
    });
  };

  const addNewAnswer = currentAnswer => {
    setAnswers([
      ...answers,
      {
        questionId: questions[questionIndex].questionId,
        currentAnswer: currentAnswer,
      },
    ]);
  };

  const chekCompleted = () => {
    if (questions.length === answers.length + 1) {
      setIsCompleted(true);
    }
  };

  return (
    <div className={s.testingField}>
      <p className={s.testingQuestion}>
        Question <span className={s.testingAnswers}>{questionIndex + 1}</span><span className={s.slash}>/</span>
        {questions.length}
      </p>

      <h4 className={s.testingQuestionText}>
        {questions[questionIndex].question}
      </h4>

      <hr className={s.testingLine} />

      <ul action="">
        {questions.map((question, index) => (
          <li
            key={question.questionId}
            className={`${index !== questionIndex ? s.hide : ''}`}
          >
            <ul action="">
              {question.answers.map(answer => (
                <li key={answer} className={s.item}>
                  <label>
                    <input
                      className={s.testingInput}
                      type="radio"
                      name={`answer-${question.questionId}`}
                      value={answer}
                      onClick={handleChoise}
                    />
                    <span className={s.answerText}>{answer}</span>
                  </label>
                </li>
              ))}

              <li key="I don't know" className={s.idontknow}>
                <label>
                  <input
                    className={s.testingInput}
                    type="radio"
                    name={`answer-${question.questionId}`}
                    value="I don't know"
                    onClick={handleChoise}
                  />
                  <span className={s.answerText}>I don't know</span>
                </label>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardView;
