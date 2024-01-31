//Dzidoula KPOGLO && Ouiza KADDOUR
/*Fonctionnalités demandées et implémentées (toutes):
  - Initialisation et affichage de la grille selon les disques
  - fonctions pour connaître le nombre de lignes et de colonnes d'une grille passée en paramètre
  - Jouer un coup qui comprend des fonctions de vérification de la validité d'une colonne et si une colonne est libre ou pas
  - Jeu à 2 joueurs
  - Coup gagnant
  - Faire jouer l'ordinateur (jeu aléatoire, analyse de tous les coups possibles, analyse de la victoire, Evaluation de la grille)
  - Fonctions pour le jeu entre deux humains et humain vs ordinateur
  - Fonction principale de jeu
*/


//Initialisation de la grille
function InitialisationGrille(nr_lignes:number, nc_colonnes:number): Array<Array<number>>{
    let Grille = new Array<Array<number>>();

    for (let i = 0; i < nr_lignes; i++){
        let ligne = new Array<number>();
        for (let j = 0; j < nc_colonnes; j++){
            ligne.push(0);
        }
        Grille.push(ligne);
    }
    return Grille;
}

//Fonctions nr() et nc()

//Nombre de lignes
function nr (g:Array<Array<number>>):number {
    return g.length;
}
//Nombre de colonnes
function nc (g:Array<Array<number>>): number {
    return g[0].length;
}
//Affichage de la grille
function affichageGrille(grille:Array<Array<number>>): void {
    for (let i = 0; i < nr(grille); i++){
        let affichage = '';
        for (let j = 0; j < nc(grille); j++){
            if (grille[i][j] === 0){
                affichage += '-'+'  ';
            }else if(grille[i][j] === 1){
                affichage  += 'O'+'  ';
            }else if(grille[i][j] === 2){
            affichage += 'X'+'  ';
            }
 }    
 console.log(affichage);
   }  
   //Affichage des indices
   let egalite = '';
   let indices = '';
   for (let k = 0; k < nc(grille); k++) {
    egalite += "=" + '  ';
    indices += k + '  ';;
   }
   console.log(egalite);
   console.log(indices);

}

//Vérifier si une fonction est libre dans une colonne donnée
function estLibre (grille: Array<Array<number>>, colonne:number):boolean{
    for (let i = 0; i < nr(grille); i++){
        if (grille[i][colonne] === 0){
            return true;
        }
    }
    return false;
}

//Détermination de la validité d'une colonne
function estValide( grille: Array<Array<number>>,colonne: number): boolean {
    for (let i = 0; i < nr(grille); i++){//parcourir chaque ligne de chaque colonne 
        if(estLibre(grille, colonne) && colonne <= nc(grille)){
            return true;
        }
    }
    return false;
}

//Vérification de a validité de la colonne saisie par l'utilisateur dans la finction saisirColonne() 
function saisirColonneValide(grille:Array<Array<number>>):number{
    let colonneChoisie = Number(prompt('Choisissez une colonne valide'));
    while(!estValide(grille,colonneChoisie)){
        colonneChoisie = Number(prompt('Colonne non valide! Veuillez choisir une nouvelle'));
    }
    return colonneChoisie;
}

//Déterminer quelle est la ligne r ou tombe le disque joué à la colonne c dans la grille g.
function TrouverLigne(grille:Array<Array<number>>, colonneValide: number): number {
    for (let ligne = nr(grille) -1; ligne >=0; ligne --){
        if(grille[ligne][colonneValide] === 0){
            return ligne;
        }
    }
return -1;
}


