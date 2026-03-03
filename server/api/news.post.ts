export default defineEventHandler(async (event) => {
  requireAuth(event);
  const body = await readBody(event);
  const db = useDb();
  
  const { title, content } = body;
  
  if (!title || !content) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le titre et le contenu sont requis',
    });
  }
  
  const date = new Date().toISOString().split('T')[0];
  
  const insert = db.prepare('INSERT INTO news (title, content, date) VALUES (?, ?, ?)');
  const result = insert.run(title, content, date);
  
  return {
    id: result.lastInsertRowid,
    success: true
  };
});
