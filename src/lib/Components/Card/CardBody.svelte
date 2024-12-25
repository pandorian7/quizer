<script>
  const { children } = $props();
</script>

<div id="cardBody">
  {@render children()}
</div>

<style>
  #cardBody {
    margin: var(--card-body-margin, 1rem 0);
    background-color: var(--card-body-background, inherit);
  }
</style>
