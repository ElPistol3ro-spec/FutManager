const API_URL = "http://localhost:3000/players"

let squadPlayers = []

document.addEventListener('DOMContentLoaded', () => {
    console.log("FutManager Application Logic Initialized successfully")
    setupViewNavigation()
    fetchSquadRoster()
    fetchMatchesList()
})

async function fetchSquadRoster() {
    try {
        const response = await fetch(API_URL)

        if(!response.ok) {
            throw new Error(`Server responded with a status of ${response.status}`)
        }

        squadPlayers = await response.json()
        console.log("Operational layout data successfully fetched from database:", squadPlayers)

        renderPlayerCards()
    } catch (error) {
        console.error("Critical Error mapping data flow from backend server:", error.message)

        const rosterContainer = document.getElementById('player-list-container')
        if (rosterContainer) {
            rosterContainer.innerHTML = `
               <div style="background: #fee2e2; color: #991b1b; padding: 1rem; border-radius: 0.375rem;">
                <strong>Connection Error:</strong> Could not load player data profiles. Ensure your terminal json-server command is active.
                </div`
        }
    }
}

const playerForm = document.getElementById('add-player-form')
if (playerForm) {
  playerForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const newPlayerData = {
        name: document.getElementById('player-name').value,
        number: parseInt(document.getElementById('player-number').value),
        position: document.getElementById('player-position').value,
        status: "Available"
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPlayerData)    
            })

            if (!response.ok) throw new Error("Database rejected entry save execution.")
            const savedPlayer = await response.json()
            
            squadPlayers.push(savedPlayer)
            renderPlayerCards()

            playerForm.reset()
        } catch(err) {
            console.error("Error creating player entry:", err.message)
            alert("Failed to save new player")
        }
    })
}

function renderPlayerCards () {
    const rosterContainer = document.getElementById('player-list-container')

    if (!rosterContainer) {
        console.error("DOM error: Could not find an html element container with id='roster-list'")
        return
    }

    if (squadPlayers.length === 0) {
        rosterContainer.innerHTML = `<p style="color: #64748b; font-style: italic;">No active players registered in your database roster.</p>`
        return
    }

    rosterContainer.innerHTML = squadPlayers.map(player => {

        const statusColor = player.status === 'Injured' ? '#ef4444' : '#10b981';

        return `
        <div class="player-card" style="background: #ffffff; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 5px solid ${statusColor};">
            <h3 style="margin-bottom: 0.5rem; color: #1e293b;">#${player.number || '0'} ${player.name}<h3>
            <p style="margin-bottom: 0.25rem; color: #475569;">Position: <strong>${player.position}</strong></p>
            <p style="color: #475569;"Availability Status: <span style="color: ${statusColor}; font-weight: bold;">${player.status || 'Available'}</span></p>
        </div>
        `
    }).join('')
}


function toggleModal(show) {
    const modal = document.getElementById('match-modal')
    if (modal) modal.style.display = show ? 'flex' : 'none'
}

function togglePlayerModal(show) {
    const modal = document.getElementById('player-modal')
    if (modal) modal.style.display = show ? 'flex' : 'none'
}

function toggleTrainingModal(show) {
    const modal = document.getElementById('training-modal')
    if (modal) modal.style.display = show ? 'flex' : 'none'
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('FutManager Application Logic Script Initialized successfully')
})

document.addEventListener('DOMContentLoaded', () => {
    const addMatchBtn =document.getElementById('add-match-btn')
    if (addMatchBtn) {
        addMatchBtn.addEventListener('click', () => toggleModal(true))
    }

    const addPlayerBtn = document.getElementById('add-player-btn')
    if (addPlayerBtn) {
        addPlayerBtn.addEventListener('click', () => togglePlayerModal(true))
    }

    const addTrainingBtn = document.getElementById('add-training-btn')
    if(addTrainingBtn) {
        addTrainingBtn.addEventListener('click', () => toggleTrainingModal(true))
    }

    console.log("Operational layout listeners successfully attached")
})
const MATCHES_URL = 'http://localhost:3000/matches';
let scheduledMatches = [];


