<script>
  import { page } from "$app/state";

  import NavBar from "$lib/Components/NavBar.svelte";

  import { HomeSlider } from "$lib/Components/index";

  import "./app.css";
  import "$lib/css/fonts.css";

  let { children, data } = $props();
</script>

<HomeSlider />

<NavBar>
  {#snippet usercard()}
    {#if data.download}
      <a href={data.download}>Download</a>
    {/if}
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
    margin: 0;
    font-family: "Roboto Condensed", serif;
  }
</style>
