export async function load({ fetch }) {
  let res = await fetch("/api/questions");
  let questions = await res.json();
  return { questions };
}
