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
    await invalidate("/api/quizes");
  }

  let titlebox;
  let loader;
  let confirmDelete;
</script>

<svelte:head>
  <title>Quizes</title>
</svelte:head>

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
              {quiz.description || "No Descriptoin"}
            </div></CardBody
          >
          <CardFooter
            ><div style:display="flex">
              <div style:padding="8px">
                by {data.user.id == quiz.owner_id ? "You" : quiz.username} | {quiz.points}
                points
              </div>
              <div style:margin-left="auto" style:display="flex">
                {#if data.user.id == quiz.owner_id}
                  <button
                    class="actionBtn"
                    style:background-color="var(--danger-color)"
                    onclick={() =>
                      confirmDelete.confirm(() =>
                        loader.loading(() => onDelete(quiz.id))
                      )}>Delete</button
                  >
                  <a href="/quizes/{quiz.id}/edit">
                    <button
                      class="actionBtn"
                      style:background-color="var(--warning-color)">Edit</button
                    >
                  </a>
                {/if}

                <a href="/quizes/{quiz.id}/attempt"
                  ><button class="actionBtn">Attempt</button></a
                >
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
