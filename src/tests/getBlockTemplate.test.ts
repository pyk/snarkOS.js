import { Client } from "../index";

const SNARKOS_NODE_URL = "http://localhost:3030";

describe("getBlockTemplate", () => {
    test("with accessible node url", async () => {
        const snarkos = new Client(SNARKOS_NODE_URL);
        const blockTemplate = await snarkos.getBlockTemplate();

        expect(blockTemplate.previousBlockHash).toBeDefined();
        expect(blockTemplate.blockHeight).toBeDefined();
        expect(blockTemplate.time).toBeDefined();
        expect(blockTemplate.difficultyTarget).toBeDefined();
        expect(blockTemplate.transactions).toBeDefined();
        expect(blockTemplate.coinbaseValue).toBeDefined();
    });

    test("with inaccessible node url", async () => {
        expect.assertions(1);
        const snarkos = new Client("http://localhost:9000");
        await expect(snarkos.getBlockTemplate).rejects.toThrowError();
    });
});
