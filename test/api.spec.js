const request = require('supertest');
const app = require('../index');

describe("GET /api/v1/users", () => {
    it("Return status: 200 and Users Data", async () => {
        const res = await request(app).get("/api/v1/users");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('code');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(expect.any(Array));
        // expect(res.body).toEqual(
        //     expect.objectContaining({
        //         status: 'success',
        //         code : 200,
        //         message: 'Success!',
        //         data: expect.any(Array)
        //     })
        // );
    })
    // test("res.json called with no result", async ()=> {
    //     const req =mockRequest(null,null,{id:1})
    //     const res =mockResponse()
    //     await base.get(req, res)
    //     expect(res.status).toBeCalledWith(200)
    //     expect(res.json).toBeCalledWith(
    //         expect.objectContaining({
    //             status: 'success',
    //             code: 200,
    //             message: "Success!",
    //             data: expect.any(Array)
    //         })
    //     )
    // });
});
describe("GET /api/v1/accounts", () => {
    it("Return status: 200 and Accounts Data", async () => {
        const res = await request(app).get("/api/v1/accounts");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('code');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(expect.any(Array));
        
    })
});
describe("GET /api/v1/transactions", () => {
    it("Return status: 200 and Accounts Data", async () => {
        const res = await request(app).get("/api/v1/accounts");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('code');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(expect.any(Array));
        
    })
});

describe("POST /api/v1/auth",()=>{
    test("Return status: Login test, 201 and Users Token",async()=>{
        const res=await request(app).post('/api/v1/auth/login').send({
            email:'ramadhan@student.untan.ac.id',
            password:'12345678'
        })

        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toEqual(expect.any(Object))
       
    })
})

describe("POST /api/v1/auth",()=>{
    test("Return status: Login test, 404 and Users Token",async()=>{
        const res=await request(app).post('/api/v1/auth/login').send({
            email:'furina@gmail.com',
            password:'12345678'
        })

        expect(res.body).toEqual(
            expect.objectContaining({
                status: "Fail!!",
                message: "Email tidak ditemukan!"
            })
        )
    })
})

describe("POST /api/v1/auth",()=>{
    test("Return status: Login test, 401 and Users Token",async()=>{
        const res=await request(app).post('/api/v1/auth/login').send({
            email:'ramadhan@student.untan.ac.id',
            password:'87654321'
        })

        expect(res.body).toEqual(
            expect.objectContaining({
                status: "Fail!!!",
                message: "Password Salah!!"
            })
        )
    })
})


describe("POST /api/v1/auth",()=>{
        test("Return status: Register test, 201 and User",async()=>{
            const res=await request(app).post('/api/v1/auth/register').send({
                name:'testkeberapa',
                email:'archon4@gmail.com',
                password:'test123456'
            })
            expect(res.statusCode).toBe(201)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')
            expect(res.body.data).toEqual(expect.any(Object))
       
        }) 
    })
