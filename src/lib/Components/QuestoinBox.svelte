<script>
  const { question = $bindable(), onDelete, varient = "edit" } = $props();

  import Card from "./Card/Card.svelte";
  import CardTitle from "./Card/CardTitle.svelte";
  import CardBody from "./Card/CardBody.svelte";
  import CardFooter from "./Card/CardFooter.svelte";

  const on = {
    radioChange: (selectedAns) =>
      question.answers.forEach((ans) => {
        if (ans === selectedAns) {
          ans.is_correct = true;
        } else {
          ans.is_correct = false;
        }
      }),
    answerDelete: (answerIndex) => {
      question.answers.splice(answerIndex, 1);
    },
    answerAdd: () => {
      if (tmpAnswer) {
        question.answers.push({
          id: null,
          answer: tmpAnswer,
          is_correct: false,
        });
        tmpAnswer = "";
      }
    },
    clearAnswers: () => {
      question.answers.forEach((ans) => {
        ans.is_correct = false;
      });
    },
  };

  let tmpAnswer = $state("");
  let msgBox = $state({
    msg: "Question Must be filled",
    color: "danger",
    visible: true,
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

{#snippet questionBox(question)}
  <Card --card-padding="0">
    <CardTitle>
      {#if msgBox.visible}
        <div id="msgbox" style:background-color="var(--{msgBox.color}-color)">
          {msgBox.msg}
        </div>
      {/if}
      <div style:padding="10px">
        <textarea class="editableTextArea" bind:value={question.question}
        ></textarea>
      </div></CardTitle
    >
    <CardBody --card-body-background="rgb(144, 144, 144)" --card-body-margin="0"
      ><div style:padding="10px" style:font-family="arial">
        {#each question.answers as answer, answerIndex (answer.id + answerIndex)}
          {@render answerbar(
            answer,
            question.multiple_answers,
            () => on.radioChange(answer),
            () => on.answerDelete(answerIndex)
          )}
        {/each}
        <div style:display="flex">
          <input type="text" style:flex="1" bind:value={tmpAnswer} /><button
            class="actionBtn small"
            onclick={on.answerAdd}
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
            onchange={on.clearAnswers}
          />
          <label for="question-{question.id}-multiple">Multiple Answers</label>
        </div>
        <div style:margin-left="auto">
          <button
            class="actionBtn"
            style:background-color="var(--danger-color)"
            onclick={onDelete}>Delete</button
          >
        </div>
      </div></CardFooter
    >
  </Card>
{/snippet}

{@render questionBox(question)}

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

  #msgbox {
    padding: 10px;
    font-size: 1rem;
  }
</style>
