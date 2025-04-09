// script.js
const clocks = [];

function addClock() {
    const select = document.getElementById("timezone-select");
    const timezone = select.value;
    const timezoneText = select.options[select.selectedIndex].text;

    const clockId = `clock-${Date.now()}`;

    const clockDiv = document.createElement("div");
    clockDiv.className = "clock";
    clockDiv.id = clockId;
    clockDiv.innerHTML = `
    <h3>${timezoneText}</h3>
    <p class="time">Loading...</p>
    <button class="remove-btn" onclick="removeClock('${clockId}')">Remove</button>
  `;

    document.getElementById("clock-container").appendChild(clockDiv);
    clocks.push({ id: clockId, timezone });
}

function removeClock(clockId) {
    const index = clocks.findIndex(clock => clock.id === clockId);
    if (index !== -1) {
        clocks.splice(index, 1);
        const clockDiv = document.getElementById(clockId);
        if (clockDiv) {
            clockDiv.remove();
        }
    }
}

function updateClocks() {
    const now = new Date();
    clocks.forEach(clock => {
        const timeString = now.toLocaleTimeString("en-US", {
            timeZone: clock.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        const clockDiv = document.getElementById(clock.id);
        if (clockDiv) {
            clockDiv.querySelector(".time").textContent = timeString;
        }
    });
}

document.getElementById("add-clock-btn").addEventListener("click", addClock);
setInterval(updateClocks, 1000);