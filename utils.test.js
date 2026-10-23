const { describe, number } = require('yargs')
const { formatStatusColor, generatePayLoad, generatePlayerPayload } = require('./utils')
const test = require('node:test')
describe('FutManager Core Utility Test Suite', () => {
    test('should return red hex code for injured status', () => {
        expect(formatStatusColor('Injured')).toBe('#ef4444')
    })
    test('should return green hex code for available status', () => {
        expect(formatStatusColor('Available')).toBe('#10b981')
    })
    test('should construct a valid player object from correct inputs', () => {
        const payload = generatePlayerPayLoad('Cole Palmer', '20', 'Forward')
        expect(payload).toEqual({
            name: 'Cole Palmer',
            number: 20,
            position: 'Forward',
            status: 'Available'
        })
    })
    test('should reject if name criteria is missing', () => {
        expect(generatePlayerPayload('', '10', 'Midfielder')).toBeNull()
    })
})