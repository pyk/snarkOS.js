import { Client } from "../index";

const SNARKOS_NODE_URL = "http://localhost:3030";

describe("getBlock", () => {
    test("with accessible node url", async () => {
        const snarkos = new Client(SNARKOS_NODE_URL);
        // Get blockhash first
        const blockTemplate = await snarkos.getBlockTemplate();
        const blockHash = blockTemplate.previousBlockHash;
        const block = await snarkos.getBlock(blockHash);

        expect(block.confirmations).toBeDefined();
        expect(block.difficultyTarget).toBeDefined();
        expect(block.hash).toBeDefined();
        expect(block.height).toBeDefined();
        expect(block.merkleRoot).toBeDefined();
        expect(block.nonce).toBeDefined();
        expect(block.pedersenMerkleRootHash).toBeDefined();
        expect(block.previousBlockHash).toBeDefined();
        expect(block.proof).toBeDefined();
        expect(block.size).toBeDefined();
        expect(block.time).toBeDefined();
        expect(block.transactions).toBeDefined();
        expect(block.transactions.length).toBeGreaterThan(0);
    });

    test("with inaccessible node url", async () => {
        expect.assertions(1);
        const snarkos = new Client("http://localhost:9000");
        await expect(snarkos.getBlock).rejects.toThrowError();
    });
});
