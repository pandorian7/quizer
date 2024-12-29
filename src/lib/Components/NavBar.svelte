<script>
  let { usercard } = $props();
</script>

<div id="nav">
  <div id="logo"><a href="/"><i>Quizer</i></a></div>
  <div id="links"><a href="/quizes">Quizes</a></div>
  <div id="info">
    {@render usercard?.()}
  </div>
</div>

<style>
  #nav {
    height: 4rem;
    display: flex;
    background-color: rgb(57, 57, 57);
    color: white;
    font-family: "Bahnschrift";
    align-items: center;
  }
  #logo {
    font-size: 2.5rem;
    margin: auto 1rem;
  }
  #links {
    margin-right: auto;
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  #info :global(a),
  a {
    margin: 10px;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
  }

  #info {
    margin-right: 20px;
  }
</style>
