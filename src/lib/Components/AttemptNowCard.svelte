<script>
  import { Card, Button } from "./index";

  const { title, description, onAttempt } = $props();
</script>

<Card>
  {#snippet header()}
    {title}
  {/snippet}
  {#snippet body()}
    <center>{description}</center><br />
    <center><Button onclick={onAttempt}>Attempt Now</Button></center>
  {/snippet}
</Card>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto+Condensed:wght@300&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<style>
  :root {
    font-family: "Roboto Condensed", serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    --card-header-color: white;
    --card-body-bg: var(--grey-400);
    --card-pd: 10px;
    --card-pd-outer: 0;
    --card-pd-footer: 0;
  }
</style>
