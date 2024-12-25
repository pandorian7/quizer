<script>
  import Modal from "./Modal.svelte";

  let modal;

  export const loading = async (caller) => {
    modal.open();
    await caller();
    modal.close();
  };
</script>

<Modal bind:this={modal} backdrophide={false}><h1>Loading..</h1></Modal>
