class Player {
  constructor(hand) {
    this.hand = hand;
  }

  getHand(choice) {
    this.hand = choice.id;
    choice.classList.add("bgGrey");
  }

  resetHand(choice) {
    choice.classList.remove("bgGrey");
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
        choice.classList.add("bgGrey");
      }
    });
  }

  resetHand(choices) {
    choices.forEach((choice) => {
      if (choice.id == this.hand) {
        choice.classList.remove("bgGrey");
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
        return "PLAYER 1 WIN";
      }
    }
    if (handPlayer == "paper") {
      if (handCom == "rock") {
        return `PLAYER 1 WIN`;
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
        return `PLAYER 1 WIN`;
      }
    }
  }

  showResult(boxResult, textResult) {
    if (textResult.classList.contains("redText")) {
      textResult.classList.remove("redText");
    }

    textResult.classList.add("textResult");
    if (this.getResult() == `PLAYER 1 WIN`) {
      textResult.textContent = this.getResult();
    }
    if (this.getResult() == `DRAW`) {
      textResult.textContent = this.getResult();
      boxResult.style.backgroundColor = "#035B0C";
    }
    if (this.getResult() == `COM WIN`) {
      textResult.textContent = this.getResult();
    }
    if (this.getResult() == `PLAYER 1 WIN` || this.getResult() == `COM WIN`) {
      boxResult.style.backgroundColor = `#4c9654`;
    }
  }

  resetResult(boxResult, textResult) {
    boxResult.classList.remove("boxResult");
    boxResult.style.backgroundColor = "transparent";
    textResult.classList.remove("textResult");
    textResult.classList.add("redText");
    textResult.textContent = "VS";
  }
}
// Mengambil Tiap Elemen
const playerChoices = document.querySelectorAll(".player");

//Lalu Merubahnya Menjadi Objek Setiap element yang di click
playerChoices.forEach((choice) => {
  // Tambahkan logic untuk pilihan

  choice.addEventListener("click", () => {
    // Membersihan Pilihan Player Sebelumnya
    const newElPlayer = document.querySelectorAll(".player");
    newElPlayer.forEach((el) => {
      if (el.classList.contains("bgGrey")) {
        el.classList.remove("bgGrey");
      }
    });

    // Membersihkan Pilihan Com Sebelumnya
    const newElCom = document.querySelectorAll(".com");
    newElCom.forEach((el) => {
      if (el.classList.contains("bgGrey")) {
        el.classList.remove("bgGrey");
      }
    });

    const player = new Player1();
    player.getHand(choice);
    console.log(player);

    const boxComChoices = document.querySelectorAll(".com");
    const newCom = new Com();
    newCom.getHand(boxComChoices);
    console.log(newCom);

    const newMatch = new Match(player, newCom);
    const boxResult = document.querySelector("#boxResult");
    boxResult.classList.add("boxResult");
    const textResult = document.querySelector("#textResult");
    newMatch.getResult();
    newMatch.showResult(boxResult, textResult);
    console.log(newMatch.getResult());

    const elRefresh = document.querySelector("#refresh");
    elRefresh.addEventListener("click", () => {
      player.resetHand(choice);
      newCom.resetHand(boxComChoices);
      newMatch.resetResult(boxResult, textResult);
    });
  });
});
