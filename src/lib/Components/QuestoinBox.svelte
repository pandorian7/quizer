<script>
  let { question = $bindable(), answers = $bindable(), ondblclick } = $props();
  let tmp_answer = $state("");

  let readonly = $state(true);
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{#snippet answer(ans)}
  {ans}
{/snippet}

<div {ondblclick} id="main">
  <textarea bind:value={question.question} disabled={readonly}></textarea>
  <div id="answers">
    <ol>
      {#each answers as ans}
        <li>
          {@render answer(ans)}
        </li>
      {/each}
    </ol>
  </div>
</div>

<style>
  textarea {
    resize: none;
    display: block;
    width: 100%;
    border: 1px solid black;
    border-radius: 2px;
    margin-bottom: 0;
    box-sizing: border-box;
    font-family: "Roboto";
    padding: 0.3rem;
    font-size: 1.5em;
  }

  #answers {
    height: 100px;
    width: 100%;
    background-color: lightcyan;
    margin-bottom: 1rem;
  }

  #main * {
    cursor: pointer;
  }
</style>
