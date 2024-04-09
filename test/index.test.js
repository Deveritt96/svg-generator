const fs = require('fs');
const inquirer = require('inquirer');

// Import the classes from your main file
const { Circle, Rectangle, Triangle } = require('../index.js');

describe('SVG Generator', () => {
    // Mocking the inquirer prompt
    jest.mock('inquirer');
    const mockAnswers = {
        width: 100,
        height: 100,
        fillColor: 'red',
        shape: '', // We'll set this dynamically in each test case
        text: 'Test',
        textColor: 'white',
        textSize: 12,
        save: true
    };

    it('should generate SVG content for a Circle shape', async () => {
        mockAnswers.shape = 'Circle';
        inquirer.prompt.mockResolvedValue(mockAnswers);

        const circle = new Circle(mockAnswers.width, mockAnswers.height, mockAnswers.fillColor, mockAnswers.text, mockAnswers.textColor, mockAnswers.textSize);
        const expectedSvgContent = `<svg width="${mockAnswers.width}" height="${mockAnswers.height}" xmlns="http://www.w3.org/2000/svg">${circle.generateSVG()}</svg>`;

        const svgContent = await generateSVG();

        expect(svgContent).toBe(expectedSvgContent);
    });

    it('should generate SVG content for a Rectangle shape', async () => {
        mockAnswers.shape = 'Rectangle';
        inquirer.prompt.mockResolvedValue(mockAnswers);

        const rectangle = new Rectangle(mockAnswers.width, mockAnswers.height, mockAnswers.fillColor, mockAnswers.text, mockAnswers.textColor, mockAnswers.textSize);
        const expectedSvgContent = `<svg width="${mockAnswers.width}" height="${mockAnswers.height}" xmlns="http://www.w3.org/2000/svg">${rectangle.generateSVG()}</svg>`;

        const svgContent = await generateSVG();

        expect(svgContent).toBe(expectedSvgContent);
    });

    it('should generate SVG content for a Triangle shape', async () => {
        mockAnswers.shape = 'Triangle';
        inquirer.prompt.mockResolvedValue(mockAnswers);

        const triangle = new Triangle(mockAnswers.width, mockAnswers.height, mockAnswers.fillColor, mockAnswers.text, mockAnswers.textColor, mockAnswers.textSize);
        const expectedSvgContent = `<svg width="${mockAnswers.width}" height="${mockAnswers.height}" xmlns="http://www.w3.org/2000/svg">${triangle.generateSVG()}</svg>`;

        const svgContent = await generateSVG();

        expect(svgContent).toBe(expectedSvgContent);
    });
});