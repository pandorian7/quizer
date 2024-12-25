<script>
  import Container from "$lib/Components/Container.svelte";
  import Card from "$lib/Components/Card/Card.svelte";
  import CardTitle from "$lib/Components/Card/CardTitle.svelte";
  import CardBody from "$lib/Components/Card/CardBody.svelte";
  import CardFooter from "$lib/Components/Card/CardFooter.svelte";
  import Dial from "$lib/Components/Dial.svelte";

  const { data } = $props();

  let quiz = $state(data.quiz);

  const raioOnChange = (questionIndex, answerIndex) => {
    quiz.questions[questionIndex].answers.forEach((answer, index) => {
      if (index === answerIndex) {
        answer.is_correct = true;
      } else {
        answer.is_correct = false;
      }
    });
  };

  const clearAllAnswers = (quiestionIndex) => {
    quiz.questions[quiestionIndex].answers.forEach((answer) => {
      answer.is_correct = false;
    });
  };

  const on = {
    answerDelete: (questionIndex, answerIndex) =>
      quiz.questions[questionIndex].answers.splice(answerIndex, 1),
    questionDelete: (questionIndex) => quiz.questions.splice(questionIndex, 1),
  };

  $effect(() => {
    // on reload this will make sure that the data is updated
    quiz = data.quiz;
  });
</script>

{#snippet answerbar(answer, multiple, onRadioChange, onAnswerDelete)}
  <div class="textbar" style:display="flex">
    {#if multiple}
      <input type="checkbox" bind:checked={answer.is_correct} />
    {:else}
      <input
        type="radio"
        checked={answer.is_correct}
        onchange={onRadioChange}
      />
    {/if}
    <input type="text" bind:value={answer.answer} style:flex="1" />
    <button
      class="actionBtn small"
      style:background-color="var(--danger-color)"
      onclick={onAnswerDelete}>Delete</button
    >
  </div>
{/snippet}

{#snippet questionBox(question, questionIndex)}
  <Card --card-padding="0">
    <CardTitle
      ><div style:padding="10px">
        <textarea class="editableTextArea" bind:value={question.question}
        ></textarea>
      </div></CardTitle
    >
    <CardBody --card-body-background="rgb(144, 144, 144)" --card-body-margin="0"
      ><div style:padding="10px" style:font-family="arial">
        {#each question.answers as answer, answerIndex}
          {@render answerbar(
            answer,
            question.multiple_answers,
            () => raioOnChange(questionIndex, answerIndex),
            () => on.answerDelete(questionIndex, answerIndex)
          )}
        {/each}
        <div style:display="flex">
          <input type="text" style:flex="1" /><button
            class="actionBtn small"
            style:background-color="var(--secondary-color)">Add</button
          >
        </div>
      </div></CardBody
    >
    <CardFooter
      ><div style:display="flex" style:align-items="center">
        <div class="textbar">
          <input
            type="checkbox"
            bind:checked={question.multiple_answers}
            id="question-{question.id}-multiple"
            onchange={() => clearAllAnswers(questionIndex)}
          />
          <label for="question-{question.id}-multiple">Multiple Answers</label>
        </div>
        <div style:margin-left="auto">
          <button
            class="actionBtn"
            style:background-color="var(--danger-color)"
            onclick={() => on.questionDelete(questionIndex)}>Delete</button
          >
        </div>
      </div></CardFooter
    >
  </Card>
{/snippet}

<Dial onclick={() => {}} text="Save" />

<div style:margin-top="2rem">
  <Container>
    <Card --card-background="rgb(57, 57, 57)">
      <CardTitle
        ><textarea class="editableTextArea" bind:value={quiz.title}
        ></textarea></CardTitle
      >
    </Card>
    {#each quiz.questions as question, questionIndex}
      {@render questionBox(question, questionIndex)}
    {/each}
  </Container>
</div>

<style>
  .actionBtn {
    border: none;
    margin: 0;
    padding: 0.6rem 1rem;
    background-color: var(--secondary-color);
    color: white;
    cursor: pointer;
  }
  .textbar {
    padding: 5px;
  }

  textarea.editableTextArea {
    width: 100%;
    box-sizing: border-box;
    resize: vertical;
    background-color: inherit;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    outline: none;
  }
  .small {
    padding: 0.3rem 0.6rem;
  }
</style>
