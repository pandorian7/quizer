<script>
  import Container from "$lib/Components/Container.svelte";
  import Card from "$lib/Components/Card/Card.svelte";
  import CardTitle from "$lib/Components/Card/CardTitle.svelte";
  import CardBody from "$lib/Components/Card/CardBody.svelte";
  import CardFooter from "$lib/Components/Card/CardFooter.svelte";

  let answer = $state({
    answer: "this is an answer",
    checked: false,
    multiple: true,
  });
  let multiple = $state(false);
</script>

{#snippet answerbar(answer, multiple)}
  {#if multiple}
    <input type="checkbox" bind:checked={answer.checked} />
  {:else}
    <input type="radio" checked={answer.checked} />
  {/if}
  <span>{answer.answer}</span>
{/snippet}

<div style:margin-top="2rem">
  <Container>
    <Card --card-background="rgb(57, 57, 57)">
      <CardTitle>Quiz Name</CardTitle>
    </Card>
    <Card --card-padding="0">
      <CardTitle><div style:padding="10px">title</div></CardTitle>
      <CardBody
        --card-body-background="rgb(144, 144, 144)"
        --card-body-margin="0"
        ><div style:padding="10px" style:font-family="arial">
          {@render answerbar(answer, multiple)}
          {@render answerbar(answer, multiple)}
          <input type="checkbox" bind:checked={multiple} /> Multiple Answers
        </div></CardBody
      >
      <CardFooter
        ><div style:display="flex">
          <div style:margin-left="auto">
            <button
              class="actionBtn"
              style:background-color="var(--danger-color)">Delete</button
            >
            <!-- <button
                class="actionBtn"
                style:background-color="var(--danger-color)"
                onclick={() => loader.loading(() => onDelete(quiz.id))}
                >Delete</button
              > -->
            <a href="/quizes/id/edit">
              <button
                class="actionBtn"
                style:background-color="var(--warning-color)">Edit</button
              >
            </a>
            <button class="actionBtn">Attempt</button>
          </div>
        </div></CardFooter
      >
    </Card>
    <Card --card-padding="0">
      <CardTitle><div style:padding="10px">Capital of Sri Lanka</div></CardTitle
      >
      <CardBody
        --card-body-background="rgb(144, 144, 144)"
        --card-body-margin="0"
        ><div style:padding="10px" style:font-family="arial">
          Get ready to explore the wonders of the universe! This
          beginner-friendly quiz is designed to test your knowledge of basic
          astronomy concepts, from the stars and galaxies that make up our
          cosmos to the mysteries of space and time
        </div></CardBody
      >
      <CardFooter
        ><div style:display="flex">
          <div style:margin-left="auto">
            <button
              class="actionBtn"
              style:background-color="var(--danger-color)">Delete</button
            >
            <!-- <button
                  class="actionBtn"
                  style:background-color="var(--danger-color)"
                  onclick={() => loader.loading(() => onDelete(quiz.id))}
                  >Delete</button
                > -->
            <a href="/quizes/id/edit">
              <button
                class="actionBtn"
                style:background-color="var(--warning-color)">Edit</button
              >
            </a>
            <button class="actionBtn">Attempt</button>
          </div>
        </div></CardFooter
      >
    </Card>
  </Container>
</div>

<style>
  .actionBtn {
    border: none;
    margin: 0;
    padding: 0.6rem 1rem;
    background-color: var(--secondary-color);
    color: white;
    cursor: pointer;
  }
</style>
