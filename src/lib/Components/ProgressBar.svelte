<script>
  const { duration = 5, onFinish = () => {} } = $props();
  const timeout = setTimeout(onFinish, duration * 1000);
  export const cancle = () => clearTimeout(timeout);

  $effect(() => {
    return () => cancle();
  });
</script>

<div id="progress-container">
  <div id="progress-bar" style:animation-duration="{duration}s"></div>
</div>

<style>
  #progress-container {
    background-color: var(--grey-300);
    display: flex;
  }
  #progress-bar {
    background-color: green;
    height: 10px;
    animation:
      reduce linear forwards,
      colorChange linear forwards;
    /* animation-duration: 5s; */
  }

  @keyframes reduce {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }

  @keyframes colorChange {
    0% {
      background: #228b22;
    }
    25% {
      background: #6b8e23;
    }
    50% {
      background: #daa520;
    }
    75% {
      background: #ff8c00;
    }
    100% {
      background: #b22222;
    }
  }
</style>
