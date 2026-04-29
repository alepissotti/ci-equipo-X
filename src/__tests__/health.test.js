const request = require('supertest');
const app = require('../index');

describe('Health Endpoint', () => {
    test('GET /api/health should return 200 and status message', async () => {
        const response = await request(app)
            .get('/api/health')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toHaveProperty('status');
        expect(response.body.status).toBe('API en línea');
    });

    test('GET /api/health should return correct JSON structure', async () => {
        const response = await request(app)
            .get('/api/health');

        expect(response.body).toEqual({
            status: 'API en línea'
        });
    });
});
