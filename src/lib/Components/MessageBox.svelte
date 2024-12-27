<script>
  import { fly } from "svelte/transition";

  import Container from "./Container.svelte";

  const { timeout = 2000 } = $props();

  let box = $state({
    color: "danger",
    msg: "error",
    visible: false,
  });

  const showBox = (color, msg) => {
    box = {
      color,
      msg,
      visible: true,
    };
    setTimeout(() => {
      box.visible = false;
    }, timeout);
  };

  export const danger = (msg) => showBox("danger", msg);
  export const success = (msg) => showBox("success", msg);
  export const warning = (msg) => showBox("warning", msg);
</script>

{#if box.visible}
  <div id="container" transition:fly={{ y: 100 }}>
    <Container>
      <div id="box" class={[box.color]}><h3>{box.msg}</h3></div>
    </Container>
  </div>
{/if}

<style>
  :root {
    --success: #28a745;
    --danger: #dc3545;
    --warning: #ffc107;
  }

  #container {
    position: fixed;
    width: 100%;
    bottom: 15px;
  }
  #box {
    border-radius: 10px;
    border-style: solid;
    border-width: 3px;
    font-family: arial;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .success {
    color: var(--success);
    background-color: color-mix(in srgb, var(--success), white 75%);
  }
  .danger {
    color: var(--danger);
    background-color: color-mix(in srgb, var(--danger), white 75%);
  }
  .warning {
    color: var(--warning);
    background-color: color-mix(in srgb, var(--warning), white 75%);
  }
</style>
