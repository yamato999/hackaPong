const SPEED = 0.02;
const MOVEMENT_DURATION = 300; // Длительность движения в миллисекундах
const MOVEMENT_STEP = SPEED * MOVEMENT_DURATION; // Шаг движения в единицу времени

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
    this.reset();
  }

  get position() {
    return parseFloat(
        getComputedStyle(this.paddleElem).getPropertyValue("--position")
    );
  }

  set position(value) {
    this.paddleElem.style.setProperty("--position", value);
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  reset() {
    this.position = 50;
  }

  move(delta, direction) {
    const movement = MOVEMENT_STEP * delta * direction;
    const newPosition = this.position + movement;

    if (newPosition >= 0 && newPosition <= 100) {
      this.position = newPosition;
    }
  }

  update(delta, direction) {
    this.move(delta, direction);
  }
}
