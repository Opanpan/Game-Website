class Player {
  constructor(hand) {
    this.hand = hand;
  }

  getHand(choice) {
    this.hand = choice.id;
    choice.style.backgroundColor = "#c4c4c4";
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

  getHandComp() {
    const comChoices = ["rock", "paper", "scissors"];
    let i = Math.floor(Math.random() * Math.floor(comChoices.length));
    this.hand = comChoices[i];
    const boxComChoices = document.querySelectorAll(".com");
    boxComChoices.forEach((choice) => {
      if (this.hand == choice.id) {
        choice.style.backgroundColor = "#c4c4c4";
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
}

const playerChoices = document.querySelectorAll(".player");

// Mengambil Tiap Elemen dan merubahnya menjadi objek
playerChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const player = new Player1();
    player.getHand(choice);
    console.log(player);
    const newCom = new Com();
    newCom.getHandComp();
    console.log(newCom);
    const newMatch = new Match(player, newCom);
    newMatch.getResult();
    console.log(newMatch.getResult());
  });
});
