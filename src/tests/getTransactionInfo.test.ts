import { Client } from "../index";

const SNARKOS_NODE_URL = "http://localhost:3030";

describe("getTransactionInfo", () => {
    test("with accessible node url", async () => {
        const snarkos = new Client(SNARKOS_NODE_URL);
        // Get blockhash first then get the transaction id
        const blockTemplate = await snarkos.getBlockTemplate();
        const blockHash = blockTemplate.previousBlockHash;
        const block = await snarkos.getBlock(blockHash);
        const transactionID = block.transactions[0];

        // Get transaction info
        const transactionInfo = await snarkos.getTransactionInfo(transactionID);

        expect(transactionInfo.transactionID).toBeDefined();
        expect(transactionInfo.size).toBeDefined();
        expect(transactionInfo.oldSerialNumbers.length).toBeGreaterThan(0);
        expect(transactionInfo.newCommitments.length).toBeGreaterThan(0);
        expect(transactionInfo.memo).toBeDefined();
        expect(transactionInfo.networkID).toBeDefined();
        expect(transactionInfo.digest).toBeDefined();
        expect(transactionInfo.transactionProof).toBeDefined();
        expect(transactionInfo.programCommitment).toBeDefined();
        expect(transactionInfo.localDataRoot).toBeDefined();
        expect(transactionInfo.valueBalance).toBeDefined();
        expect(transactionInfo.signatures.length).toBeGreaterThan(0);
        expect(transactionInfo.encryptedRecords.length).toBeGreaterThan(0);
        expect(transactionInfo.transactionMetadata.blockNumber).toBeDefined();
    });

    test("with inaccessible node url", async () => {
        expect.assertions(1);
        const snarkos = new Client("http://localhost:9000");
        await expect(snarkos.getTransactionInfo).rejects.toThrowError();
    });
});
