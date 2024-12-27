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
        description:
          "Get ready to explore the wonders of the universe! This beginner-friendly quiz is designed to test your knowledge of basic astronomy concepts, from the stars and galaxies that make up our cosmos to the mysteries of space and time",
        onAttempt: next,
      }}
      <AttemptNowCard {...options} />
    {:else if state.pointer >= data.quiz.questions.length}
      <center>end</center>
    {:else}
      {@const question = data.quiz.questions[state.pointer]}
      {#key state.pointer}
        <div>
          <QuestionCard
            {question}
            questionIndex={state.pointer}
            bind:selected={state.selected[question.id]}
            onNext={() => state.pointer++}
          />
        </div>
      {/key}
    {/if}
  </Container>
</div>
