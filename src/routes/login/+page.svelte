<script>
  import { goto } from "$app/navigation";
  import {
    Container,
    Card,
    TextInput,
    Button,
    MessageBox,
    Loading,
  } from "$lib/Components/index";
  import "$lib/css/fonts.css";

  import auth from "$lib/userAuth";

  const { data } = $props();

  const creds = $state({
    username: "",
    password: "",
  });

  function validate() {
    if (creds.username === "" || creds.password === "") {
      message.danger("Username and Password are required");
      return false;
    }
    return true;
  }

  function register() {
    if (validate()) {
      loader.loading(() =>
        auth.user
          .create(creds.username, creds.password)
          .then(() => message.success("User created", login))
          .catch((err) => message.danger(err.message))
      );
    }
  }
  function login() {
    if (validate()) {
      loader.loading(() =>
        auth.user
          .login(creds.username, creds.password)
          .then(() =>
            message.success("Logged In", async () => {
              // await invalidate(() => true);
              goto(data.from, { invalidateAll: true });
            })
          )
          .catch((err) => message.danger(err.message))
      );
    }
  }

  let message, loader;
</script>

<svelte:head>
  <title>Login :: Register</title>
</svelte:head>

<MessageBox bind:this={message} timeout={1000} />
<Loading bind:this={loader} />
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
          <Button onclick={login}>Login</Button>
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
