<script>
  import { goto } from "$app/navigation";

  fetch("/api/logout", { method: "POST" }).then(() => {
    goto("/login", { invalidateAll: true });
  });
</script>

<svelte:head>
  <title>Logging Out</title>
</svelte:head>
