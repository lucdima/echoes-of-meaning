// Configurable values
const wordSpacing = 10; // Pixels
const lineHeight = 128; // Pixels
const wordVisibleDuration = 3000; // Milliseconds (1000 millisecond = 1 second)
const specialWordAdditionalVisibleDuration = 0; // Milliseconds
const baseFontSize = 64; // Pixels
const fontSizeRandomVariationLimit = 0.4; // Between 0 and 1
const textPositionRandomVariationLimit = 20;
const specialFontSizeMultiplier = 2;
const defaultWordDelay = 200; // Milliseconds
const commaWordDelay = 500; // Milliseconds
const dotWordDelay = 900; // Milliseconds
const fontColor = '#ffffff';
const backgroundColorHexa = '#40f0f0'; // Hexacolor code
const marginX = 50; // Pixels
const marginY = 50; // Pixels
const enableMemoryMode = true; // true or false
const enableBorder = true; // true or false
const borderColor = '#49F550'; // Hexacolor code
const borderThinkness = 10; // Pixels


// Global variables
let words = [];
let emotionData = {};
let wordToEmotion = {};
let rawTextLines = [];
let nextWordIndex = 0;
let lastWordTime = 0;
let x = marginX;
let y = marginY;
let wordDelay = 200;
let monoFont;

function preload() {
  console.log("Started preload...");
  rawTextLines = loadStrings('text.txt');
  emotionData = loadJSON('emotions.json');
  monoFont = loadFont('DejaVuSansMono-Bold.ttf');
  console.log("End preload!");
  console.log(about);
}


function setup() {
  // createCanvas(canvasX, canvasY);
  createCanvas(windowWidth, windowHeight);
  textFont(monoFont);
  textAlign(LEFT, TOP);
  textSize(baseFontSize);
  textStyle(BOLD);

  // Join lines of text into one big string
  let textString = rawTextLines.join(' ');
  let rawWords = textString.split(/\s+/);

  // Build lookup table
  for (let categoryKey in emotionData.categories) {
    let category = emotionData.categories[categoryKey];
    let colorHex = category.color;
    for (let emotionWord of category.words) {
      wordToEmotion[emotionWord.toLowerCase()] = {
        color: color(colorHex),
        category: categoryKey
      };
    }
  }

  for (let w of rawWords) {
    words.push(wordFactory(w));
  }

  lastWordTime = millis();
  let backgroundColor = color(backgroundColorHexa);
  background(backgroundColor);
}

function draw() {

  if (!enableMemoryMode) {
    let backgroundColor = color(backgroundColorHexa);
    background(backgroundColor);
  }

// if (dreamyEffect) {
//   let dreamyBg = color(backgroundColorHexa);
//   dreamyBg.setAlpha(50);
//   fill(dreamyBg);
//   noStroke();
//   rect(0, 0, width, height);
// } else {
//   background(backgroundColor);
// }
  let currentExecutionTime = millis();

  if (currentExecutionTime - lastWordTime > wordDelay) {
    if (nextWordIndex >= words.length) {
      nextWordIndex = 0;
      x = marginX;
      y = marginY;
    }

    let word = words[nextWordIndex];

    if (x + word.getWordWidth() > width - 50) {
      x = marginX;
      y += lineHeight;
    }

    if (y > height - 50) {
      x = marginX;
      y = marginY;
    }

    word.x = x;
    word.y = y;
    word.birthTime = currentExecutionTime;
    word.visible = true;

    x += word.getWordWidth() + wordSpacing;
    nextWordIndex++;

    wordDelay = word.getWordDelay();

    lastWordTime = currentExecutionTime;
  }

  // Draw words
  for (let word of words) {
    if (!word.visible) {
      continue;
    }

    let age = currentExecutionTime - word.birthTime;

    if (age > word.visibleDuration) {
      word.visible = false;
      continue;
    }


    let alpha = map(age, 0, word.visibleDuration, 255, 0);
    let scaleFactor = map(age, 0, word.visibleDuration, 1.0, 0.5);

    word.draw(alpha, scaleFactor);
  }
}

function wordFactory(wordText) {
  let cleanText = wordText.toLowerCase().replace(/[.,!?;:]$/, '');
  let emotionData = wordToEmotion[cleanText];

  let isSpecial = !!emotionData;

  let randomScale = random(1 - fontSizeRandomVariationLimit, 1 + fontSizeRandomVariationLimit);
  let fontSize = baseFontSize * randomScale * (isSpecial ? specialFontSizeMultiplier : 1);

  return {
    text: wordText,
    x: 0,
    y: 0,
    birthTime: -1,
    visible: false,
    fontSize: fontSize,
    isSpecial: isSpecial,
    color: isSpecial ? color(emotionData.color) : color(fontColor),
    category: isSpecial ? emotionData.category : null,
    visibleDuration: this.isSpecial ? wordVisibleDuration + specialWordAdditionalVisibleDuration : wordVisibleDuration,

    getWordDelay: function() {
      if (this.text.endsWith(',')) {
        return commaWordDelay;
      }

      if (this.text.endsWith('.')){
        return dotWordDelay;
      }

      return defaultWordDelay;
    },

    getWordWidth: function() {
      textSize(this.fontSize);
      return textWidth(this.text);
    },

    draw: function(alpha, scaleFactor) {
      push();
      let randomPositionXModifier = random(-fontSizeRandomVariationLimit,  fontSizeRandomVariationLimit);
      let randomPositionYModifier = random(-fontSizeRandomVariationLimit,  fontSizeRandomVariationLimit);
      translate(this.x + randomPositionXModifier, this.y + randomPositionYModifier);
      scale(scaleFactor);
      textSize(this.fontSize);
      textStyle(BOLD);

      let fillColor = this.color;
      fillColor.setAlpha(alpha);
      fill(fillColor);

      if (enableBorder) {
        strokeWeight(borderThinkness);
        let c = color(borderColor);
        c.setAlpha(alpha);
        stroke(c);
      }

      text(this.text, 0, 0);
      pop();
    }
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

const about = 'Echoes of Meaning is a generative text visualization that breathes life into words through motion, color, and emotion. Words drift gently across the screen, subtly shifting in size and position, while emotionally charged language is illuminated with dynamic hues drawn from a curated emotional lexicon.\n' +
    '\n' +
    'Designed to be contemplative and immersive, this sketch transforms text into a living rhythm — where feelings linger, fade, and reappear like echoes. Whether used as a poetic display, an ambient installation, or a meditative experience, Echoes of Meaning invites viewers to feel language beyond its literal form.\n' +
    '\n' +
    'Created in May 2025 by Lucas Dima for a project led by artist Karina Villavicencio.';
