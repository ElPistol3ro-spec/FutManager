const { number } = require("yargs")

function formatStatusColor(status) {
   return status === 'Injured' ? '#ef4444' : '#10b981'
}

function generatePlayerPayload(name, jerseyNumber, position) {
    if (!name || !jerseyNumber) return null
    return {
        name: name.trim(),
        number: parseInt(jerseyNumber),
        position: position,
        status: "Available"
    }
}
module.exports = { formatStatusColor, generatePlayerPayload }