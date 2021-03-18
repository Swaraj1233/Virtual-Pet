var dog,sadDog,happyDog;
var foodObj;
var feed,addFood,fedtime,lastfed,foodStock;
var database;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(800,400);
  database = firebase.database();
  foodObj = new Food();
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  dog=createSprite(600,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed Me");
  feed.position(500,150);
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food");
  addFood.position(600,100);
  addFood.mousePressed(addFood)
}

function draw() {
  background("yellow");
  foodObj.display();
  fedtime = database.ref('fedtime');
  fedtime.on("value",function(data){
    lastfed = data.val()
  })
  if(lastfed>12){
    text("last fed"+lastfed%12,300,30)
  }
  else if(lastfed === 0){
    text("lastfeed 12am",300,30)
  }
  else{
    text("last fed"+lastfed,300,30)
  }
  drawSprites();
}

function readStock(data){
  foodS = data.val()
  foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDog);

}

function addFood(){
  foodS++
  database.ref('/').update({
    food:foodS
  })
}
//function to read food Stock


//function to update food stock and last fed time


//function to add food in stock
