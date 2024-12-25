<script>
  import QuestionModal from "$lib/Components/QuestionModal.svelte";
  import QuestoinBox from "$lib/Components/QuestoinBox.svelte";
  import Container from "$lib/Components/Container.svelte";

  const { data } = $props();
  let modal;

  let title = $state(data.title);
  let questions = $state(data.questions);
</script>

{#snippet q({ question })}<li>{question}</li>{/snippet}

<QuestionModal bind:this={modal} />

<h1>Quiz {data.id}</h1>

<label for="quiz_title">Title: </label>
<input type="text" id="quiz_title" bind:value={title} /><br /><br />

<Container>
  {#each data.questions as question, i (question.id)}
    <QuestoinBox bind:question={questions[i]} ondblclick={() => modal.open()} />
  {/each}
</Container>

<button>Add</button>
<button onclick={() => console.log($state.snapshot(questions))}>Show</button>

<button onclick={() => modal.open()}>open</button>
