<script>
  import {
    QuestionCard,
    Container,
    AttemptNowCard,
  } from "$lib/Components/index.js";

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

  const next = () => {
    state.pointer++;
  };

  $inspect(state);
</script>

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
      <center>{JSON.stringify($state.snapshot(state))}</center>
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
