async function createUser(username, password) {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (res.ok) {
    return data.user_id;
  } else {
    throw new Error(data.message);
  }
}

async function login(username, password) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }
}

export default { user: { create: createUser, login } };
