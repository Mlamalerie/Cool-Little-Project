function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

class Boid {
    constructor(num){
        this.position = createVector(random(width),random(height)); // positionnement aléaotoire
        this.velocity = p5.Vector.random2D(); // vecteur vitesse aléatoire
        this.velocity.setMag(random(2,4)); // change la magnitude

        this.acceleration = createVector();

        this.maxForce = 0.01;
        this.numero = num;
    }

    Show() {
        strokeWeight(15);
        stroke(255, 195-(this.numero*3), 5+(this.numero*2));
        
        point(this.position.x,this.position.y); 
    }

    Update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);

    }

    Align(boids) { // cette fct aligne notre boid sur les autres boids
        let rayonPerception = 33;

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
            //this.velocity = avg; non ce qu'on veut c'est que l'oiseau se dirige vers cette direction
            avg.sub(this.velocity);
            avg.limit(this.maxForce);
           
        }
         
         return avg;
        

    }
    
    Flock(boids) {
        let alignment = this.Align(boids);
        this.acceleration  = alignment;
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