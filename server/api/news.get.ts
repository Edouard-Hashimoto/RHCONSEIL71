export default defineEventHandler(async (event) => {
  const db = useDb();
  
  const count = db.prepare('SELECT COUNT(*) as count FROM news').get();
  
  if (count.count === 0) {
    const insert = db.prepare('INSERT INTO news (title, content, date) VALUES (?, ?, ?)');
    insert.run(
      "Nouveau bureau à Lyon", 
      "RH Conseil s'agrandit avec l'ouverture d'une nouvelle agence à Lyon pour mieux accompagner nos clients du Rhône-Alpes.",
      "2026-02-25"
    );
    insert.run(
      "Webinaire : Le recrutement en 2026", 
      "Rejoignez-nous le 15 mars pour un webinaire exclusif sur les nouvelles tendances du recrutement et de la rétention des talents.",
      "2026-03-15"
    );
    insert.run(
      "Bienvenue à notre nouvelle consultante", 
      "Nous sommes ravis d'accueillir Sophie Durand qui rejoint notre équipe en tant que consultante en stratégie RH.",
      "2026-02-20"
    );
  }
  
  const news = db.prepare('SELECT * FROM news ORDER BY date DESC').all();
  return news;
});
