<script>
  const { data } = $props();
  import quizer from "$lib/quizer";

  /**
   * @type {HTMLInputElement}
   */
  let questionInput;
  let questionId = $state(0);
  let answerText = $state("");
</script>

<h1>Questions</h1>

<ol>
  {#each data.questions as question (question.id)}
    <li>
      {question.question}
      <a href="/question/{question.id}"><button>Edit</button></a>
      <!-- <button onclick={() => quizer..remove(question.id)}>Delete</button> -->
      <button onclick={() => quizer.question.remove(question.id)}>Delete</button
      >
    </li>
  {/each}
</ol>

<!-- <input type="text" bind:this={questionInput} />
<button onclick={() => q.add(questionInput.value)}>Add</button>

<br />
<br />

<input type="number" bind:value={questionId} /><input
  type="text"
  placeholder="Answer"
  bind:value={answerText}
/>
<button onclick={() => q.addAnswer(answerText, questionId, false)}
  >Add Answer</button
> -->

<a href="/question/add">new question</a>
