const flock = []; //troupeau
var w = window.innerWidth;
var h = window.innerHeight;

function setup(){
    noStroke();
    var bail = createCanvas(500,500);
    bail.parent('canvasDiv')
    bail.size(w*0.75,h*0.9)
    var nbBoid = 200 ;
    
    console.log((width*height)/100);
    flock.push(new Boid(0,true));
    for(let i = 1; i < nbBoid ; i++) {
          flock.push(new Boid(i,false));
    }
   createA('http://p5js.org/', 'this is a link');
     
}

function mousePressed() {
  for (let i = 0; i < flock.length; i++) {
   flock[i].clicked(mouseX, mouseY);
      
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