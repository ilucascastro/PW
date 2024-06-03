document.addEventListener('DOMContentLoaded', function() {
    jokenpo();
});

function jokenpo(){

    const opcoes = ["Papel", "Pedra", "Tesoura"];

    function getUserChoice() {
        let escolha = parseInt(prompt("Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura"));
        if (isNaN(escolha) || escolha < 1 || escolha > 3) {
            return null; // escolha invalida
        }
        return escolha - 1; // ajusta index do array
    }

    function getComputerChoice() {
        return Math.floor(Math.random() * 3);
    }

    function determineOutcome(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return "Empate!";
        } else if (
            (userChoice === 0 && computerChoice === 1) || // Papel vs Pedra
            (userChoice === 1 && computerChoice === 2) || // Pedra vs Tesoura
            (userChoice === 2 && computerChoice === 0)    // Tesoura vs Papel
        ) {
            return "Você ganhou!";
        } else {
            return "Você perdeu!";
        }
    }

    function playGame() {
        let score = 0;
        const outputDiv = document.getElementById("game-output");
        outputDiv.innerHTML = ""; // reseta output

        while (true) {
            const userChoice = getUserChoice();
            if (userChoice === null) {
                outputDiv.innerHTML += "<p>Opção inválida. Jogo terminado!</p>";
                outputDiv.innerHTML += `<p>Sua pontuação foi de ${score}.</p>`;
                break;
            }

            const computerChoice = getComputerChoice();
            const outcome = determineOutcome(userChoice, computerChoice);

            outputDiv.innerHTML += `<p>Você escolheu: ${opcoes[userChoice]}</p>`;
            outputDiv.innerHTML += `<p>O computador jogou: ${opcoes[computerChoice]}</p>`;
            outputDiv.innerHTML += `<p>${outcome}</p>`;

            if (outcome === "Você perdeu!") {
                outputDiv.innerHTML += `<p>Jogo terminado! Sua pontuação foi de ${score}.</p>`;
                break;
            } else if (outcome === "Você ganhou!") {
                score++;
            }
        }
    }

    // Start the game
    playGame();

}
