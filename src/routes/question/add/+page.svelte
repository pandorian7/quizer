<script>
  /**
   * @type {string[]}
   */
  let answers = $state([]);
  let tmp_answer = $state("");

  let add = () => {
    console.log("clicked");
    answers.push(tmp_answer);
  };

  let remove = (index) => {
    answers.splice(index, 1);
  };
</script>

<h1>Add Question</h1>

<textarea id="question"></textarea>
<br />
{#each answers as answer, i}
  <input type="text" bind:value={answers[i]} /><button onclick={() => remove(i)}
    >Delete</button
  >
  <br />
{/each}
<input type="text" bind:value={tmp_answer} />
<button onclick={add}>add</button>
<br />
<button onclick={() => console.log($state.snapshot(answers))}>submit</button>
