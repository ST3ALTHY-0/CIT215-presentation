let cards = [
    { name: "Archer", type: "Troop", elixir: 3, description: "Ranged unit that shoots arrows at enemies.", img: "resources/images/archer.jpg" },
    { name: "Archer Queen", type: "Troop", elixir: 5, description: "Powerful single-target archer with high damage.", img: "resources/images/archerQueen.jpg" },
    { name: "Arrows", type: "Spell", elixir: 3, description: "Covers a wide area with light damage to small troops.", img: "resources/images/arrows.jpg" },
    { name: "Barbarian Barrel", type: "Troop", elixir: 2, description: "Barbarian rolled in a barrel that deals light damage and spawns a barbarian after a short range.", img: "resources/images/barbarianBarrel.jpg" },
    { name: "Bomb Tower", type: "Building", elixir: 4, description: "Defensive tower that deals splash damage.", img: "resources/images/bombTower.jpg" },
    { name: "Cannon", type: "Building", elixir: 3, description: "Ground-targeting defensive building that shoots at enemies.", img: "resources/images/cannon.jpg" },
    { name: "Fireball", type: "Spell", elixir: 4, description: "Area damage spell good against medium-health units.", img: "resources/images/fireball.jpg" },
    { name: "Firecracker", type: "Troop", elixir: 3, description: "Ranged troop that deals splash damage in a cone shape on impact.", img: "resources/images/fireCracker.jpg" },
    { name: "Giant", type: "Troop", elixir: 5, description: "High-health, slow moving unit that targets buildings.", img: "resources/images/giant.jpg" },
    { name: "Goblin", type: "Troop", elixir: 2, description: "Fast melee unit with low health but good in numbers.", img: "resources/images/goblin.jpg" },
    { name: "Golem", type: "Troop", elixir: 8, description: "Very high-health tank that splits into Golemites on death.", img: "resources/images/golem.jpg" },
    { name: "Graveyard", type: "Spell", elixir: 5, description: "Summons skeletons randomly in a large area.", img: "resources/images/graveyard.jpg" },
    { name: "Hog Rider", type: "Troop", elixir: 4, description: "Fast unit that targets buildings and deals solid damage.", img: "resources/images/hogRider.jpg" },
    { name: "Inferno Tower", type: "Building", elixir: 5, description: "Deals increasing damage over time to single targets.", img: "resources/images/infernoTower.jpg" },
    { name: "Lava Hound", type: "Troop", elixir: 7, description: "Flying tank that explodes into lava pups on death.", img: "resources/images/lavaHound.jpg" },
    { name: "Lightning", type: "Spell", elixir: 6, description: "Strikes the highest HP targets in range.", img: "resources/images/lightning.jpg" },
    { name: "Mortar", type: "Building", elixir: 4, description: "Long-range siege building that fires area damage.", img: "resources/images/mortar.jpg" },
    { name: "Rocket", type: "Spell", elixir: 6, description: "High-damage single-target spell for units or buildings.", img: "resources/images/rocket.jpg" },
    { name: "Skeleton Army", type: "Troop", elixir: 3, description: "Swarm of skeletons useful for distraction and numbers.", img: "resources/images/skeletonArmy.jpg" },
    { name: "X-Bow", type: "Building", elixir: 6, description: "Long-range offensive building focused on enemy towers.", img: "resources/images/xbow.jpg" },
    { name: "Zap", type: "Spell", elixir: 2, description: "Small stun and damage spell that resets charge attacks.", img: "resources/images/zap.jpg" }
];

const setUp = () => {
    $('.typeBox').on('click', function (event) {
        let panel_class = event.target.id;
        console.log("Panel class id:" + event.target.id);
        console.log("event:" + event);
        console.log("event target:" + event.target);
        displayCards(panel_class);
    });
};

const displayCards = (type) => {
    const container = $(".cards");
    container.html("");


    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        if (card.type == type) {
            const cardLine = $(
                `<div class="cardLine">
                            <img src="${card.img}" title="${card.name}">
                            <div class="cardName">${card.name} (${card.type})</div>
                            <div class="showInfo"></div>
                        </div>`
            );

            cardLine.on("click", displayInfoHandler);

            container.append(cardLine);
        }
    }
}

// Initialize when document is ready
$(document).ready(setUp);

// Show or hide card details. Separated from displayCards so it can be reused.
function displayInfo(index, $infoDiv) {
    if ($infoDiv && $infoDiv.length) {
        if ($infoDiv.html().trim() === "") {
            const card = cards[index];
            $infoDiv.html(`Elixir: ${card.elixir} | ${card.description}`);
        } else {
            $infoDiv.html("");
        }
    }
}

function displayInfoHandler(e) {
    const el = e.currentTarget || e.target;
    const $line = $(el);
    const infoDiv = $line.find('.showInfo');

    // Prefer the image title if present; fall back to the visible name
    // (before the type in parentheses) as a last resort.
    let name = $line.find('img').attr('title');
    const idx = cards.findIndex(c => c.name == name);
    if (idx !== -1) displayInfo(idx, infoDiv);
}