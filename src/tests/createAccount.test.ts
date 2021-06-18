import { Client } from "../index";

const SNARKOS_NODE_URL = "http://localhost:3030";

describe("createAccount", () => {
    test("with accessible node url", async () => {
        const snarkos = new Client(SNARKOS_NODE_URL, {
            username: "snarkos",
            password: "snarkos",
        });
        const account = await snarkos.createAccount();

        expect(account.privateKey).toBeDefined();
        expect(account.address).toBeDefined();
    });

    test("with inaccessible node url", async () => {
        expect.assertions(1);
        const snarkos = new Client("http://localhost:9000");
        await expect(snarkos.createAccount).rejects.toThrowError();
    });
});
