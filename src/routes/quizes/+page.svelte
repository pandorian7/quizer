<script>
  const { data } = $props();
</script>

Quizes
<ul>
  {#each data.quizes as quiz (quiz.id)}
    <li><a href="/quizes/{quiz.id}">{quiz.title}</a></li>
  {/each}
</ul>

<a href="/quizes/new"><button>new quiz</button></a>
