import { Client } from "../index";

const SNARKOS_NODE_URL = "http://localhost:3030";

describe("validateRawTransaction", () => {
    test("with accessible node url", async () => {
        const snarkos = new Client(SNARKOS_NODE_URL);
        // Get blockhash first then get the transaction id
        const blockTemplate = await snarkos.getBlockTemplate();
        const nextBlockHeight = blockTemplate.blockHeight;
        const previousBlockHeight = nextBlockHeight - 10;
        const blockHash = await snarkos.getBlockHash(previousBlockHeight);
        const block = await snarkos.getBlock(blockHash);
        const transactionID = block.transactions[0];
        // Get raw transaction
        const transactionHex = await snarkos.getRawTransaction(transactionID);
        // Validate transaction
        const value = await snarkos.validateRawTransaction(transactionHex);
        expect(value).toBeDefined();
    });

    test("with inaccessible node url", async () => {
        expect.assertions(1);
        const snarkos = new Client("http://localhost:9000");
        await expect(snarkos.validateRawTransaction).rejects.toThrowError();
    });
});
