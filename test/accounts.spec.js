const base = require('../app/controller/api/accounts');
const mockRequest = (body = {}, query = {}, params = {}) => ({body, query, params});
const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
}

describe("accounts.get function", () => {
    test("res.json called with accounts data", async () => {
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


describe("accounts.getbyid function",()=>{
    test("res.json called with accounts data id",async()=>{
        let req=mockRequest()
        const res=mockResponse()
        req.params.id=2
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


describe("accounts.create function", ()=> {
    test("res.json called with stats 200", async () => {
        const req =mockRequest({
            bank_name:"BACA",
            account_number:958598,
            balance: 8000,
            userId:7
        })
        const res =mockResponse()
        await base.create(req, res)
        expect(res.status).toBeCalledWith(201)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Akun Bank berhasil ditambahkan',
                data: expect.any(Object)
            })
        )
    });
});