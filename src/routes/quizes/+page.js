export async function load({ fetch }) {
  const res = await fetch("/api/quizes");
  const quizes = (await res.json())["quizes"];
  return { quizes };
}
