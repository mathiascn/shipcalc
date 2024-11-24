document.getElementById('calculate').addEventListener('click', () => {
    //constants
    const maxCapacity = 50000;
    const exponent = 3;
    const epsilon = 0.1;
    const mileToKm = 1.852;

    // Retrieve input values
    const speed = parseFloat(document.getElementById('speed').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const time = parseFloat(document.getElementById('time').value);
    const wind = parseFloat(document.getElementById('wind').value);
    const crew = parseFloat(document.getElementById('crew').value);

    // Validate inputs
    if (isNaN(speed) || isNaN(weight) || isNaN(time) || isNaN(wind) || isNaN(crew)) {
        document.getElementById('result').textContent = 'Please enter valid numbers for all fields.';
        return;
    }

    if (wind < 1 || wind > 10) {
        document.getElementById('result').textContent = 'Wind strength must be between 1 and 10.';
        return;
    }

    if (crew <= 0 || crew > 100) {
        document.getElementById('result').textContent = 'Crew efficiency must be between 1 and 100.';
        return;
    }


    const baseDistance = speed * time; // Base distance calculation
    const windFactor = wind / 10; // Wind strength (1-10 normalized to 0.1-1)
    const crewFactor = crew / 100; // Crew efficiency (1-100 normalized to 0.01-1)
    const weightPenalty = 1 - Math.pow(weight / maxCapacity, exponent) + epsilon;

    const distance = baseDistance * windFactor * crewFactor * weightPenalty;
    console.log(`Distance ${distance}`);

    // Display result
    if (distance > 0) {
        document.getElementById('result').innerHTML = `The ship can travel:<br>Nautical miles: ${distance.toFixed(2)}<br>Kilometers: ${(distance * mileToKm).toFixed(2)}`;
    } else {
        document.getElementById('result').textContent = 'The ship cannot travel under these conditions.';
    }
});