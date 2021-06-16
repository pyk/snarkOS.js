import { Client } from "../index";

const SNARKOS_NODE_URL = "http://localhost:3030";

describe("getConnectionCount", () => {
    test("with accessible node url", async () => {
        const snarkos = new Client(SNARKOS_NODE_URL);
        const count = await snarkos.getConnectionCount();

        expect(count).toBeGreaterThan(0);
    });

    test("with inaccessible node url", async () => {
        expect.assertions(1);
        const snarkos = new Client("http://localhost:9000");
        await expect(snarkos.getConnectionCount).rejects.toThrowError();
    });
});
