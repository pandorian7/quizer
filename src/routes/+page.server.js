import * as db from "$lib/server/database";

export const actions = {
  addQuestion: async ({ request }) => {
    const data = await request.formData();
    const question = data.get("question");
    // @ts-ignore
    db.addQuestion(question);
    return { success: true };
  },
};
