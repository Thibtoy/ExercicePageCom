function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}

const fs = requireUncached('fs');
const sqlite3 = requireUncached('sqlite3').verbose();
const express = requireUncached("express");
const cors = requireUncached("cors");
const dbFile = 'données.db';
const db = new sqlite3.Database(dbFile);

const app = express();
app.use(cors());

	 db.serialize( () => {//db.serialize est une méthode de base de donnée, elle permet d'executer les instructions ligne après ligne, si on ne l'utilise pas, vu que le premier db run n'a pas finis de tourner quand le deuxième se lance, il se passe une erreur
	 	//if (!fs.existsSync(dbFile)) {
	 		db.run('CREATE TABLE products (id TEXT UNIQUE PRIMARY KEY)');
	 		db.run('INSERT INTO products (id) VALUES (?)', "patisseries");
	 		db.run('INSERT INTO products (id) VALUES (?)', "voitures");
	 		db.run('INSERT INTO products (id) VALUES (?)', "chaussures");

	 		db.run('CREATE TABLE articles (articles_id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, type TEXT, articles_name TEXT, articles_prix INTEGER, articles_img TEXT, articles_status BOOLEAN, articles_products_id TEXT, FOREIGN KEY(articles_products_id) REFERENCES products(id))');
	 		db.run('INSERT INTO articles (type, articles_name, articles_prix, articles_img, articles_status, articles_products_id) VALUES (?, ?, ?, ?, ?, ?)', 'patisseries', 'tarte', 150, "produit1.png", true, 'patisseries');
	 		db.run('INSERT INTO articles (type, articles_name, articles_prix, articles_img, articles_status, articles_products_id) VALUES (?, ?, ?, ?, ?, ?)', 'chaussures', 'crocs', 2050, "crocs.png", false, 'chaussures');
	 		db.run('INSERT INTO articles (type, articles_name, articles_prix, articles_img, articles_status, articles_products_id) VALUES (?, ?, ?, ?, ?, ?)', 'voitures', 'FIAT', 300, "fiat.png", true, 'voitures');
	 		db.run('INSERT INTO articles (type, articles_name, articles_prix, articles_img, articles_status, articles_products_id) VALUES (?, ?, ?, ?, ?, ?)', 'tee_shirt', '0arte', 150, "produit1.png", true, 'patisseries');
	 		db.run('INSERT INTO articles (type, articles_name, articles_prix, articles_img, articles_status, articles_products_id) VALUES (?, ?, ?, ?, ?, ?)', 'tee_shirt', 'tart2', 150, "produit1.png", true, 'chaussures');

	 		/*db.run('CREATE TABLE tee_shirt (tee_shirt_id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, type TEXT, tee_shirt_name TEXT UNIQUE, tee_shirt_prix INTEGER, tee_shirt_img TEXT UNIQUE, tee_shirt_status BOOLEAN, tee_shirt_products_id TEXT, FOREIGN KEY(tee_shirt_products_id) REFERENCES products(id))');
	 		db.run('INSERT INTO tee_shirt (type, tee_shirt_name, tee_shirt_prix, tee_shirt_img, tee_shirt_status, tee_shirt_products_id) VALUES (?, ?, ?, ?, ?, ?)', 'tee_shirt', 'tarte', 150, "produit1.png", true, 'tee_shirt');

	 		db.run('CREATE TABLE sac (sac_id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, type TEXT, sac_name TEXT UNIQUE, sac_prix INTEGER, sac_img TEXT UNIQUE, sac_status BOOLEAN, sac_products_id TEXT, FOREIGN KEY(sac_products_id) REFERENCES products(id))');
			db.run('INSERT INTO sac (type, sac_name, sac_prix, sac_img, sac_status, sac_products_id) VALUES (?, ?, ?, ?, ?, ?)', 'sac', 'Crocs', 70, "crocs.png", false, 'sac');

	 		db.run('CREATE TABLE chaussures (chaussures_id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, type TEXT, chaussures_name TEXT UNIQUE, chaussures_prix INTEGER, chaussures_img TEXT UNIQUE, chaussures_status BOOLEAN, chaussures_products_id TEXT, FOREIGN KEY(chaussures_products_id) REFERENCES products(id))');
			db.run('INSERT INTO chaussures (type, chaussures_name, chaussures_prix, chaussures_img, chaussures_status, chaussures_products_id) VALUES (?, ?, ?, ?, ?, ?)', 'chaussures', 'Fiat', 300, "fiat.png", true, 'chaussures');

	 		db.run('CREATE TABLE article_to_products (article_to_products_id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, products_id TEXT, tee_shirt_id INTEGER, sac_id INTEGER, chaussures_id INTEGER, FOREIGN KEY(products_id) REFERENCES products(id), FOREIGN KEY(tee_shirt_id) REFERENCES tee_shirt(tee_shirt_id), FOREIGN KEY(sac_id) REFERENCES sac(sac_id), FOREIGN KEY(chaussures_id) REFERENCES chaussures(chaussures_id))');
	 		db.run('INSERT INTO article_to_products (products_id, tee_shirt_id, sac_id, chaussures_id) VALUES (?, ?, ?, ?)', 'tee_shirt', 1, 0, 0); 
	 		db.run('INSERT INTO article_to_products (products_id, tee_shirt_id, sac_id, chaussures_id) VALUES (?, ?, ?, ?)', 'sac', 0, 1, 0); 
	 		db.run('INSERT INTO article_to_products (products_id, tee_shirt_id, sac_id, chaussures_id) VALUES (?, ?, ?, ?)', 'chaussures', 0, 0, 1); */

	 	//}
			db.all('SELECT * FROM products INNER JOIN articles ON products.id = articles.articles_products_id ORDER BY products.id DESC'/* WHERE products(id) = tee_shirt_products_id or sac_products_id or chaussures_products_id      INNER JOIN article_to_products       INNER JOIN sac ON products.id = sac.sac_products_id INNER JOIN chaussures ON products.id = chaussures.chaussures_products_id */, function (error, data) {
    			if (!error) console.log(data);
    			else console.log(error);
  			});
	 });

app.get('/', function(request, response){
	db.all('SELECT * FROM products INNER JOIN articles ON products.id = articles.articles_products_id ORDER BY products.id DESC' /*NATURAL JOIN sac NATURAL JOIN chaussures*/, function(error, data){
		response.send(data);
	});
});


app.listen(3000, function (error) {
	if (!error) console.log('Example app listening on port 3000!');
});