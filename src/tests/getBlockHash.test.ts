import { Client } from "../index";

const SNARKOS_NODE_URL = "http://localhost:3030";

describe("getBlockHash", () => {
    test("with accessible node url", async () => {
        const snarkos = new Client(SNARKOS_NODE_URL);
        // Get blocktemplate first
        const blockTemplate = await snarkos.getBlockTemplate();
        const blockHeight = blockTemplate.blockHeight - 1;
        const blockHash = await snarkos.getBlockHash(blockHeight);
        expect(blockHash).toBeDefined();
    });

    test("with inaccessible node url", async () => {
        expect.assertions(1);
        const snarkos = new Client("http://localhost:9000");
        await expect(snarkos.getBlockHash).rejects.toThrowError();
    });
});
