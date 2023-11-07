const base = require('../app/controller/api/users');
const mockRequest = (body = {}, query = {}, params = {}) => ({body, query, params});
const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
}

describe("users.get function", () => {
    test("res.json called with users data", async () => {
        const req = mockRequest();
        const res = mockResponse();
        await base.get(req,res);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code : 200,
                message: 'Success!',
                data: expect.any(Array)
            })
        );
    })
    test("res.json called with no result", async ()=> {
        const req =mockRequest(null,null,{id:1})
        const res =mockResponse()
        await base.get(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: "Success!",
                data: expect.any(Array)
            })
        )
    });
});

describe("users.getbyid function",()=>{
    test("res.json called with users data id",async()=>{
        let req=mockRequest()
        const res=mockResponse()
        req.params.id=3
        await base.getById(req,res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status:'success',
                code:200,
                message:'Data Ditemukan',
                data:expect.any(Object)
            })
        )
    })
})

describe("users.getbyid function",()=>{
    test("res.json called with users data id",async()=>{
        let req=mockRequest(null,null,{id:''})
        const res=mockResponse()
        await base.getById(req,res)
        expect(res.status).toBeCalledWith(400)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'fail',
                code : 400,
                message: 'Bad Request! id is required',
            })
        )
    })
})



describe("users.create function", ()=> {
    test("res.json called with stats 200", async () => {
        const req =mockRequest({
            name: "Coba5",
            email:"coba5@gmail.com",
            password:"123456",
            identity_number: 989907,
            address: "lanjalanja",
            identity_type:"gold",
            phone_number: "085754575457"
        })
        const res =mockResponse()
        await base.create(req, res)
        expect(res.status).toBeCalledWith(201)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: "User dan Profil berhasil ditambahkan",
                data: expect.any(Object)
            })
        )
    });
});
