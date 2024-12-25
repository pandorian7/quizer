<script>
  import { fade } from "svelte/transition";
  const { children, backdrophide = true } = $props();

  let visible = $state(false);
  let backdrop = $state(null);

  export function open() {
    visible = true;
  }

  export function close() {
    visible = false;
  }

  let onBackdropClick = backdrophide
    ? (event) => {
        if (event.target == backdrop) {
          close();
        }
      }
    : () => {};
</script>

{#if visible}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    id="modalbackgrop"
    transition:fade={{ duration: 100 }}
    onclick={onBackdropClick}
    bind:this={backdrop}
  >
    <div id="modalarea">{@render children()}</div>
  </div>
{/if}

<style>
  #modalbackgrop {
    position: fixed;
    display: flex;
    height: 100vh;
    width: 100%;
    background-color: rgba(105, 105, 105, 0.5); /* darker grey */
    top: 0;
  }

  #modalarea {
    margin: auto;
  }

  :global(body) {
    margin: 0;
  }
</style>
