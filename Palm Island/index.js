
class Card {
    front;
    back;
    flipped=false;
    rotate90=false;
    rotate180=false;
    
    constructor(front, back){
        this.front = front
        this.back = back
    }
}

const startCards = [ 
    new Card(front = "/images/canoe-house-front.png", back = "/images/canoe-house-back.png"),
    new Card(front = "/images/canoe-house-front.png", back = "/images/canoe-house-back.png"),
    new Card(front = "/images/canoe-house-front.png", back = "/images/canoe-house-back.png"),
    new Card(front = "/images/logger-front.png", back = "/images/logger-back.png"),
    new Card(front = "/images/logger-front.png", back = "/images/logger-back.png"),
    new Card(front = "/images/logger-front.png", back = "/images/logger-back.png"),
    new Card(front = "/images/quarry-front.png", back = "/images/quarry-back.png"),
    new Card(front = "/images/quarry-front.png", back = "/images/quarry-back.png"),
    new Card(front = "/images/quarry-front.png", back = "/images/quarry-back.png"),
    new Card(front = "/images/temple-front.png", back = "/images/temple-back.png"),
    new Card(front = "/images/temple-front.png", back = "/images/temple-back.png"),
    new Card(front = "/images/housing-front.png", back = "/images/housing-back.png"),
    new Card(front = "/images/housing-front.png", back = "/images/housing-back.png"),
    new Card(front = "/images/tool-maker-front.png", back = "/images/tool-maker-back.png"),
    new Card(front = "/images/market-front.png", back = "/images/market-back.png"),
    new Card(front = "/images/trade-house-front.png", back = "/images/trade-house-back.png"),
]

const cards = startCards.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
cards.push(new Card(front = "/images/round-card-front.png", back = "/images/round-card-back.png"))

const selectedResources = []

function updateCards() {
    let resources = 0;
    for(let i = 0; i < cards.length; i ++) {
        const card = cards[i];
        document.getElementById("card-front-" + i).src = card.front;
        document.getElementById("card-back-" + i).src = card.back;
        const cardElem = document.getElementById('card-' + i);
        const classList = cardElem.classList;
        if (card.flipped) classList.add("flipped"); else classList.remove("flipped");
        if (card.rotate180) classList.add("rotate180"); else classList.remove("rotate180");
        if (card.rotate90) {
            classList.add("rotate90");
            cardElem.setAttribute('style', 'margin-left: ' + (resources * 75 + 40 + i*3) + 'px; margin-top: ' + (resources * -3 - 30) + 'px');
            resources++;
        }  else {
            classList.remove("rotate90");
            cardElem.setAttribute('style', 'margin-left: ' + i * 3 + 'px; margin-top: ' + (i * -    3) + 'px');
        }
    }
}

function flip(id) {
    cards[id].flipped = !cards[id].flipped
    nextCard(id)
}

function rotate90(id) {
    cards[id].rotate90 = !cards[id].rotate90
    selectedResources.push(cards[id])
    nextCard(id)
}

function rotate180(id) {
    cards[id].rotate180 = !cards[id].rotate180
    nextCard(id)
}

function pay(id) {
    const card = selectedResources.splice(id, 1)[0]
    card.rotate90 = false
    updateCards()
}

function nextCard(id) {
    cards.push(cards.splice(id, 1)[0])
    updateCards()
}

updateCards()