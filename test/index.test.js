const fs = require('fs');
const { Circle, Rectangle, Triangle } = require('../index.js');
const inquirer = require('inquirer');

// Mock inquirer.prompt function
function mockPrompt(answers) {
    return new Promise((resolve) => {
        resolve(answers);
    });
}

describe('SVG Generator', () => {
    let mockAnswers;

    beforeEach(() => {
        mockAnswers = {
            width: 100,
            height: 100,
            fillColor: 'red',
            shape: '', // Will be set dynamically in each test case
            text: 'test',
            textColor: 'white',
            textSize: 12,
            save: true
        };
    });

    it('should generate SVG content for a Circle shape', async () => {
        mockAnswers.shape = 'Circle';

        const expectedSvgContent = `<svg width="${mockAnswers.width}" height="${mockAnswers.height}" xmlns="http://www.w3.org/2000/svg"><circle cx="${mockAnswers.width / 2}" cy="${mockAnswers.height / 2}" r="${mockAnswers.width / 2}" fill="${mockAnswers.fillColor}" />
        <text x="${mockAnswers.width / 2}" y="${mockAnswers.height / 2}" text-anchor="middle" alignment-baseline="middle" font-size="${mockAnswers.textSize}px" fill="${mockAnswers.textColor}">${mockAnswers.text}</text></svg>`;

        // Simulate inquirer prompt and generate SVG content
        const svgContent = await inquirer.prompt([
            {
                type: 'input',
                name: 'width',
                default: mockAnswers.width
            },
            {
                type: 'input',
                name: 'height',
                default: mockAnswers.height
            },
            {
                type: 'input',
                name: 'fillColor',
                default: mockAnswers.fillColor
            },
            {
                type: 'list',
                name: 'shape',
                choices: ['Circle', 'Rectangle', 'Triangle'],
                default: mockAnswers.shape
            },
            {
                type: 'input',
                name: 'text',
                default: mockAnswers.text
            },
            {
                type: 'input',
                name: 'textColor',
                default: mockAnswers.textColor
            },
            {
                type: 'input',
                name: 'textSize',
                default: mockAnswers.textSize
            },
            {
                type: 'confirm',
                name: 'save',
                default: mockAnswers.save
            }
        ]).then((answers) => {
            let shape;
            if (answers.shape === 'Circle') {
                shape = new Circle(answers.width, answers.height, answers.fillColor, answers.text, answers.textColor, answers.textSize);
            } else if (answers.shape === 'Rectangle') {
                shape = new Rectangle(answers.width, answers.height, answers.fillColor, answers.text, answers.textColor, answers.textSize);
            } else if (answers.shape === 'Triangle') {
                shape = new Triangle(answers.width, answers.height, answers.fillColor, answers.text, answers.textColor, answers.textSize);
            }

            return `<svg width="${answers.width}" height="${answers.height}" xmlns="http://www.w3.org/2000/svg">${shape.render()}</svg>`;
        });
        expect(svgContent).toBe(expectedSvgContent);
    });

    // Set the test timeout to 10 seconds
    jest.setTimeout(50000);
});