export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const db = useDb();
  const service = db.prepare('SELECT * FROM services WHERE id = ?').get(id);
  
  if (!service) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Service non trouvé'
    });
  }
  
  return service;
});
