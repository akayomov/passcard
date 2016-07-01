var Rand, chars, generateNewCard, numbers, symbols;

Rand = (function() {
  function Rand(seed1) {
    this.seed = seed1;
    this.multiplier = 1664525;
    this.modulo = 4294967296;
    this.offset = 1013904223;
    if (!((this.seed != null) && (0 <= seed && seed < this.modulo))) {
      this.seed = (new Date().valueOf() * new Date().getMilliseconds()) % this.modulo;
    }
  }

  Rand.prototype.seed = function(seed) {
    return this.seed = seed;
  };

  Rand.prototype.randn = function() {
    return this.seed = (this.multiplier * this.seed + this.offset) % this.modulo;
  };

  Rand.prototype.randf = function() {
    return this.randn() / this.modulo;
  };

  Rand.prototype.rand = function(n) {
    return Math.floor(this.randf() * n);
  };

  Rand.prototype.rand2 = function(min, max) {
    return min + this.rand(max - min);
  };

  return Rand;

})();

chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";

symbols = "!@#$%^&*";

numbers = "1234567890";

generateNewCard = function() {
  var generateChar, generateLine, lines, randomizer, seedField, seedSTR;
  console.log('generateNewCard');
  randomizer = new Rand;
  seedField = document.getElementById("seed");
  if (Number.isInteger(Number(seedField.value))) {
    console.log("number");
    if (String(seedField.value).length > 8) {
      console.log("more 8");
      seedField.value = Number(String(seedField.value).substr(0, 8));
    } else {
      console.log("less 8");
      seedSTR = "00000000" + seedField.value;
      seedField.value = Number(seedSTR.slice(-8));
    }
    randomizer.seed = Number(seedField.value);
  } else {
    console.log("non number");
    seedField.value = Number(String(randomizer.seed).substr(0, 8));
    randomizer.seed = Number(seedField.value);
  }
  console.log("seed:", randomizer.seed);
  document.getElementById("key").innerHTML = randomizer.seed;
  document.getElementById("code").innerHTML = randomizer.seed;
  document.getElementById("site").innerHTML = window.location.origin;
  document.getElementById("place").innerHTML = window.location.origin;
  generateChar = function(type) {
    switch (type) {
      case 1:
        return chars.charAt(randomizer.rand(51));
      case 2:
        return symbols.charAt(randomizer.rand(7));
      case 3:
        return numbers.charAt(randomizer.rand(9));
    }
  };
  generateLine = function(type, count) {
    var def, i, j, ref, resultLine;
    resultLine = "";
    for (i = j = 1, ref = count; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      switch (type) {
        case 1:
          def = randomizer.rand(30);
          if (def < 18) {
            resultLine += generateChar(1);
          } else if (def < 24) {
            resultLine += generateChar(2);
          } else {
            resultLine += generateChar(3);
          }
          break;
        case 2:
          def = randomizer.rand(20);
          if (def < 14) {
            resultLine += generateChar(1);
          } else {
            resultLine += generateChar(3);
          }
          break;
        case 3:
          resultLine += generateChar(3);
      }
      if (i < count) {
        resultLine += " ";
      }
    }
    return resultLine;
  };
  lines = document.getElementsByClassName('line');
  lines[0].innerHTML = generateLine(1, 16);
  lines[1].innerHTML = generateLine(1, 16);
  lines[2].innerHTML = generateLine(1, 16);
  lines[3].innerHTML = generateLine(1, 4);
  lines[4].innerHTML = generateLine(1, 4);
  lines[5].innerHTML = generateLine(1, 4);
  lines[6].innerHTML = generateLine(1, 4);
  lines[7].innerHTML = generateLine(1, 16);
  lines[8].innerHTML = generateLine(1, 16);
  lines[9].innerHTML = generateLine(1, 16);
  lines[10].innerHTML = generateLine(2, 12) + " " + generateLine(3, 4);
  lines[11].innerHTML = generateLine(2, 12) + " " + generateLine(3, 4);
  lines[12].innerHTML = generateLine(2, 12) + " " + generateLine(3, 4);
  lines[13].innerHTML = generateLine(2, 4);
  lines[14].innerHTML = generateLine(2, 4);
  lines[15].innerHTML = generateLine(3, 4);
  lines[16].innerHTML = generateLine(3, 4);
  lines[17].innerHTML = generateLine(2, 4) + " " + generateLine(3, 12);
  lines[18].innerHTML = generateLine(2, 4) + " " + generateLine(3, 12);
  return lines[19].innerHTML = generateLine(2, 4) + " " + generateLine(3, 12);
};

window.addEventListener('load', function() {
  generateNewCard();
  return document.getElementById("generate").addEventListener('click', generateNewCard);
});
