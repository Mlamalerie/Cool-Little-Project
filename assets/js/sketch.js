const flock = []; //troupeau
var w = window.innerWidth;
var h = window.innerHeight;

function setup(){
    noStroke();
    var bail = createCanvas(500,500);
    bail.parent('canvasDiv')
    bail.size(w*0.75,h*0.85) 
    var nbBoid = 200 ;

    console.log((width*height)/100);
    flock.push(new Boid(0,true));
    //flock.push(new Boid(1,true));
    for(let i = 1; i < nbBoid ; i++) {
        flock.push(new Boid(i,false));
    }

}

function mousePressed() {
    for (let i = 0; i < flock.length; i++) {
        flock[i].clicked(mouseX, mouseY);

    }
}

function draw() { 
cursor(ARROW);
    background(51);   


    for(let boid of flock) { 

        boid.Edges();  

        boid.Flock(flock);
        boid.Update();
        boid.Show();

    }

    
    let d = dist(mouseX, mouseY, flock[0].position.x, flock[0].position.y);
    if ((d < 15)) {
        cursor('pointer');
    }
    


}