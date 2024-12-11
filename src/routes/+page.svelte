<script>
  const { data } = $props();
  const { questions } = data;
</script>

<h1>Questions</h1>

<ol>
  {#await questions then questions}
    {#each questions as question}
      <li>{question.question}</li>
    {/each}
  {/await}
</ol>

<form action="?/addQuestion" method="POST">
  <input type="text" name="question" />
  <button>Add</button>
</form>
