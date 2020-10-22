// A passA:0x1DCA8e55179CAAD2359f1527fd490617C10520f3(卖家 seller) 0
// B passB:0x5E31CD71426064445007347aa986Ab8e1777fd28(买家 buyer) 1
// C passC:0x1b20434dBB7238b1Ab57067F05f2794b0DcbCAF8(服务站 server) 2
// D:0x9645eEbd649Df332D35032C3a15956D99CA229cf(检测机构 testing) 3
// E:0x673E45b14d249459926C6E692DF5DC144073d042(物流 sender) 4


var Second = artifacts.require("./Second");
contract('Second', async  => {
    it("卖家注册成功", async () => {
        let instance = await Second.deployed();
        let participantId1 = await instance.addParticipant("A", "passA", "0x1DCA8e55179CAAD2359f1527fd490617C10520f3", "seller");
        let participant1 = await instance.participants(0);
        assert.equal(participant1[0], "A");
        assert.equal(participant1[2], "seller");

    });

    it("创建服务站", async () => {
        let instance = await Second.deployed();
        let participantId3 = await instance.addParticipant("B", "passB", "0x1b20434dBB7238b1Ab57067F05f2794b0DcbCAF8", "server");
        let participant3 = await instance.participants(1);
        assert.equal(participant3[0], "B");
        assert.equal(participant3[2], "server");

    });

    it("创建检测机构", async () => {
        let instance = await Second.deployed();
        let participantId7 = await instance.addParticipant("C", "passC", "0x9645eEbd649Df332D35032C3a15956D99CA229cf", "testing");
        let participant7 = await instance.participants(2);
        assert.equal(participant7[0], "C");
        assert.equal(participant7[2], "testing");

    });

    it("注册物流", async () => {
        let instance = await Second.deployed();
        let participantId7 = await instance.addParticipant("D", "passD", "0x673E45b14d249459926C6E692DF5DC144073d042", "sender");
        let participant7 = await instance.participants(3);
        assert.equal(participant7[0], "D");
        assert.equal(participant7[2], "sender");

    });
    
    it("买家注册", async () => {
        let instance = await Second.deployed();
        let participantId7 = await instance.addParticipant("E", "passE", "0x5E31CD71426064445007347aa986Ab8e1777fd28", "buyer");
        let participant7 = await instance.participants(4);
        assert.equal(participant7[0], "E");
        assert.equal(participant7[2], "buyer");

    });
     
    it("上架商品", async () => {
        let instance = await Second.deployed();
        let prodId1 = await instance.addProduct(0, "商品1", "100", "123", 11);
        let prod1 = await instance.getProduct(0);
        assert.equal(prod1[0], "商品1");
    });

    it("卖家==>服务站", async () => {
        let instance = await Second.deployed();

        let ii = await instance.newOwner(0, 1, 0);
        let _getOwnership = await instance.getOwnership(0)
        console.log("_getOwnership", _getOwnership[2]);
        assert.equal("0x1b20434dBB7238b1Ab57067F05f2794b0DcbCAF8", _getOwnership[2]);
    })


    it("服务站==>检测机构", async () => {
    let instance = await Second.deployed();

    await instance.newOwner(1, 2, 0, { from:"0x1b20434dBB7238b1Ab57067F05f2794b0DcbCAF8" });
    _getOwnership1 = await instance.getOwnership(1)
    console.log("_getOwnership", _getOwnership1[2]);
    assert.equal("0x9645eEbd649Df332D35032C3a15956D99CA229cf", _getOwnership1[2]);

    })

    it("检测机构==>物流", async () => {
        let instance = await Second.deployed();

        await instance.newOwner(2, 3, 0, { from:"0x9645eEbd649Df332D35032C3a15956D99CA229cf" });
        _getOwnership2 = await instance.getOwnership(2)
        console.log("_getOwnership", _getOwnership2[2]);
        assert.equal("0x673E45b14d249459926C6E692DF5DC144073d042", _getOwnership2[2]);
    })

    it("物流==>买家", async () => {
        let instance = await Second.deployed();

        await instance.newOwner(3, 4, 0, { from:"0x673E45b14d249459926C6E692DF5DC144073d042" });
        _getOwnership3 = await instance.getOwnership(3)
        console.log("_getOwnership", _getOwnership3[2]);
        assert.equal("0x5E31CD71426064445007347aa986Ab8e1777fd28", _getOwnership3[2]);
    })
})