class Triangle {
  constructor(color) {
    this.color = color;
  }

  getShapeAttributes() {
    const points = "0,200 300,200 150,0";

    return `points="${points}"`;
  }
}

module.exports = Triangle;
