// Docs:
// https://github.com/AleoHQ/snarkOS/blob/staging/rpc/documentation/public_endpoints/getblock.md
import { Client as OpenRPCClient } from "@open-rpc/client-js";

export interface Block {
    // The number of confirmations for this block
    confirmations: number;
    // The difficulty of the block
    difficultyTarget: number;
    // The block hash (same as provided)
    hash: string;
    // The block height
    height: number;
    // The Merkle root of the transactions in the block
    merkleRoot: number;
    // The nonce for solving the PoSW puzzle
    nonce: number;
    // The Merkle root of the transactions in the block using a Pedersen hash
    pedersenMerkleRootHash: number;
    // The block hash of the parent block
    previousBlockHash: string;
    // The Proof of Succinct Work
    proof: string;
    // The size of the block in bytes
    size: number;
    // The block time
    time: number;
    // The list of transaction ids included in the block
    transactions: Array<string>;
}

export async function getBlock(
    rpcClient: OpenRPCClient,
    blockHash: string
): Promise<Block> {
    const resp = await rpcClient.request({
        method: "getblock",
        params: [blockHash],
    });

    return {
        confirmations: resp.confirmations,
        difficultyTarget: resp.difficulty_target,
        hash: resp.hash,
        height: resp.height,
        merkleRoot: resp.merkle_root,
        nonce: resp.nonce,
        pedersenMerkleRootHash: resp.pedersen_merkle_root_hash,
        previousBlockHash: resp.previous_block_hash,
        proof: resp.proof,
        size: resp.size,
        time: resp.time,
        transactions: resp.transactions,
    };
}
