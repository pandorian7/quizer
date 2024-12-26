<script>
  import Container from "$lib/Components/Container.svelte";
  import Card from "$lib/Components/Card/Card.svelte";
  import CardTitle from "$lib/Components/Card/CardTitle.svelte";
  import Dial from "$lib/Components/Dial.svelte";
  import QuestoinBox from "$lib/Components/QuestoinBox.svelte";
  import { validateQuestionandAnswers } from "$lib/quizer.js";
  import quizer from "$lib/quizer.js";

  import { slide } from "svelte/transition";
  import Loading from "$lib/Components/Loading.svelte";

  const { data } = $props();

  let quiz = $state(data.quiz);
  let loader;

  $effect(() => {
    // on reload this will make sure that the data is updated
    quiz = data.quiz;
  });

  const titleOk = $derived(quiz.title != "");

  const on = {
    questionDelete: (questionIndex) => {
      quiz.questions.splice(questionIndex, 1);
    },
    questionAdd: () => {
      quiz.questions.push({
        id: null,
        question: "New Question",
        answers: [{ id: null, answer: "New Answer", is_correct: true }],
      });
    },
    verify: () => {
      let ok = titleOk;
      for (let q of quiz.questions) {
        const { answers } = q;
        q.element.error.hide();
        const res = validateQuestionandAnswers(q, answers);
        if (res) {
          ok = false;
          q.element.error.show(res);
        }
      }
      return ok;
    },
    save: () => {
      const ok = on.verify();
      if (!ok) return;
      quizer.quizes.update(quiz.id, quiz.title);
      // console.log($state.snapshot(quiz));
    },
    add: (question) => console.log(),
  };
</script>

<Loading bind:this={loader} />
<Dial onclick={() => loader.loading(on.save)} text="Save" />
<div style:margin-top="2rem">
  <Container>
    <Card --card-background="var(--grey-700)" --card-padding="0">
      <CardTitle>
        {#if !titleOk}
          <div id="msgboxcontainer" transition:slide>
            <div id="msgbox" style:background-color="var(--danger-color)">
              quiz name is required
            </div>
          </div>
        {/if}
        <div style:padding="10px">
          <textarea class="editableTextArea" bind:value={quiz.title}></textarea>
        </div></CardTitle
      >
    </Card>
    {#each quiz.questions as question, questionIndex (question.id + questionIndex)}
      <QuestoinBox
        bind:question={quiz.questions[questionIndex]}
        bind:this={question.element}
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
  #msgbox {
    padding: 10px;
    font-size: 1rem;
    position: relative;
  }
  #msgboxcontainer {
    overflow: hidden;
  }
</style>
