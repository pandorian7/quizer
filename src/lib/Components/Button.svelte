<script>
  const {
    varient = "success",
    size = "normal",
    onclick = () => {},
    children,
  } = $props();
</script>

<button {onclick} class={[`v-${varient} s-${size}`]}
  >{@render children()}</button
>

<style>
  button {
    border: none;
    margin: 0;
    color: white;
    cursor: pointer;
  }

  .v-success {
    background-color: var(--success-color);
  }

  .v-info {
    background-color: var(--info-color);
  }

  .s-normal {
    padding: 0.6rem 1rem;
  }
</style>
