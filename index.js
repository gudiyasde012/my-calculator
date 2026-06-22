 const screen = document.getElementById('screen');
        let isResetNecessary = false;

        function appendValue(value) {
            // Clear default zero state or clean up past evaluation results
            if (screen.value === '0' || screen.value === 'Error' || isResetNecessary) {
                if (['+', '-', '*', '/', '%'].includes(value) && screen.value !== 'Error') {
                    isResetNecessary = false; // Carry forward answer for continuous chain math
                } else {
                    screen.value = '';
                    isResetNecessary = false;
                }
            }
            screen.value += value;
        }

        function clearScreen() {
            screen.value = '0';
        }

        function deleteLast() {
            if (screen.value === 'Error' || screen.value.length <= 1) {
                screen.value = '0';
            } else {
                screen.value = screen.value.slice(0, -1);
            }
        }

        function calculateResult() {
            try {
                // Safeguard math formula evaluation via standard Function constructor alternative to unsafe eval
                if (screen.value.trim() === '') return;
                
                let expression = screen.value;
                let result = new Function(`return ${expression}`)();
                
                // Format decimal tracking limits
                if (result % 1 !== 0) {
                    result = parseFloat(result.toFixed(8));
                }
                
                screen.value = result;
                isResetNecessary = true;
            } catch (error) {
                screen.value = 'Error';
                isResetNecessary = true;
            }
        }