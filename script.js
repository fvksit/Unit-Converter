// Fungsi untuk mereset form
function resetForm(sectionId) {
    document.querySelector(`#${sectionId} input[type='number']`).value = '';
    document.querySelector(`#${sectionId} select`).selectedIndex = 0;
    document.querySelector(`#${sectionId} p`).innerText = 'Result:';
}

// Fungsi untuk validasi input
function validateInput(value) {
    if (isNaN(value) || value === '') {
        alert("Please enter a valid number");
        return false;
    }
    return true;
}

// Objek konversi panjang
const lengthConversion = {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    inch: 39.3701,
    foot: 3.28084,
    yard: 1.09361,
    mile: 0.000621371
};

// Konversi panjang
document.getElementById('convert-length').addEventListener('click', function () {
    const value = parseFloat(document.getElementById('length-value').value);
    if (!validateInput(value)) return;

    const fromUnit = document.getElementById('length-to').value;
    const toUnit = document.getElementById('length-from').value;
    const result = ((value * lengthConversion[fromUnit]) / lengthConversion[toUnit]).toFixed(6);
    document.getElementById('length-result').innerText = `Result: ${value} ${fromUnit} = ${result} ${toUnit}`;
});

document.getElementById('reset-length').addEventListener('click', function () {
    resetForm('length-section');
});

// Objek konversi berat
const weightConversion = {
    gram: 1,
    kilogram: 0.001,
    milligram: 1000,
    ounce: 0.035274,
    pound: 0.00220462
};

// Konversi berat
document.getElementById('convert-weight').addEventListener('click', function () {
    const value = parseFloat(document.getElementById('weight-value').value);
    if (!validateInput(value)) return;

    const fromUnit = document.getElementById('weight-to').value;
    const toUnit = document.getElementById('weight-from').value;
    const result = ((value * weightConversion[fromUnit]) / weightConversion[toUnit]).toFixed(6);
    document.getElementById('weight-result').innerText = `Result: ${value} ${fromUnit} = ${result} ${toUnit}`;
});

document.getElementById('reset-weight').addEventListener('click', function () {
    resetForm('weight-section');
});

// Objek konversi suhu
const temperatureConversion = {
    celsiusToFahrenheit: (value) => (value * 9 / 5) + 32,
    fahrenheitToCelsius: (value) => (value - 32) * 5 / 9,
    celsiusToKelvin: (value) => value + 273.15,
    kelvinToCelsius: (value) => value - 273.15,
    fahrenheitToKelvin: (value) => (value - 32) * 5 / 9 + 273.15,
    kelvinToFahrenheit: (value) => (value - 273.15) * 9 / 5 + 32
};

// Konversi suhu
document.getElementById('convert-temperature').addEventListener('click', function () {
    const value = parseFloat(document.getElementById('temperature-value').value);
    if (!validateInput(value)) return;

    const fromUnit = document.getElementById('temperature-from').value;
    const toUnit = document.getElementById('temperature-to').value;
    let result;

    if (fromUnit === toUnit) {
        result = value;
    } else if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        result = temperatureConversion.celsiusToFahrenheit(value);
    } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        result = temperatureConversion.fahrenheitToCelsius(value);
    } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        result = temperatureConversion.celsiusToKelvin(value);
    } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        result = temperatureConversion.kelvinToCelsius(value);
    } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        result = temperatureConversion.fahrenheitToKelvin(value);
    } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        result = temperatureConversion.kelvinToFahrenheit(value);
    }

    document.getElementById('temperature-result').innerText = `Result: ${value} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`;
});

document.getElementById('reset-temperature').addEventListener('click', function () {
    resetForm('temperature-section');
});

// Fungsi untuk pergantian tab
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function () {
        // Hapus kelas 'active' dari semua tombol tab
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));

        // Hapus kelas 'active' dari semua section
        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));

        // Tambahkan kelas 'active' ke tombol yang diklik
        button.classList.add('active');

        // Tambahkan kelas 'active' ke section yang sesuai dengan tab yang diklik
        const sectionId = button.id.replace('-tab', '-section');  // Mengganti "-tab" dengan "-section"
        const section = document.getElementById(sectionId);

        if (section) {  // Pastikan section ditemukan sebelum menambahkan kelas
            section.classList.add('active');
        } else {
            console.error(`Section with ID '${sectionId}' not found.`);
        }
    });
});
