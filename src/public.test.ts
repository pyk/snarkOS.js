import { Client } from "./index";

const SNARKOS_NODE_URL = "http://localhost:3030";

describe("getNodeInfo", () => {
    test("with accessible node url", async () => {
        const snarkos = new Client(SNARKOS_NODE_URL);
        const nodeInfo = await snarkos.getNodeInfo();

        expect(nodeInfo.isBootnode).toBeDefined();
        expect(nodeInfo.isMiner).toBeDefined();
        expect(nodeInfo.isSyncing).toBeDefined();
        expect(nodeInfo.launched).toBeDefined();
        expect(nodeInfo.listeningAddress).toBeDefined();
        expect(nodeInfo.version).toBeDefined();
    });

    test("with inaccessible node url", async () => {
        expect.assertions(1);
        const snarkos = new Client("http://localhost:9000");
        await expect(snarkos.getNodeInfo).rejects.toThrowError();
    });
});
