class Submarine {
  constructor(course) {
    this.position = [0, 0, 0]; // horizontal, aim, depth
    this.course = course;
  }

  down(z) {
    this.position[1] += z;
  }

  up(z) {
    this.position[1] -= z;
  }

  forward(x) {
    this.position[0] += x;
    this.position[2] += this.position[1] * x;
  }

  // back(x) {
  //   this.position[0] -= x;
  // }

  // left(y) {
  //   this.position[0] -= y;
  // }

  // right(y) {
  //   this.position[0] -= y;
  // }

  setCourse(course) {
    this.course = course;
  }

  run() {
    this.course.forEach(([movement, value]) => {
      this[movement](Number(value));
    });
    return this.position;
  }
}

export default Submarine;
