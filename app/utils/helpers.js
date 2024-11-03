
export function getRandomPastelColors(count = 3) {

    function getRandomPastelColor() {
      const r = Math.floor(Math.random() * 105) + 140;
      const g = Math.floor(Math.random() * 105) + 80;
      const b = Math.floor(Math.random() * 105) + 120;
      return `rgb(${r}, ${g}, ${b})`;
    }
  
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(getRandomPastelColor());
    }
    return colors;
  }
  