<script>
  import { page } from "$app/state";

  import NavBar from "$lib/Components/NavBar.svelte";

  import "./app.css";
  import "$lib/css/fonts.css";

  let { children, data } = $props();
</script>

<NavBar>
  {#snippet usercard()}
    {#if page.url.pathname != "/login"}
      {#if data.user}
        {data.user.username} <a href="/logout">(Logout)</a>
      {:else}
        <a href="/login">LogIn</a>
      {/if}
    {/if}
  {/snippet}
</NavBar>

{@render children()}

<style>
  :global(body) {
    background-color: rgb(229, 227, 227);
    margin: 0;
    font-family: "Roboto Condensed", serif;
  }
</style>
