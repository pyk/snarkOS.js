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

describe("getNodeStats", () => {
    test("with accessible node url", async () => {
        const snarkos = new Client(SNARKOS_NODE_URL);
        const nodeStats = await snarkos.getNodeStats();

        expect(nodeStats.connections.allAccepted).toBeDefined();
        expect(nodeStats.connections.allInitiated).toBeDefined();
        expect(nodeStats.connections.allRejected).toBeDefined();
        expect(nodeStats.connections.connectedPeers).toBeDefined();
        expect(nodeStats.connections.connectingPeers).toBeDefined();
        expect(nodeStats.connections.disconnectedPeers).toBeDefined();

        expect(nodeStats.handshakes.failuresInit).toBeDefined();
        expect(nodeStats.handshakes.failuresResp).toBeDefined();
        expect(nodeStats.handshakes.successesInit).toBeDefined();
        expect(nodeStats.handshakes.successesResp).toBeDefined();
        expect(nodeStats.handshakes.timeoutsInit).toBeDefined();
        expect(nodeStats.handshakes.timeoutsResp).toBeDefined();

        expect(nodeStats.inbound.allSuccesses).toBeDefined();
        expect(nodeStats.inbound.allFailures).toBeDefined();
        expect(nodeStats.inbound.blocks).toBeDefined();
        expect(nodeStats.inbound.getBlocks).toBeDefined();
        expect(nodeStats.inbound.getMemoryPool).toBeDefined();
        expect(nodeStats.inbound.getPeers).toBeDefined();
        expect(nodeStats.inbound.getSync).toBeDefined();
        expect(nodeStats.inbound.memoryPool).toBeDefined();
        expect(nodeStats.inbound.peers).toBeDefined();
        expect(nodeStats.inbound.pings).toBeDefined();
        expect(nodeStats.inbound.pongs).toBeDefined();
        expect(nodeStats.inbound.syncs).toBeDefined();
        expect(nodeStats.inbound.syncBlocks).toBeDefined();
        expect(nodeStats.inbound.transactions).toBeDefined();
        expect(nodeStats.inbound.unknown).toBeDefined();

        expect(nodeStats.misc.blockHeight).toBeDefined();
        expect(nodeStats.misc.blocksMined).toBeDefined();
        expect(nodeStats.misc.duplicateBlocks).toBeDefined();
        expect(nodeStats.misc.duplicateSyncBlocks).toBeDefined();

        expect(nodeStats.outbound.allSuccesses).toBeDefined();
        expect(nodeStats.outbound.allFailures).toBeDefined();

        expect(nodeStats.queues.inbound).toBeDefined();
        expect(nodeStats.queues.outbound).toBeDefined();
    });

    test("with inaccessible node url", async () => {
        expect.assertions(1);
        const snarkos = new Client("http://localhost:9000");
        await expect(snarkos.getNodeStats).rejects.toThrowError();
    });
});
