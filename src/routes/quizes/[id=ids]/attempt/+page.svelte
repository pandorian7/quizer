<script>
  import {
    QuestionCard,
    Container,
    AttemptNowCard,
    AfterQuizCard,
    Loading,
  } from "$lib/Components/index.js";

  import quizer from "$lib/quizer.js";

  const { data } = $props();

  const state = $state({
    selected: Object.fromEntries(
      data.quiz.questions.map((q) => [q.id, [null]])
    ),
    time: Object.fromEntries(
      data.quiz.questions.map((q) => [q.id, q.duration])
    ),
    pointer: -1,
  });
  let results = $state({ time_taken: 0, score: 0, total: 0 });

  $effect(async () => {
    if (state.pointer >= data.quiz.questions.length) {
      results = await loader.loading(() =>
        quizer.quizes.evaluate(data.quiz.id, $state.snapshot(state))
      );
    }
  });

  const next = () => {
    state.pointer++;
  };
  let loader;
</script>

<svelte:head>
  <title>Attempt :: {data.quiz.title}</title>
</svelte:head>

<Loading bind:this={loader} />
<div style:height="100%">
  <Container>
    {#if state.pointer == -1}
      <!-- <center><Button onclick={next}>Start</Button></center> -->
      {@const options = {
        title: data.quiz.title,
        description: data.quiz.description,
        points: data.quiz.points,
        onAttempt: next,
      }}
      <AttemptNowCard {...options} />
    {:else if state.pointer >= data.quiz.questions.length}
      <AfterQuizCard title={data.quiz.title} {...results} id={data.quiz.id} />
    {:else}
      {@const question = data.quiz.questions[state.pointer]}
      {#key state.pointer}
        <div>
          <QuestionCard
            {question}
            questionIndex={state.pointer}
            bind:selected={state.selected[question.id]}
            bind:elapsed={state.time[question.id]}
            onNext={() => state.pointer++}
          />
        </div>
      {/key}
    {/if}
  </Container>
</div>
