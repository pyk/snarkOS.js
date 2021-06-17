// Docs:
// https://github.com/AleoHQ/snarkOS/blob/master/rpc/documentation/public_endpoints/gettransactioninfo.md
import { Client as OpenRPCClient } from "@open-rpc/client-js";

interface TransactionMetadata {
    blockNumber: number;
}

export interface TransactionInfo {
    // The transaction id
    transactionID: string;
    // 	The size of the transaction in bytes
    size: number;
    // The list of old record serial numbers
    oldSerialNumbers: Array<string>;
    // The list of new record commitments
    newCommitments: Array<string>;
    // The transaction memo
    memo: string;
    // The transaction network id
    networkID: number;
    // The merkle tree digest
    digest: string;
    // The transaction zero knowledge proof
    transactionProof: string;
    // The program verification key commitment
    programCommitment: string;
    // 	The local data root
    localDataRoot: string;
    // The transaction value balance
    valueBalance: number;
    // The list of transaction signatures
    signatures: Array<string>;
    // The list of new encrypted records
    encryptedRecords: Array<string>;
    // The transaction metadata
    transactionMetadata: TransactionMetadata;
}

export async function getTransactionInfo(
    rpcClient: OpenRPCClient,
    transactionID: string
): Promise<TransactionInfo> {
    const resp = await rpcClient.request({
        method: "gettransactioninfo",
        params: [transactionID],
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
