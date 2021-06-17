// Docs:
// https://github.com/AleoHQ/snarkOS/blob/master/rpc/documentation/public_endpoints/decoderawtransaction.md
import { Client as OpenRPCClient } from "@open-rpc/client-js";
import { TransactionInfo } from "./getTransactionInfo";

export async function decodeRawTransaction(
    rpcClient: OpenRPCClient,
    transactionHex: string
): Promise<TransactionInfo> {
    const resp = await rpcClient.request({
        method: "decoderawtransaction",
        params: [transactionHex],
    });

    return {
        transactionID: resp.txid,
        size: resp.size,
        oldSerialNumbers: resp.old_serial_numbers,
        newCommitments: resp.new_commitments,
        memo: resp.memo,
        networkID: resp.network_id,
        digest: resp.digest,
        transactionProof: resp.transaction_proof,
        programCommitment: resp.program_commitment,
        localDataRoot: resp.local_data_root,
        valueBalance: resp.value_balance,
        signatures: resp.signatures,
        encryptedRecords: resp.encrypted_records,
        transactionMetadata: {
            blockNumber: resp.transaction_metadata.block_number,
        },
    };
}
