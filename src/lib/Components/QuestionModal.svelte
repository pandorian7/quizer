<script>
  import { fade } from "svelte/transition";
  let visible = $state(false);

  export function open() {
    visible = true;
  }

  export function close() {
    visible = false;
  }
</script>

{#if visible}
  <div id="qmodal" transition:fade={{ duration: 100 }}>
    <div id="modal">
      <div id="modalcontent">
        <div id="modalhead">
          <button onclick={close} style:margin-left="auto">close</button>
        </div>
        <textarea style:width="88%" style:margin="auto" style:display="block"
        ></textarea>
        <input type="checkbox" checked /><input type="text" /><button
          >Delete</button
        >
      </div>
    </div>
  </div>
{/if}

<style>
  #qmodal {
    position: fixed;
    display: flex;
    height: 100vh;
    width: 100%;
    background-color: rgba(105, 105, 105, 0.5); /* darker grey */
    top: 0;
  }
  #modal {
    width: 500px;
    background-color: lightpink;
    margin: auto;
  }

  :global(body) {
    margin: 0;
    /* padding: 0; */
  }
  textarea {
    resize: none;
  }

  #modalcontent {
    padding: 10px 30px;
  }
</style>
