<script>
  const { children } = $props();
</script>

<div class="base">
  <div class="container">
    <div class="internal">{@render children()}</div>
  </div>
</div>

<style>
  @media (max-width: 576px) {
    .container {
      width: 90%;
    }
  }

  @media (min-width: 576px) {
    .container {
      width: 540px;
    }
  }

  .base {
    display: flex;
  }
  .container {
    margin: auto;
    display: flex;
  }

  .internal {
    width: var(--width, 100%);
    margin: auto;
  }
</style>
