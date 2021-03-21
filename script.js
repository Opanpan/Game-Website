class Player {
  constructor(hand) {
    this.hand = hand;
  }

  getHand(choice) {
    this.hand = choice.id;
    choice.style.backgroundColor = "#c4c4c4";
  }

  resetHand(choice) {
    choice.style.backgroundColor = "transparent";
  }
}

class Player1 extends Player {
  constructor() {
    super();
  }
}

class Com extends Player {
  constructor() {
    super();
  }

  getHand(choices) {
    const comChoices = ["rock", "paper", "scissors"];
    let i = Math.floor(Math.random() * Math.floor(comChoices.length));
    this.hand = comChoices[i];
    choices.forEach((choice) => {
      if (this.hand == choice.id) {
        choice.style.backgroundColor = "#c4c4c4";
      }
    });
  }

  resetHand(choices) {
    choices.forEach((choice) => {
      if (choice.id == this.hand) {
        choice.style.backgroundColor = "transparent";
      }
    });
  }
}

class Match {
  constructor(player1, com) {
    this.player1 = player1;
    this.com = com;
  }

  getResult(handPlayer, handCom) {
    handPlayer = this.player1.hand;
    handCom = this.com.hand;

    if (handPlayer == handCom) {
      return `DRAW`;
    }
    if (handPlayer == "rock") {
      if (handCom == "paper") {
        return "COM WIN";
      }
      if (handCom == "scissors") {
        return "PLAYER WIN";
      }
    }
    if (handPlayer == "paper") {
      if (handCom == "rock") {
        return `PLAYER WIN`;
      }
      if (handCom == "scissors") {
        return `COM WIN`;
      }
    }
    if (handPlayer == "scissors") {
      if (handCom == "rock") {
        return `COM WIN`;
      }
      if (handCom == "paper") {
        return `PLAYER WIN`;
      }
    }
  }

  showResult() {
    const boxResult = document.querySelector("#boxResult");
    boxResult.classList.toggle("boxResult");
    const textResult = document.querySelector("#textResult");
    textResult.classList.toggle("textResult");
    if (this.getResult() == `PLAYER WIN`) {
      textResult.textContent = `PLAYER 1 WIN`;
    }
    if (this.getResult() == `DRAW`) {
      textResult.textContent = `DRAW`;
      boxResult.style.backgroundColor = "#035B0C";
    }
    if (this.getResult() == `COM WIN`) {
      textResult.textContent = `COM WIN`;
    }
  }
}

const playerChoices = document.querySelectorAll(".player");

// Mengambil Tiap Elemen dan merubahnya menjadi objek

playerChoices.forEach((choice) => {
  // Tambahkan logic untuk pilihan
  choice.addEventListener("click", () => {
    const player = new Player1();
    player.getHand(choice);
    console.log(player);

    const boxComChoices = document.querySelectorAll(".com");
    const newCom = new Com();
    newCom.getHand(boxComChoices);
    console.log(newCom);

    const newMatch = new Match(player, newCom);
    newMatch.getResult();
    newMatch.showResult();
    console.log(newMatch.getResult());

    // const elRefresh = document.querySelector(".refresh");
    // elRefresh.addEventListener("click", () => {
    //   player.resetHand(choice);
    //   newCom.resetHand(boxComChoices);
    // });
  });
});
