function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class Car {
  constructor(isPlayer) {
    this.y = -80;
    this.isPlayer = isPlayer;
    this.width = 45;
    this.height = 60;
    this.roadLane = 0;
    this.init();
  }

  init() {
    if (this.isPlayer) {
      this.roadLane = 1;
    } else {
      this.roadLane = getRandomInt(0, 2);
    }
    this.x = this.roadLane * 130 + this.width;
  }

  changeLane(lane) {
    this.roadLane = lane;
    this.x = this.roadLane * 130 + this.width;
  }

  hasCollided(car) {
    if (
      this.x < car.x + car.width &&
      this.x + this.width > car.x &&
      this.y < car.y + car.height &&
      this.y + this.height > car.y
    ) {
      return true;
    } else {
      return false;
    }
  }
}
