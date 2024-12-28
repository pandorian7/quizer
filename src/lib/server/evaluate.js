function evaluate(quiz, response) {
  const scores = quiz.questions.map((question) => {
    const selected = response["selected"][question.id];
    const correct = question.answers
      .filter((ans) => ans.is_correct)
      .map((ans) => ans.id);
    const timetaken = response["time"][question.id];
    const duration = question.duration;
    const n_correct = selected.filter((ansId) =>
      correct.includes(ansId)
    ).length;
    const n_wrong = selected.filter((ansId) => !correct.includes(ansId)).length;
    const question_block_score = Math.max(0, n_correct - n_wrong);
    const time_multiplier = 1 - timetaken / duration;
    const timed_block_score = question_block_score * (1 + time_multiplier);
    const max_block_score = correct.length * 2;
    return [timed_block_score, max_block_score];
  });

  const quiz_block_score = scores.reduce((prv, [timed, max]) => prv + timed, 0);
  const quiz_max_block_score = scores.reduce(
    (prv, [timed, max]) => prv + max,
    0
  );
  const final_score = (quiz_block_score / quiz_max_block_score) * quiz.points;
  const time_taken = Object.values(response["time"]).reduce(
    (prv, cur) => prv + cur,
    0
  );
  return {
    time_taken,
    score: final_score,
    total: quiz.points,
  };
}

export default evaluate;
