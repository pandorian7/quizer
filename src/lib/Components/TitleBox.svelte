<script>
  import Modal from "$lib/Components/Modal.svelte";
  import Container from "$lib/Components/Container.svelte";

  import Card from "./Card/Card.svelte";
  import CardTitle from "./Card/CardTitle.svelte";
  import CardBody from "./Card/CardBody.svelte";
  import CardFooter from "./Card/CardFooter.svelte";

  const { onAdd } = $props();

  let modal;

  export const open = () => {
    title = "";
    modal.open();
  };
  export const close = () => modal.close();

  let title = $state("");
</script>

<Modal bind:this={modal}>
  <Container --width="80%">
    <Card>
      <CardTitle>New Quiz</CardTitle>
      <CardBody
        ><textarea id="title" style:display="block" bind:value={title}
        ></textarea></CardBody
      >
      <CardFooter
        ><button
          id="quizadd"
          onclick={async () => {
            close();
            onAdd(title);
          }}>Add</button
        ></CardFooter
      >
    </Card>
  </Container>
</Modal>

<style>
  #title {
    resize: none;
    width: 100%;
    box-sizing: border-box;
    border-radius: 0;
    font-family: "Roboto";
    font-size: 2em;
    background-color: rgb(72, 72, 72);
    outline: none;
    overflow-y: visible;
    resize: vertical;
    color: white;
    border: 0;
    margin: 1rem 0;
    padding: 0.5rem;
  }
  button#quizadd {
    border: none;
    width: 100%;
    padding: 10px;
    font-size: 1.5em;
    background-color: var(--secondary-color);
    cursor: pointer;
    color: white;
  }
</style>
