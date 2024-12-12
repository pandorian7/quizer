<script>
  /**
   * @type {string[]}
   */
  let answers = $state([]);
  let tmp_answer = $state("");
  let correct_answer = $state(null);

  let add = () => {
    answers.push(tmp_answer);
    tmp_answer = "";
  };

  let remove = (index) => {
    answers.splice(index, 1);
  };

  let markCorret = (index) => {
    correct_answer = index;
  };
</script>

<h1>Add Question</h1>

<textarea id="question"></textarea>
<br />
{#each answers as answer, i}
  <input
    type="text"
    bind:value={answers[i]}
    class:corrent={i === correct_answer}
  /><button onclick={() => remove(i)}>Delete</button>
  {#if i !== correct_answer}
    <button onclick={() => markCorret(i)}>Mark Correct</button>
  {/if}
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
