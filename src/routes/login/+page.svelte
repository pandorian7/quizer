<script>
  import {
    Container,
    Card,
    TextInput,
    Button,
    MessageBox,
  } from "$lib/Components/index";
  import "$lib/css/fonts.css";

  import auth from "$lib/userAuth";

  const creds = $state({
    username: "",
    password: "",
  });

  let message;

  function validate() {
    if (creds.username === "" || creds.password === "") {
      message.danger("Username and Password are required");
      return false;
    }
    return true;
  }

  function register() {
    if (validate()) {
      auth.user
        .create(creds.username, creds.password)
        .then(() => message.success("User created"))
        .catch((err) => message.danger(err.message));
    }
  }
</script>

<MessageBox bind:this={message} />
<Container --width="75%">
  <div class="roboto-condensed">
    <Card>
      {#snippet header()}
        Login
      {/snippet}
      {#snippet body()}
        <TextInput label="Username" bind:value={creds.username} />
        <br /><br />
        <TextInput
          type="password"
          label="Password"
          bind:value={creds.password}
        />
      {/snippet}
      {#snippet footer()}
        <div id="footer">
          <Button varient="info" onclick={register}>Register</Button>
          <Button>Login</Button>
        </div>
      {/snippet}
    </Card>
  </div>
</Container>

<style>
  #footer {
    display: flex;
  }

  #footer :global(button) {
    flex: 1;
  }
</style>
