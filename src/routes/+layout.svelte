<script>
  import NavBar from "$lib/Components/NavBar.svelte";

  import "./app.css";

  const { children } = $props();
</script>

<NavBar />

{@render children()}

<style>
  :global(body) {
    background-color: rgb(229, 227, 227);
    margin: 0;
  }
</style>
