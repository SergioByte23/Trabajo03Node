const request = require('supertest');
const app = require('../app');

let id;

test("GET /directors return a 200 status", async() => {
    const res = await request(app).get("/directors");
	    expect(res.status).toBe(200);   
        expect(res.body).toBeInstanceOf(Array);
})

test("POST /directors debe crear un director", async () => {
    const body = {
        firstName: "Sergio",
        lastName: "Delgado",
        nationality: "Perú",
        image: "https://www.elconfidencialdigital.com/asset/thumbnail,1920,1080,center,center/media/elconfidencialdigital/images/2023/03/22/2023032210544067347.jpg",
        birthday:"2000-08-07",
    }
    
    const res = await request(app).post("/directors").send(body);
	id =res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();
});

test("PUT /directors/:id actualizar datos del director", async () => {
    const body = {
        firstName: "Sergio actualizado",
        }  
    
    const res = await request(app).put(`/directors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});


test("DELETE/directors/:id debe eliminar un director", async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});