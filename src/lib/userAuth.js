async function createUser(username, password) {
  const res = await fetch("/api/users", {
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

export default { user: { create: createUser } };
