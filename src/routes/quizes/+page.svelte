<script>
  const { data } = $props();

  import TitleBox from "$lib/Components/TitleBox.svelte";
  import Loading from "$lib/Components/Loading.svelte";
  import Dial from "$lib/Components/Dial.svelte";
  import Container from "$lib/Components/Container.svelte";
  import CardTitle from "$lib/Components/Card/CardTitle.svelte";
  import Card from "$lib/Components/Card/Card.svelte";

  import { invalidate } from "$app/navigation";
  import CardBody from "$lib/Components/Card/CardBody.svelte";
  import CardFooter from "$lib/Components/Card/CardFooter.svelte";
  import ConfirmDelete from "$lib/Components/ConfirmDelete.svelte";

  async function onAdd(title) {
    titlebox.close();
    await fetch("/api/quizes", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    invalidate("/api/quizes");
  }

  async function onDelete(id) {
    await fetch(`/api/quizes/${id}`, { method: "DELETE" });
    invalidate("/api/quizes");
  }

  let titlebox;
  let loader;
  let confirmDelete;
</script>

<Loading bind:this={loader} />
<TitleBox bind:this={titlebox} onAdd={(title) => onAdd(title)} />
<Dial onclick={() => titlebox.open()} text="Add" />
<ConfirmDelete bind:this={confirmDelete} />

<div style:margin-top="2rem">
  <Container
    ><Card --card-background="rgb(57, 57, 57)">
      <CardTitle>Latest Quizes</CardTitle>
    </Card>
    <div>
      {#each data.quizes as quiz (quiz.id)}
        <Card --card-padding="0">
          <CardTitle><div style:padding="10px">{quiz.title}</div></CardTitle>
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
                  style:background-color="var(--danger-color)"
                  onclick={() =>
                    confirmDelete.confirm(() =>
                      loader.loading(() => onDelete(quiz.id))
                    )}>Delete</button
                >
                <!-- <button
                  class="actionBtn"
                  style:background-color="var(--danger-color)"
                  onclick={() => loader.loading(() => onDelete(quiz.id))}
                  >Delete</button
                > -->
                <a href="/quizes/{quiz.id}/edit">
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
      {/each}
    </div>
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
