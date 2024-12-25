<script>
  const { onclick } = $props();
</script>

<button id="addDial" {onclick}>Add</button>

<style>
  #addDial {
    position: fixed;
    bottom: 1em;
    right: 1em;
    /* aspect-ratio: 1; */
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    padding: 1rem;
    margin: auto;
    font-size: 1.5em;
    color: white;
    cursor: pointer;
    background-color: var(--secondary-color);
    z-index: 0;
    border: none;
  }
</style>
