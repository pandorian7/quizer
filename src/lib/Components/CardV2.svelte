<script>
  const { header, body, footer } = $props();
</script>

<div id="card">
  {#if header}
    <div id="header">
      {@render header()}
    </div>
  {/if}
  {#if body}
    <div id="body">
      {@render body()}
    </div>
  {/if}
  {#if footer}
    <div id="footer">
      {@render footer()}
    </div>
  {/if}
</div>

<style>
  :root {
    --card-pd: 0;
  }
  #card {
    background-color: var(--card-bg, grey);
    padding: var(--card-pd-outer, 10px);
  }

  #header {
    font-size: 2em;

    background-color: var(--card-header-bg, inherit);
    padding: var(--card-pd-header, var(--card-pd));
    color: var(--card-header-color, black);
  }

  #body {
    background-color: var(--card-body-bg, inherit);
    padding: var(--card-pd-body, var(--card-pd));
    color: var(--card-body-color, black);
  }

  #footer {
    background-color: var(--card-footer-bg, inherit);
    padding: var(--card-pd-footer, var(--card-pd));
    color: var(--card-footer-color, black);
  }
</style>