async function fetchMatchesList() {
  try {
    const response = await fetch(MATCHES_URL);
    if (!response.ok) throw new Error("Could not fetch matches list data array.");
    
    scheduledMatches = await response.json();
    renderMatchCards();
  } catch (err) {
    console.error(" Matches Sync Error:", err.message);
  }
}

function renderMatchCards() {
  const container = document.getElementById('matches-list');
  if (!container) return;

  if (scheduledMatches.length === 0) {
    container.innerHTML = `<p style="color: #64748b; font-style: italic;">No match fixtures found in the database.</p>`;
    return;
  }

  container.innerHTML = scheduledMatches.map(match => {
    const isUpcoming = match.status === 'Upcoming';
    
    return `
      <div class="match-card" style="background: #ffffff; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 5px solid ${isUpcoming ? '#f97316' : '#1e293b'}; color: #334155;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <h4 style="color: #1e293b; font-size: 1.15rem; margin: 0;">vs ${match.opponent}</h4>
          <span style="font-size: 0.85rem; color: #64748b; font-weight: bold;"> ${match.date}</span>
        </div>
        
        <p style="margin: 0.25rem 0; font-size: 0.9rem;"> Venue: <strong>${match.venue || 'TBD'}</strong></p>
        <p style="margin: 0.25rem 0; font-size: 0.9rem;"> Kickoff Time: <strong>${match.time || 'TBD'}</strong></p>
        
        ${isUpcoming ? `
          <!-- Upcoming Fixture: Dynamic score recorder element -->
          <div style="background: #f8fafc; padding: 0.75rem; border-radius: 0.25rem; margin-top: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            <input type="text" id="result-text-${match.id}" placeholder="e.g. 2 - 1 (win)" style="flex: 1; padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 0.25rem;">
            <button onclick="saveMatchScore('${match.id}')" style="background: #1e293b; color: #fff; border: none; padding: 0.45rem 0.9rem; border-radius: 0.25rem; cursor: pointer; font-size: 0.85rem; font-weight: bold;">
               Log Score
            </button>
          </div>
        ` : `
          <!-- Played Match: Display the text score directly from your array -->
          <p style="font-size: 1.1rem; font-weight: bold; color: #10b981; margin-top: 0.75rem; padding-top: 0.5rem; border-top: 1px dashed #e2e8f0;">
             Result: ${match.score}
          </p>
        `}
      </div>
    `
  }).join('')
}

async function saveMatchScore(matchId) {
  const scoreInput = document.getElementById(`result-text-${matchId}`).value;

  if (!scoreInput.trim()) {
    alert("Please write a score result tag string before submitting.");
    return;
  }

  const targetedMatch = scheduledMatches.find(m => m.id === matchId);
  
  
  const updatedPayload = {
    ...targetedMatch,
    status: "Played",
    score: scoreInput
  };

  try {
    const response = await fetch(`${MATCHES_URL}/${matchId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPayload)
    });

    if (!response.ok) throw new Error("Write rejected by server endpoint.");
    
    
    const index = scheduledMatches.findIndex(m => m.id === matchId);
    scheduledMatches[index] = await response.json();
    renderMatchCards();

  } catch (err) {
    alert(`Error updating score entry tracking arrays: ${err.message}`);
  }
}

function setupViewNavigation() {
  const navButtons = document.querySelectorAll('.nav-links .nav-btn');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      
      const targetPanelId = button.getAttribute('data-target');
      if (!targetPanelId) return;

      
      navButtons.forEach(btn => btn.classList.remove('active'));
      
      button.classList.add('active');

      const allPanels = document.querySelectorAll('.view-panel');
      allPanels.forEach(panel => {
        panel.style.display = 'none';
      });

      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.style.display = 'block'
      }
    })
  })
}












