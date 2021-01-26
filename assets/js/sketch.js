const flock = []; //troupeau
var w = window.innerWidth;
var h = window.innerHeight;

function setup(){
    noStroke();
    var bail = createCanvas(500,500);
    bail.parent('canvasDiv')
    bail.size(w*0.75,h*0.9)
    let nbBoid = 100 ;
    let prop = 1/nbBoid;
    for(let i = 0; i < nbBoid ; i++) {
          flock.push(new Boid(i));
    }
   
     
}

function draw() { 
    
    background(51);   
     
    for(let boid of flock) { 
        
        boid.Edges();  
        
        boid.Flock(flock);
        boid.Update();
        boid.Show();
        
    }
    
}