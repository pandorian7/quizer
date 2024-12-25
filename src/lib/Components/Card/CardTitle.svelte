<script>
  const { children } = $props();
</script>

<div id="cardTitle">
  {@render children()}
</div>

<style>
  #cardTitle {
    font-size: 2em;
    background-color: var(--card-title-background, inherit);
  }
</style>
