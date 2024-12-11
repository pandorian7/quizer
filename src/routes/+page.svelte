<script>
  const { data } = $props();
  import * as q from "$lib/questions";

  /**
   * @type {HTMLInputElement}
   */
  let questionInput;
</script>

<h1>Questions</h1>

<ol>
  {#each data.questions as question (question.id)}
    <li>
      {question.question}
      <button onclick={() => q.remove(question.id)}>Delete</button>
    </li>
  {/each}
</ol>

<input type="text" bind:this={questionInput} />
<button onclick={() => q.add(questionInput.value)}>Add</button>
