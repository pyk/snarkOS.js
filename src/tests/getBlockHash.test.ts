import { Client } from "../index";

const SNARKOS_NODE_URL = "http://localhost:3030";

describe("getBlockHash", () => {
    test("with accessible node url", async () => {
        const snarkos = new Client(SNARKOS_NODE_URL);
        const blockHash = await snarkos.getBlockHash(1000);

        expect(blockHash).toBeDefined();
    });

    test("with inaccessible node url", async () => {
        expect.assertions(1);
        const snarkos = new Client("http://localhost:9000");
        await expect(snarkos.getBlockHash).rejects.toThrowError();
    });
});
