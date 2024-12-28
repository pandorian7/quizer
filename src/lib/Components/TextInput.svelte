<script>
  let { value = $bindable(), type = "text", label } = $props();
</script>

{#if label}
  <label for="input">{label}</label>
{/if}
<input {type} bind:value id="input" />

<style>
  input {
    width: 100%;
    box-sizing: border-box;
    border: none;
    outline: none;
    padding: 5px 10px;
    font-size: larger;
    background-color: var(--grey-200);
  }
  label {
    background-color: var(--grey-300);
    display: block;
    font-size: large;
    padding: 5px;
  }
</style>
