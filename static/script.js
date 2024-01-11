let isDragging = false;
let lastSelectedWell = null;

window.onload = function() {
    generatePlateGrid();
    document.getElementById('process-btn').onclick = processImages;

    document.addEventListener('mouseup', function() {
        document.body.classList.remove('no-select');
        isDragging = false;
    });
};

function generatePlateGrid() {
    const plateGrid = document.getElementById('plate-grid');
    for (let row = 'A'.charCodeAt(0); row <= 'P'.charCodeAt(0); row++) {
        for (let col = 1; col <= 24; col++) {
            let wellDiv = document.createElement('div');
            wellDiv.className = 'well';
            wellDiv.innerText = String.fromCharCode(row) + (col < 10 ? '0' + col : col);
            wellDiv.setAttribute('data-index', `${row}-${col}`);
            wellDiv.addEventListener('mousedown', handleMouseDown);
            wellDiv.addEventListener('mouseover', handleMouseOver);
            plateGrid.appendChild(wellDiv);
        }
    }
}

function handleMouseDown(event) {
    if (event.shiftKey) {
        document.body.classList.add('no-select');
        isDragging = true;
        lastSelectedWell = this.getAttribute('data-index');
    } else {
        this.classList.toggle('selected');
        isDragging = false;
    }
}

function handleMouseOver() {
    if (isDragging) {
        this.classList.add('selected');
        selectRange(lastSelectedWell, this.getAttribute('data-index'));
    }
}

function selectRange(startIndex, endIndex) {
    const wells = document.querySelectorAll('.well');
    const [startRow, startCol] = startIndex.split('-').map(Number);
    const [endRow, endCol] = endIndex.split('-').map(Number);
    
    for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
            let index = `${row}-${col}`;
            let well = document.querySelector(`.well[data-index="${index}"]`);
            if (well) {
                well.classList.add('selected');
            }
        }
    }
}

function processImages() {
    const selectedWells = Array.from(document.querySelectorAll('.well.selected'))
                               .map(well => well.innerText);
    const mainDirectory = document.getElementById('main-directory').value;
    const destinationFolder = document.getElementById('destination-folder').value;
    const experimentName = document.getElementById('experiment-name').value;

    // Validate inputs
    if (!mainDirectory || !destinationFolder || !experimentName || selectedWells.length === 0) {
        alert("Please fill in all fields and select at least one well.");
        return;
    }

    // AJAX request to Flask server
    fetch('/process-images', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            mainDirectory: mainDirectory,
            destinationFolder: destinationFolder,
            experimentName: experimentName,
            selectedWells: selectedWells
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message);
        // Here, you can add code to update the UI with a success message
    })
    .catch((error) => {
        console.error('Error:', error);
        // Here, you can add code to update the UI with an error message
    });
}
