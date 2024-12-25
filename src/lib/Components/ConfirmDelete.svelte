<script>
  import Modal from "$lib/Components/Modal.svelte";
  import Container from "$lib/Components/Container.svelte";

  import Card from "./Card/Card.svelte";
  import CardTitle from "./Card/CardTitle.svelte";
  import CardBody from "./Card/CardBody.svelte";
  import CardFooter from "./Card/CardFooter.svelte";

  let modal;

  let onDelete;

  export const confirm = (func) => {
    modal.open();
    onDelete = func || (() => {});
  };
</script>

<Modal bind:this={modal}>
  <Container --width="80%">
    <Card --card-padding="0">
      <CardTitle><div style:padding="10px">Confirm Delete</div></CardTitle>
      <CardBody
        --card-body-background="rgb(144, 144, 144)"
        --card-body-margin="0"
        ><div style:padding="10px" style:font-family="arial">
          This Action Will Permenently Delete the quiz. And it is not
          recoverable.
        </div></CardBody
      >
      <CardFooter
        ><div style:display="flex" style:justify-content="space-evenly">
          <!-- <button
                class="actionBtn"
                style:background-color="var(--danger-color)"
                onclick={() => loader.loading(() => onDelete(quiz.id))}
                >Delete</button
              > -->
          <button
            class="actionBtn"
            style:background-color="var(--info-color)"
            onclick={() => modal.close()}>Cancel</button
          ><button
            class="actionBtn"
            style:background-color="var(--danger-color)"
            onclick={() => {
              modal.close();
              onDelete();
            }}>Delete</button
          >
        </div></CardFooter
      >
    </Card>
  </Container></Modal
>

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
