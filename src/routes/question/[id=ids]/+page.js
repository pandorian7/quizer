export async function load({ params, fetch }) {
  const res = await fetch(`/api/questions/${params.id}`);
  const { question, answers } = await res.json();
  return { editing: true, question, answers };
}
