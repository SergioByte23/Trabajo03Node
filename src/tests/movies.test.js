const request = require('supertest');
const app = require('../app');
const Genres = require('../models/Genres');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');

let id;

test("GET /movies return a 200 status", async() => {
    const res = await request(app).get("/movies");
	    expect(res.status).toBe(200);   
        expect(res.body).toBeInstanceOf(Array);
})

test("POST /movies debe crear una pelicula", async () => {
    const body = {
        name: "Dragon ball la batalla de los dioses",
        image: "https://es.web.img3.acsta.net/pictures/14/03/13/09/32/445665.jpg",
        synopsis: "Goku adquiere una nueva fase",
        releaseYear: "2000-08-07",        
    }
    
    const res = await request(app).post("/movies").send(body);
	id =res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(body.name);
    expect(res.body.id).toBeDefined();
});

test("PUT /movies/:id actualizar datos de un pelicula", async () => {
    const body = {
        name: "Dragon ball la batalla de los dioses actualizado",
        }  
    
    const res = await request(app).put(`/movies/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test("POST /movies/:id/genres debe insertar los generos de una pelicula", async () => {
    const genre=await Genres.create({name: "Animada"});
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});

test("POST /movies/:id/actors debe insertar los actores de una pelicula", async () => {
    const actor=await Actors.create({
        firstName: "Juan",
        lastName: "Burga",
        nationality: "Argentina",
        image: "https://www.elconfidencialdigital.com/asset/thumbnail,1920,1080,center,center/media/elconfidencialdigital/images/2023/03/22/2023032210544067347.jpg",
        birthday:"1997-08-07",
    });
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});

test("POST /movies/:id/directors debe insertar los directores de una pelicula", async () => {
    const director=await Directors.create({
        firstName: "Pedro",
        lastName: "Salinas",
        nationality: "Chile",
        image: "https://www.elconfidencialdigital.com/asset/thumbnail,1920,1080,center,center/media/elconfidencialdigital/images/2023/03/22/2023032210544067347.jpg",
        birthday:"1992-08-07",
    });
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});



test("DELETE/movies/:id debe eliminar una pelicula", async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});