//Modification de la grille avec le disque choisi par le joueur p dans la colonne c
function ModifierGrille(grille:Array<Array<number>>, colonne:number, ligne:number, disque:number): Array<Array<number>>{
    if ( disque === 1 || disque === 2){
        grille [ligne][colonne] = disque;
    }
    return grille;
}
//Fonction de vérification si la grille est remple ou pas
function estGrilleRemplie (grille:Array<Array<number>>): boolean {
    for (let i = 0; i < nr(grille); i++){
        for (let j = 0; j < nc(grille); j++) {
            if(grille[i][j]===0){
                return false;
            }
        }
    }
    return false;
}
/*****************************JOUER A DEUX**************************** */
//Function is_align
function is_align(grille:Array<Array<number>>, lc:Array<[number,number]>, p:number): boolean{
    let casesConsecutives = 4;
    for(let i= 0; i <= lc.length - casesConsecutives; i++){
        let compteur = 0;
        for (let j = i; j < i + casesConsecutives; j++){
            let [r,c] = lc [j];
            if (r>=0 && r < nr(grille) && c >= 0 && c < nc(grille) && grille[r][c] === p){
                compteur ++;
            } else{
                compteur = 0;
            }
        }
        if (compteur === casesConsecutives){
            return true;
            }
        
    }
    return false;
}

//Lonction is_win pour gagner avec un alignement 
function is_win(grille:Array<Array<number>>, ligne:number, colonne: number, p:number): boolean{
   let lcLigne = new Array<[number, number]>();
   let lcColonne = new Array<[number, number]>();
   let lcDiagonale1 = new Array<[number, number]>();
   let lcDiagonale2 = new Array<[number, number]>();
   
   //Ligne
   for (let i = colonne - 3; i <= colonne + 3; i++){
    if (i >= 0 && i < nc(grille)){
        lcLigne.push([ligne, i]);
    }
   }

   //Colonne 
   for (let i = ligne - 3; i <= ligne + 3; i++){
    if (i >= 0 && i < nr(grille)) {
        lcColonne.push([i, colonne]);
    }
   }

   //Première diagonale
   for (let i = -3; i<= 3; i++){
    let li = ligne + i;
    let co = colonne + i;
    if (li >= 0 && li < nr(grille) && co >= 0 && co < nc(grille)){
        lcDiagonale1.push([li,co]);
    }
   }

   //Deuxième diagonale
   for (let i = -3; i <= 3; i++){
    let li = ligne + i;
    let co= colonne - i;
    if (li >= 0 && li < nr(grille) && co >= 0 && co < nc(grille)){
        lcDiagonale2.push([li,co]);
    }
   }

   //Vérifie l'alignement dans toutes les directions
   return (is_align(grille, lcLigne, p) || is_align(grille, lcColonne, p) || is_align(grille, lcDiagonale1, p) || is_align(grille, lcDiagonale2, p));
}



/****************************** FAIRE JOUER L'ORDINATEUR*********************** */
//Fonction pour connaitre toutes les colonnes (coupes) valides de la grille
function colonnesValides(grille:Array<Array<number>>): Array<number> {
    let Tableaucolonnes = new Array<number>();
    for (let colonne = 0; colonne < nr(grille); colonne++){
        if (estValide(grille,colonne)){
            Tableaucolonnes.push(colonne);
        }
    }
    return Tableaucolonnes;
}

//Fontion ia_aleat (g) qui renvoie aléatoirement une colonne c.
function ia_aleat(grille:Array<Array<number>>):number {
    let colonneValide:Array<number> = colonnesValides(grille);
    let colonneAleatoire = Math.floor(Math.random() * colonneValide.length);
    return colonneValide[colonneAleatoire];
}

//Function permettant de cloner une grille 
function copieGrille (grille:Array<Array<number>>):Array<Array<number>>{
    let copie = new Array<Array<number>>();
    for (let i = 0; i < nr(grille); i++){
        copie[i] = new Array<number>();
        for (let j = 0; j < nc(grille); j++){
            copie[i][j] = grille [i][j];
        }
    }
    return copie;
}

