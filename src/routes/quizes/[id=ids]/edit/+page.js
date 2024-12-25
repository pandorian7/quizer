import { error } from "@sveltejs/kit";

export async function load({ params, fetch }) {
  const { id } = params;
  let res = await fetch(`/api/quizes/${id}`);
  if (!res.ok) {
    if (res.status === 404) {
      error(404, { message: "quiz does not exist" });
    } else {
      error(500, { message: "unable to fetch quiz" });
    }
  }
  let quiz = await res.json();
  return { quiz };
}
