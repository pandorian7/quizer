<script>
  import { fly } from "svelte/transition";

  import Container from "./Container.svelte";

  const { timeout = 2000 } = $props();

  let box = $state({
    color: "danger",
    msg: "error",
    visible: false,
  });

  const showBox = async (color, msg, callback) => {
    box = {
      color,
      msg,
      visible: true,
    };
    setTimeout(() => {
      box.visible = false;
    }, timeout);
    wait().then(() => callback?.());
  };

  const wait = () =>
    new Promise((resolve) => {
      resolver = resolve;
    });

  export const danger = (msg, callback) => showBox("danger", msg, callback);
  export const success = (msg, callback) => showBox("success", msg, callback);
  export const warning = (msg, callback) => showBox("warning", msg, callback);

  let resolver;
</script>

{#if box.visible}
  <div id="container" transition:fly={{ y: 100 }} onoutroend={() => resolver()}>
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