//L'ordinateur annule un coup après l'avoir joué
function unmove (grille: Array<Array<number>>, c:number):Array<Array<number>>{
    for (let i = nr(grille) -1; i >= 0; i--){
        if(grille[i][c] !== 0){
            if(grille[i][c] === 2){//pour ne pas risquer de supprimer le coup du joueur
                grille[i][c] = 0;
                return grille;
            }
        }
    }
    return grille;
 }

//Fonction pour déterminer un coup gagant 
function ia_win(grille:Array<Array<number>>, p:number):number{
    let coupsValides = colonnesValides(grille);
    let NouvelleGrille = copieGrille(grille); //Création d'une nouvelle grille pour ne pas modifier l'ancienne
    for(let c of coupsValides) {
    let ligne = TrouverLigne(grille, c);
    NouvelleGrille = ModifierGrille(NouvelleGrille, c, ligne, p);
    if(is_win(grille,ligne,c,p)){
        return c;
    }
    else{
     NouvelleGrille = unmove(NouvelleGrille, c);
        }
    }
    return ia_aleat(NouvelleGrille);
}

//Calcul des quadruplets
function calculQuadrulplets (quadruplets: Array<number>):number{
    let score = 0;
        let nbDisquesJoueur = 0;
        let nbDisquesAdversaire = 0;
        for(let i = 0; i < quadruplets.length; i++){
            if(quadruplets[i] === 1){
                nbDisquesJoueur++;
            }else if (quadruplets[i] === 2){
                nbDisquesAdversaire++;
            }
        }    
        if (nbDisquesJoueur > 0 && nbDisquesAdversaire === 0){
            if (nbDisquesJoueur === 1){
                score = 1;
            } else if (nbDisquesJoueur ===2){
                score = 10;
            } else if (nbDisquesJoueur === 3){
                score = 1000;
            } else if (nbDisquesJoueur === 4){
                score = 10000;
            }
        } else if (nbDisquesAdversaire > 0 && nbDisquesJoueur === 0){
            if(nbDisquesAdversaire === 1){
                score = -1;
            } else if (nbDisquesAdversaire === 2){
                score = -10;
            } else if (nbDisquesAdversaire === 3){
                score = -100;
            }
        }
        return score;
    }
    //Fonction pour l'évaluation d'une grille (calcul du score)
    function evaluationGrille (grille:Array<Array<number>>, JoueurActuel:number):number{
        let scoreTotal = 0;
        for (let i = 0; i <nr(grille); i++){
            for (let j = 0; j < nc(grille); j++){

                if ( j + 3 < nc(grille)){
                    let quadrupletDroite = [grille[i][j], grille[i][j + 1], grille[i][j + 2], grille[i][j + 3]];
                    scoreTotal += calculQuadrulplets(quadrupletDroite);
                }
                //Vérification dans la direction verticale bas
                if ( i + 3 < nr(grille)){
                    let quadrupletBas = [grille[i][j], grille[i + 1][j], grille[i + 2][j], grille[i + 3][j]];
                    scoreTotal += calculQuadrulplets(quadrupletBas);

                }
                //Vérification dans la diagonale bas-droite
                if (i + 3 < nr(grille) && j + 3 < nc(grille)){
                    let quadrupletDiagonaleBasDroite = [grille [i][j], grille[i + 1][j + 1], grille[i + 2][j+ 2], grille[i + 3][j + 3]];
                    scoreTotal += calculQuadrulplets(quadrupletDiagonaleBasDroite);
                }
                //Vérification dans la diagonale bas-gauche
                if (i + 3 < nr(grille) && j - 3 >= 0){
                    let quadrupletDiagonaleBasGauche = [grille [i][j], grille[i + 1][j - 1], grille[i + 2][j - 2], grille[i + 3][j - 3]];
                    scoreTotal += calculQuadrulplets(quadrupletDiagonaleBasGauche);
                }
            }
        }
        return scoreTotal;
    }

    function evaluationMeilleurCoup (grille:Array<Array<number>>, joueurActuel: number):number{
        let meilleursCoups = new Array<number>();
        let meilleurScore = -100000;
        let coupsValides = colonnesValides(grille);
        for (let colonne of coupsValides){
            let NouvelleGrille = copieGrille(grille);
            let ligne = TrouverLigne(NouvelleGrille, colonne);
            NouvelleGrille = ModifierGrille(NouvelleGrille, colonne, ligne, joueurActuel);
            let score = evaluationGrille(NouvelleGrille, joueurActuel);

            if(score > meilleurScore){
                meilleursCoups = [colonne];
                meilleurScore = score;
            } else if (score === meilleurScore){
                meilleursCoups.push(colonne);
            }
        }
        return meilleursCoups[Math.floor(Math.random() * meilleursCoups.length)];
    }

    /********************************************************************************************/
    //Fonctions de jeu pour les deux parties

    //Jeu entre deux humains
    function jeuHumains (grille: Array<Array<number>>, joueurActuel: number): boolean{
        affichageGrille(grille);
        console.log("Joueur ", joueurActuel," à vous de jouer"); 
        let colonneJouée = saisirColonneValide(grille);
        let ligneJouée = TrouverLigne (grille, colonneJouée);
        console.log("ligne: ",ligneJouée)
        grille = ModifierGrille(grille, colonneJouée, ligneJouée, joueurActuel);

        if(is_win(grille, ligneJouée, colonneJouée, joueurActuel)){
            console.log("Joueur ",joueurActuel," a gagné");
            return true;
        }
        return false;
        
    }


    //Jeu entre un humain et l'ordinateur
    function avecIA (grille: Array<Array<number>>, joueurActuel: number): boolean{
        let colonneJouée = 0;
        affichageGrille(grille);
        if (joueurActuel === 1) {
            console.log("A vous de jouer");
            colonneJouée = saisirColonneValide(grille);
            } else {
                console.log("IA");
                colonneJouée = evaluationMeilleurCoup(grille, joueurActuel);
            }
        let ligneJouée = TrouverLigne (grille, colonneJouée);
       
        grille = ModifierGrille(grille, ligneJouée, colonneJouée, joueurActuel);
        if(is_win(grille, colonneJouée, ligneJouée, joueurActuel)){
            if (joueurActuel === 1) {
                console.log("Vous avez gagné");
                } else {
                    console.log("IA a gagné");
                }
            return true;
        }
        return false;
        
    }

    //Fonction de jeu
    function play(): void {
        let joueurActuel = 1;
        console.log("Bonjour, pour commencer le jeu, combien de lignes et colonnes voulez-vous?");
        let ligne = Number(prompt("Nombre de lignes: "));
        let colonne = Number(prompt("Nombre de colonnes"));
        let grille = InitialisationGrille(ligne,colonne);
        let reponse = Number(prompt(("Bonjour. Comment voulez-vous jouer?\n 1-Humain vs Humain \n 2- Humain vs Ordinateur\n")));
        
        //Féfinition d'une variable pour initialiser la fin du jeu
        let partieTerminée = false;

        //Définition d'une variable pour une réponse invalide pour le choix
        let choixInvalide = false;

        while(!partieTerminée && !estGrilleRemplie(grille) && !choixInvalide){
            if (reponse === 1){
                partieTerminée = jeuHumains (grille, joueurActuel);
            } else if (reponse === 2){
                partieTerminée = avecIA(grille, joueurActuel)
            } else{
                console.log("Choix invalide");
                break; //Pour sortir directement de la boucle while
            }
            if (!partieTerminée){
                //Changement de joueur
                joueurActuel = (joueurActuel % 2) + 1;
            }
            
        }
        if(partieTerminée){
            console.log("Le jeu est terminé");
        } else if (choixInvalide){
            console.log("Réponse non valide");
        } 

    }


function main():void{
play();      
}
main();
    