<script>
  import { HomeSlider, Container, Card, Button } from "$lib/Components/index";
</script>

<svelte:head>
  <title>Quizer</title>
</svelte:head>

<HomeSlider />

<Container>
  <div class="card">
    <Card --card-body-bg="var(--grey-300)">
      {#snippet header()}
        <snap class="title">Welcome to Quizer!!!</snap>
      {/snippet}
      {#snippet body()}
        <div class="body">
          🎉 Ready to test your brainpower and explore endless possibilities?
          Whether you're here to create fun and engaging quizzes or challenge
          yourself with those made by others, Quizer has something for everyone!
          <br />
          <div class="sub-content">
            📚 Dive into a variety of topics, from general knowledge to niche
            interests, and push your limits.
            <br />
            📝 Create quizzes to share with the world and see how others fare.
            <br />
            🌟 Compete on the leaderboard and showcase your expertise. Get started
            today and make learning an exciting adventure!"
            <br />
            <br />
          </div>
        </div>
      {/snippet}
      {#snippet footer()}
        <a href="/quizes"
          ><Button --btn-width="100%" size="large">Lets go</Button></a
        >
      {/snippet}
    </Card>
  </div>
</Container>

<style>
  .title {
    font-size: 3rem;
  }
  .body {
    font-size: 1.5rem;
    margin-right: 1rem;
  }
  .sub-content {
    font-size: 1.1rem;
    padding-top: 1.5rem;
    padding-left: 2rem;
  }
  .card {
    text-align: justify;
  }
</style>
