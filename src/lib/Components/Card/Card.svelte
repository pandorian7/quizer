<script>
  const { children } = $props();
</script>

<div id="card">
  {@render children()}
</div>

<style>
  #card {
    /* background-color: rgb(107, 107, 107); */
    background-color: var(--card-background, var(--default-card-background));
    padding: var(--card-padding, 10px);
    color: white;
    margin-bottom: 1rem;
  }
  /* #title {
    resize: none;
    width: 100%;
    box-sizing: border-box;
    border-radius: 0;
    font-family: "Roboto";
    font-size: 2em;
    background-color: rgb(72, 72, 72);
    outline: none;
    overflow-y: visible;
    resize: vertical;
    color: white;
    border: 0;
    margin: 1rem 0;
    padding: 0.5rem;
  } */

  /* button#quizadd {
    border: none;
    width: 100%;
    padding: 10px;
    font-size: 1.5em;
    background-color: var(--secondary-color);
    cursor: pointer;
    color: white;
  } */
</style>
