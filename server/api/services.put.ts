export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.id) {
    throw createError({ statusCode: 400, statusMessage: "L'id est requis" });
  }

  const db = useDb();
  db.prepare('UPDATE services SET title = ?, color = ?, logo = ? WHERE id = ?')
    .run(body.title, body.color, body.logo ?? null, body.id);

  return { success: true };
});
