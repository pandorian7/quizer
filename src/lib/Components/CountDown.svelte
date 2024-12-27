<script>
  const { duration } = $props();
  let left = $state(duration);

  let seconds = $derived(left % 60);
  let minutes = $derived((left - seconds) / 60);

  const interval = setInterval(() => left--, 1000);

  export const cancle = () => clearInterval(interval);

  $effect(() => {
    if (left <= 0) cancle();
  });
  $effect(() => {
    return () => cancle();
  });
</script>

<div>{minutes}:{`${seconds}`.padStart(2, "0")}</div>

<style>
  div {
    background-color: var(--grey-300);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
  }
</style>
