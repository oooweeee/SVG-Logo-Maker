const Shapes = require('./shapes.js');
const fs = require('fs/promises');
const { join } = require('path');

jest.mock('fs/promises', () => ({
writeFile: jest.fn().mockResolvedValue()    
}));

describe('Shapes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('generates correct SVG for circle', async () => {
const circle = new Shapes('circle', 'red', 'ABC', 'orange');
const expectedPath = join(__dirname, '..', 'examples', 'circles.svg');
const expectedContent = `<svg xmlns="http://www.w3.org/svg" version="1.1" width = "300" height = "200" ><circle cx="150" cy="100" r="100" style="fill:red" /><text x="150" y="125" style="font-family: Arial; font-size: 40px; fill: orange; text-anchor: middle">ABC</text></svg>`; 

await circle.createSVG();

expectedContent(fs.writeFile).toHaveBeenCalledWith(expectedPath, expectedContent);
});

it('generates correct SVG for square', async () => {
    const square = new Shapes('square', 'blue', 'ABC', 'orange');
    const expectedPath = join(__dirname, '..', 'examples', 'square.svg');
    const expectedContent = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width = "300" height = "200" ><rect x="10" y="10" width="200" height="200" style="fill:blue" /><text x="150" y="125" style="font-family: Arial; font-size: 40px; fill: orange; text-anchor: middle">ABC</text></svg>`;

    await square.createSVG();

    expect(fs.writeFile).toHaveBeenCalledWith(expectedPath, expectedContent);
  });

  it('handles invalid shape', async () => {
    const invalid = new Shapes('hexagon', 'green', 'GHI', 'white');
    await invalid.createSVG();
    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  it('generates correct SVG for triangle', async () => {
    const triangle = new Shapes('triangle', 'yellow', 'JKL', 'black');
    const expectedPath = join(__dirname, '..', 'examples', 'triangle.svg');
    const expectedContent = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width = "300" height = "200" ><polygon points="0,200 300,200 150,0" style="fill:yellow" /><text x="145" y="125" style="font-family: Arial; font-size: 40px; fill: black; text-anchor: middle">JKL</text></svg>`;

    await triangle.createSVG();

    expect(fs.writeFile).toHaveBeenCalledWith(expectedPath, expectedContent);
  });
});