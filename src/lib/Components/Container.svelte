<script>
  const { children } = $props();
</script>

<div class="base">
  <div class="container">
    {@render children()}
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
  }
</style>
