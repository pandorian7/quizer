<script>
  import { page } from "$app/stores";
  let answers = $state($page.data.answers);
  let question = $state($page.data.question);
  let tmp_answer = $state("");

  let add = () => {
    answers.push({ id: null, answer: tmp_answer, is_correct: 0 });
    tmp_answer = "";
  };

  let remove = (index) => {
    answers.splice(index, 1);
  };

  let updateSingleAnswer = (index) => {
    for (let i = 0; i < answers.length; i++) {
      answers[i].is_correct = index === i ? 1 : 0;
    }
  };

  let updateMultipleAnswers = (index) => {
    answers[index].is_correct = !answers[index].is_correct;
  };

  let emptySelection = () => {
    for (let i = 0; i < answers.length; i++) {
      answers[i].is_correct = 0;
    }
  };

  let submitUpdates = async (question, answers) => {
    const { id } = question;
    await fetch(`/api/questions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answers }),
    });
  };
</script>

<h1>{$page.data.editing ? "Edit" : "Add"} Question</h1>

<textarea bind:value={question.question}></textarea>
<br />

{#each answers as answer, i}
  {#if question.multiple_answers}
    <input
      type="checkbox"
      checked={answers[i].is_correct}
      onchange={() => updateMultipleAnswers(i)}
    />
  {:else}
    <input
      type="radio"
      checked={answers[i].is_correct}
      onchange={() => updateSingleAnswer(i)}
    />
  {/if}
  <input
    type="text"
    bind:value={answers[i].answer}
    class:corrent={answers[i].is_correct}
  /><button onclick={() => remove(i)}>Delete</button>
  <!-- {#if i !== correct_answer}
    <button onclick={() => markCorret(i)}>Mark Correct</button>
  {/if} -->
  <br />
{/each}
<input type="text" bind:value={tmp_answer} />
<button onclick={add}>add</button>
<br />
<input
  type="checkbox"
  id="multipleAnswers"
  bind:checked={question.multiple_answers}
  onchange={() => emptySelection()}
/><label for="multipleAnswers">Allow Multiple Answers</label>
<button onclick={() => submitUpdates(question, answers)}>submit</button>

<style>
  .corrent {
    background-color: lightgreen;
  }
</style>
