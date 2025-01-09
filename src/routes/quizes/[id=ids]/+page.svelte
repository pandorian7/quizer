<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  const { data } = $props();
  const prefix = `/quizes/${data.quiz.id}/`;

  onMount(() => {
    if (data.user.id === data.quiz.owner_id) {
      goto(prefix + "edit");
    } else {
      goto(prefix + "attempt");
    }
  });
</script>
