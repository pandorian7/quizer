export async function load({ params, fetch }) {
  const endpoint = `/api/quizes/${params.id}/questions`;
  const res = await fetch(endpoint);
  const { questions, title } = await res.json();
  console.log(questions);
  return { id: params.id, questions, title };
}
