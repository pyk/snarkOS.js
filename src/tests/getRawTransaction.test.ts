import { Client } from "../index";

const SNARKOS_NODE_URL = "http://localhost:3030";

describe("getRawTransaction", () => {
    test("with accessible node url", async () => {
        const snarkos = new Client(SNARKOS_NODE_URL);
        // Get blockhash first then get the transaction id
        const blockTemplate = await snarkos.getBlockTemplate();
        const blockHash = blockTemplate.previousBlockHash;
        const block = await snarkos.getBlock(blockHash);
        const transactionID = block.transactions[0];

        // Get raw transaction
        const transactionHex = await snarkos.getRawTransaction(transactionID);

        expect(transactionHex).toBeDefined();
    });

    test("with inaccessible node url", async () => {
        expect.assertions(1);
        const snarkos = new Client("http://localhost:9000");
        await expect(snarkos.getRawTransaction).rejects.toThrowError();
    });
});
