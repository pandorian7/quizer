export async function load({ fetch }) {
  let res = await fetch("/api/questions");
  let questions = res.json();
  return { questions };
}
