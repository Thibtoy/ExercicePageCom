var products = [];
var produits = [];
var out = [];
var achat = {};
var panier = [];


$.get('http://localhost:3000/', function (response) {
		console.log(response);
      response.forEach( function (prod) {
      	new Objet(prod.articles_prix, prod.articles_name, prod.articles_img, prod.articles_status);
  });

});

class Produit{
	constructor(p, n, img) {
		this.prix = p;
		this.nom = n;
		this.img = img;
		panier.push(this);
		}
}

class Objet{
	constructor(p, n, img, like) {
		this.prix = p;
		this.nom = n;
		this.img = img;
		this.like = like;
		this.parent = document.getElementById('zone');
		this.createElems();
		this.setElemsAttribute();
		this.appendElems();
		this.HTMLfill();
		this.boutton.addEventListener("click", payes.bind(this));
		this.jaime.addEventListener("click", clique.bind(this));
		produits.push(this);
	}
	
	createElems() {
		this.annonce = document.createElement('div');
		this.titre = document.createElement('h3');
		this.cadre = document.createElement('div');
		this.info = document.createElement('div');
		this.price = document.createElement('p');
		this.boutton = document.createElement('button');
		this.jaime = document.createElement('img');	
	}

	setElemsAttribute() {
		this.annonce.setAttribute("class", "produit");
		this.cadre.setAttribute("class", "cadre");
		this.info.setAttribute("class", "info");
		this.jaime.setAttribute("class", "jaime");
		if (this.like == false) {
		this.jaime.setAttribute("src", "dislike.png");
		}
	  else {this.jaime.setAttribute("src", "like.png");}
	}

	appendElems() {
		this.parent.appendChild(this.annonce);
		this.annonce.appendChild(this.titre);
		this.annonce.appendChild(this.cadre);
		this.annonce.appendChild(this.info);
		this.info.appendChild(this.price);
		this.info.appendChild(this.boutton);
		this.info.appendChild(this.jaime);
	}

	HTMLfill() {
		this.titre.innerHTML = this.nom;
		this.cadre.innerHTML = "<img class='imgprod' src='"+this.img+"' alt='impossible d'afficher l'image'/>";
		this.boutton.innerHTML = "PAYES!!!!";
		this.price.innerHTML = " "+this.prix+" "+"euros";
	} 

}

function payes() {
achat = this;
var par = document.getElementsByTagName('body');
var form = document.createElement('form');
var p = document.createElement('p');
var div = document.createElement('div');
var inptok = document.createElement('input');
var inptback = document.createElement('input');
form.setAttribute('class', "form");
inptok.setAttribute('id', "inptok")
inptok.setAttribute('type', "submit");
inptok.setAttribute('class', "submit");
inptok.setAttribute('value', "ok");
inptback.setAttribute('id', "inptback")
inptback.setAttribute('type', "submit");
inptback.setAttribute('classe', "submit");
inptback.setAttribute('value', "annuler");
par[0].appendChild(form);
form.appendChild(p);
form.appendChild(inptok);
form.appendChild(inptback)
p.innerHTML = "Alors tu veux acheter"+" "+this.nom+" "+"pour"+" "+this.prix+"euros ?<br/> Tu a l'oeil toi hein?";
inptok.addEventListener("click", achete);
inptback.addEventListener("click", achete);
out.push(par, form);
}

function clique() {
	this.like = (this.like == true) ? false : true;
		if (this.like == true) {
			this.jaime.setAttribute("src", "like.png");
		}
  	  else{
  			this.jaime.setAttribute("src", "dislike.png");
		}
}

function achete(event) {
	var store = localStorage.length;
	event.preventDefault();
	var inpt = event.target.getAttribute("Id");
	if (inpt == "inptok") {
		console.log(achat.nom)
	localStorage.setItem('Objet n'+(store+1), achat.nom);
	gotIt();
	new Produit(achat.prix, achat.nom, achat.img);
	if (!document.getElementById("panier")) {
		createPanier();
	}
}

	else {gotIt();}
}
function gotIt() {
	out[0][0].removeChild(out[1]);
	out.length = 0;
}

function createPanier() {
	par = document.getElementsByTagName("body");
	div = document.createElement('img');
	div.setAttribute('id', "panier");
	div.setAttribute('src', "panier.png");
	par[0].appendChild(div);
	div.addEventListener("click", lePanier);
}

function resultat  () {
		var res = 0;
		for (var i = 0; i < panier.length; i++) {
			res += panier[i].prix
		}
		return res;
}

function lePanier() {

	
	par = document.getElementsByTagName("body");
	cadre = document.createElement('div');
	sortie = document.createElement('button');
	h3 = document.createElement('h3');
	h4 = document.createElement('h4');
	div = document.createElement('div');
	bttn = document.createElement('button');
	cadre.setAttribute('id', "lepanier");
	sortie.setAttribute('id', "sortie");
	div.setAttribute('class', "affichage");
	bttn.setAttribute('class', "payes");
	sortie.innerHTML = "SORTIE"
	bttn.innerHTML = "PAYES MAINTENANT";
	h3.innerHTML = "!!!VOS ACHATS!!!";
	h4.innerHTML = resultat()+" "+"euros";
	par[0].appendChild(cadre);
	cadre.appendChild(sortie);
	cadre.appendChild(h3);
	cadre.appendChild(div);
	cadre.appendChild(h4);
	cadre.appendChild(bttn);
	sortie.onclick = function() {
		par[0].removeChild(cadre);
	};
	
	panier.forEach(function(object) {
		object.indiv = document.createElement('div');
		cadreimg = document.createElement('div')
		img = document.createElement('img');
		p = document.createElement('p');
		suppr = document.createElement('img');
		object.indiv.setAttribute('class', "box");
		cadreimg.setAttribute('class', 'cadreBox')
		suppr.setAttribute('src', "suppr.png");
		suppr.setAttribute('class', "suppr");
		img.setAttribute('class', "imgBox");
		img.setAttribute("src", object.img);
		p.innerHTML = object.nom+"<br/> "+object.prix+" "+"euros"
		div.appendChild(object.indiv);
		object.indiv.appendChild(suppr);
		object.indiv.appendChild(cadreimg);
		object.indiv.appendChild(p);
		cadreimg.appendChild(img);
		suppr.onclick = function() {
			var out = object;
			panier.forEach(function(objet){
				console.log(objet, out, panier);
				if (objet == out) {
					panier.splice(panier.indexOf(objet), 1);
					div.removeChild(out.indiv);
					h4.innerHTML = resultat()+" "+"euros";
					if (panier.length === 0) {
						par[0].removeChild(cadre);
						par[0].removeChild(document.getElementById('panier'));
					}
				}
			});
		}
	});

}
/*var produit = new Objet(150.25 , "Tarte", "produit1.png", false);
var produit = new Objet(2000, "Crocs de Compet'", "crocs.png", true);
var produit = new Objet(2, "Ma fiat", "fiat.png", false);*/

