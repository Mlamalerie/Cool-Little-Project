function heart(x, y, size) {
    beginShape();
    vertex(x, y);
    bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE);
}

class Boid {
    constructor(num,bossbool){
        this.position = createVector(random(width),random(height)); // positionnement aléaotoire
        this.velocity = p5.Vector.random2D(); // vecteur vitesse aléatoire
        this.velocity.setMag(random(2,4)); // change la magnitude

        this.acceleration = createVector();

        this.maxForce = 0.01; //
        this.maxSpeed = 3.5;
        this.numero = num; 
        this.boss = bossbool// if num == -1 then c'est le coeur bleu

        if (this.boss) {
            this.maxSpeed = 8;
        } else {
            this.maxSpeed = 2.5;
        }
    }


    clicked(px, py) {
        let d = dist(px, py, this.position.x, this.position.y);
        if ((d < 21)&&(this.boss)) {
            window.open("https://www.w3schools.com");
        }
    }

    Show() {
        strokeWeight(8);
        let taille = 20;
        if(!this.boss) {
            fill(255, 190-(this.numero*3), 5+(this.numero*2));
            noStroke();
            
        }else{
            taille = 30;
            fill(0, 255, 255);
            noStroke();
        }

        heart(this.position.x,this.position.y, taille);
        //point(this.position.x,this.position.y); 
    }

    Update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        //this.acceleration.mult(0);

    }

    Align(boids) { // cette fct aligne notre boid sur les autres boids
        let rayonPerception = 35; //******

        let avg = createVector(); // moyenne, vecteur direction désiré

        let nbBoids = 0;
        for(let other of boids) { 
            let distance = dist(this.position.x,this.position.y,other.position.x,other.position.y);

            if (other != this && distance < rayonPerception ){
                avg.add(other.velocity); // somme tous les vecteurs
                nbBoids++;
            }
        }

        if(nbBoids > 0) {
            avg.div(nbBoids) // divise par le nombre de oiseau dans le perimètre
            avg.setMag(this.maxSpeed);

            //this.velocity = avg; non ce qu'on veut c'est que l'oiseau se dirige vers cette direction
            avg.sub(this.velocity);
            avg.limit(this.maxForce);

        }

        return avg;


    }

    Separation(boids) {
        let perceptionRadius = 32;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d * d);
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    Cohesion(boids) {
        let perceptionRadius = 25;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perceptionRadius) {
                steering.add(other.position);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    Flock(boids) {
        let alignment = this.Align(boids);
        let cohesion = this.Cohesion(boids);
        let separation = this.Separation(boids);


        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    Edges() {
        if(this.position.x > width) {
            this.position.x = 0;
        }
        if(this.position.x < 0) {
            this.position.x = width;
        }

        if(this.position.y > height) {
            this.position.y = 0;
        }
        if(this.position.y < 0) {
            this.position.y = height;
        }
    }


}