import { Client } from "../index";

const SNARKOS_NODE_URL = "http://localhost:3030";

describe("getRecordCommitments", () => {
    test("with accessible node url", async () => {
        const snarkos = new Client(SNARKOS_NODE_URL, {
            username: "snarkos",
            password: "snarkos",
        });
        const commitments = await snarkos.getRecordCommitments();

        expect(commitments.length).toBeGreaterThan(0);
    });

    test("with inaccessible node url", async () => {
        expect.assertions(1);
        const snarkos = new Client("http://localhost:9000");
        await expect(snarkos.getRecordCommitments).rejects.toThrowError();
    });

    test("with invalid authentication", async () => {
        expect.assertions(2);
        const snarkos1 = new Client(SNARKOS_NODE_URL);
        await expect(snarkos1.getRecordCommitments).rejects.toThrowError();
        const snarkos2 = new Client(SNARKOS_NODE_URL, {
            username: "random",
            password: "random",
        });
        await expect(snarkos2.getRecordCommitments).rejects.toThrowError();
    });
});
