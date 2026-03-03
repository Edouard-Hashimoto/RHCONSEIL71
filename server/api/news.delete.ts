export default defineEventHandler(async (event) => {
  requireAuth(event);
  const body = await readBody(event);
  const db = useDb();
  
  const { id } = body;
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "L'ID est requis",
    });
  }
  
  const deleteStmt = db.prepare('DELETE FROM news WHERE id = ?');
  deleteStmt.run(id);
  
  return {
    success: true
  };
});
