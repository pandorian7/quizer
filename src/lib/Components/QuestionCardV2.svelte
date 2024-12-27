<script>
  import { Card, Button, ProgressBar, CountDown } from "./index";

  let { question, selected = $bindable([]), onNext, questionIndex } = $props();
</script>

{#snippet answer(answer)}
  {#if question.multiple_answers}
    <input
      type="checkbox"
      bind:group={selected}
      id="answer-{answer.id}"
      value={answer.id}
    />
  {:else}
    <input
      type="radio"
      bind:group={selected[0]}
      id="answer-{answer.id}"
      value={answer.id}
    />
  {/if}
  <label for="answer-{answer.id}">{answer.answer}</label>
  <br />
{/snippet}

<div id="card">
  <ProgressBar duration={question.duration} onFinish={onNext} />
  <Card>
    {#snippet header()}
      {question.question}
    {/snippet}
    {#snippet body()}
      {#each question.answers as ans}
        {@render answer(ans)}
      {/each}
    {/snippet}
    {#snippet footer()}
      <div id="footer">
        <div id="left">
          <div id="number">#{questionIndex + 1}</div>
          <div><CountDown duration={question.duration} /></div>
        </div>
        <div id="center"></div>
        <div id="right">
          <Button onclick={onNext}>NEXT</Button>
        </div>
      </div>
    {/snippet}
  </Card>
</div>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto+Condensed:wght@300&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<style>
  #card {
    font-family: "Roboto Condensed", serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;

    margin-bottom: 1rem;

    --card-header-color: white;
    --card-body-bg: var(--grey-400);
    --card-pd: 10px;
    --card-pd-outer: 0;
    --card-pd-footer: 0;
  }
  :global(body) {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  #footer {
    display: flex;
  }
  #footer > :global(div) {
    display: flex;
    flex: 1;
    align-items: center;
  }
  #footer > :global(#right) {
    justify-content: right;
  }
  #footer > :global(#right) {
    justify-content: right;
  }
  #footer :global(#left > div) {
    text-align: center;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #footer :global(#left > #number) {
    width: 50px;
    background-color: var(--grey-600);
    color: white;
  }
</style>
