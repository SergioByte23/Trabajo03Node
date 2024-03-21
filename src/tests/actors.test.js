const request = require('supertest');
const app = require('../app');

let id;

test("GET /actors return a 200 status", async() => {
    const res = await request(app).get("/actors");
	    expect(res.status).toBe(200);   
        expect(res.body).toBeInstanceOf(Array);
})

test("POST /actors debe crear un actor", async () => {
    const body = {
        firstName: "Sergio",
        lastName: "Delgado",
        nationality: "Perú",
        image: "https://www.elconfidencialdigital.com/asset/thumbnail,1920,1080,center,center/media/elconfidencialdigital/images/2023/03/22/2023032210544067347.jpg",
        birthday:"2000-08-07",
    }
    
    const res = await request(app).post("/actors").send(body);
	id =res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();
});

test("PUT /actors/:id actualizar datos de un actor", async () => {
    const body = {
        firstName: "Sergio actualizado",
        }  
    
    const res = await request(app).put(`/actors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});


test("DELETE/actors/:id debe eliminar un actor", async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});