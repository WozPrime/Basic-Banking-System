const base = require('../app/controller/api/transactions');
const mockRequest = (body = {}, query = {}, params = {}) => ({body, query, params});
const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
}

describe("transactions.get function", () => {
    test("res.json called with transactions data", async () => {
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


describe("transactions.getbyid function",()=>{
    test("res.json called with transactions data id",async()=>{
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


describe("transactions.create function", ()=> {
    test("res.json called with stats 200", async () => {
        const req =mockRequest({
            trans_type:"Transfer",
            trans_nominal: 500,
            destination_accountId: 1,
            source_accountId:2
        })
        const res =mockResponse()
        await base.create(req, res)
        expect(res.status).toBeCalledWith(201)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: "Akun Bank berhasil ditambahkan",
                data: expect.any(Object)
            })
        )
    });
});
