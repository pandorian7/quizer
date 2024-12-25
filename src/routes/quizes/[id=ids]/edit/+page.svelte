<script>
  import Container from "$lib/Components/Container.svelte";
  import Card from "$lib/Components/Card/Card.svelte";
  import CardTitle from "$lib/Components/Card/CardTitle.svelte";
  import Dial from "$lib/Components/Dial.svelte";
  import QuestoinBox from "$lib/Components/QuestoinBox.svelte";

  const { data } = $props();

  let quiz = $state(data.quiz);

  $effect(() => {
    // on reload this will make sure that the data is updated
    quiz = data.quiz;
  });

  const on = {
    questionDelete: (questionIndex) => {
      quiz.questions.splice(questionIndex, 1);
    },
    questionAdd: () => {
      quiz.questions.push({
        id: null,
        question: "New Question",
        answers: [{ id: null, answer: "New Answer", is_correct: false }],
      });
    },
    save: () => {
      console.log($state.snapshot(quiz));
    },
  };
</script>

<Dial onclick={on.save} text="Save" />

<div style:margin-top="2rem">
  <Container>
    <Card --card-background="var(--grey-700)">
      <CardTitle
        ><textarea class="editableTextArea" bind:value={quiz.title}
        ></textarea></CardTitle
      >
    </Card>
    {#each quiz.questions as question, questionIndex (question.id + questionIndex)}
      <QuestoinBox
        bind:question={quiz.questions[questionIndex]}
        onDelete={() => on.questionDelete(questionIndex)}
      />
    {/each}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_interactive_supports_focus -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div id="addBtn" onclick={on.questionAdd}>
      <Card --card-background="var(--secondary-color)">
        <CardTitle><center>Add</center></CardTitle>
      </Card>
    </div>
  </Container>
</div>

<style>
  textarea.editableTextArea {
    width: 100%;
    box-sizing: border-box;
    resize: vertical;
    background-color: inherit;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    outline: none;
  }
  #addBtn {
    margin-bottom: 70%;
    cursor: pointer;
  }
</style>
