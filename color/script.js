function generarEscala() {
    const colorInput = document.getElementById('colorInput').value;
    const stepsInput = document.getElementById('stepsInput').value;
    const colorScale = document.getElementById('colorScale');
    colorScale.innerHTML = '';

    const steps = parseInt(stepsInput) || 60; // Si steps no es válido, usa 60 como valor por defecto

    // Convertir color hexadecimal a RGB
    const rgb = hexToRgb(colorInput);
    const scale = generateColorScale(rgb, steps);

    // Crear las cajas de colores
    scale.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;

        // Calcular si el color es claro u oscuro
        const textColor = isColorDark(color) ? 'white' : 'black';
        colorBox.style.color = textColor;

        colorBox.textContent = rgbToHex(color.r, color.g, color.b);
        colorScale.appendChild(colorBox);
    });
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

/* función que calcula si un color es claro u oscuro. La fórmula utilizada para calcular la luminosidad está basada en el estándar de accesibilidad WCAG, donde se toma en cuenta la percepción del ojo humano en cuanto a los colores RGB.
Si la luminosidad es menor que 128, el color se considera oscuro, y el texto se mostrará en blanco.
Si la luminosidad es mayor o igual a 128, el color se considera claro, y el texto se mostrará en negro.
*/
function isColorDark({ r, g, b }) {
    // Fórmula de luminosidad relativa según el estándar WCAG
    const luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminosity < 128; // Si es menor a 128, consideramos el color como oscuro
}

function generateColorScale(rgb, steps) {
    const scale = [];

    // Generar colores intermedios desde blanco al color ingresado
    for (let i = 0; i <= steps / 2; i++) {
        const factor = i / (steps / 2);
        scale.push({
            r: Math.round(255 - (255 - rgb.r) * factor),
            g: Math.round(255 - (255 - rgb.g) * factor),
            b: Math.round(255 - (255 - rgb.b) * factor)
        });
    }

    // Generar colores intermedios desde el color ingresado a negro
    for (let i = 1; i <= steps / 2; i++) {
        const factor = i / (steps / 2);
        scale.push({
            r: Math.round(rgb.r * (1 - factor)),
            g: Math.round(rgb.g * (1 - factor)),
            b: Math.round(rgb.b * (1 - factor))
        });
    }

    return scale;
}
