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

  let markCorret = (index) => {
    correct_answer = index;
  };
</script>

<h1>{$page.data.editing ? "Edit" : "Add"} Question</h1>

<textarea bind:value={question.question}></textarea>
<br />
{#each answers as answer, i}
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
<button onclick={() => console.log($state.snapshot(answers))}>submit</button>

<style>
  .corrent {
    background-color: lightgreen;
  }
</style>
