import * as db from "$lib/server/database";

export const actions = {
  addQuestion: async ({ request }) => {
    const data = await request.formData();
    const question = data.get("question");
    if (question) {
      await db.addQuestion(String(question));
      return { success: true };
    }
    return { success: false };
  },
  deleteQuestion: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));

    await db.deleteQuestion(id);

    return { success: true };
  },
};
