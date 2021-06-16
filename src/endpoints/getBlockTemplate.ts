// Docs:
// https://github.com/AleoHQ/snarkOS/blob/staging/rpc/documentation/public_endpoints/getblocktemplate.md
import { Client as OpenRPCClient } from "@open-rpc/client-js";

export interface BlockTemplate {
    // 	The hash of current highest block
    previousBlockHash: string;
    // The height of the next block
    blockHeight: number;
    // The current timestamp
    time: number;
    // The block difficulty target
    difficultyTarget: number;
    // The list of raw transactions to include in the block
    transactions: Array<string>;
    // The amount spendable by the coinbase transaction
    coinbaseValue: number;
}

export async function getBlockTemplate(
    rpcClient: OpenRPCClient
): Promise<BlockTemplate> {
    const resp = await rpcClient.request({
        method: "getblocktemplate",
        params: [],
    });

    return {
        previousBlockHash: resp.previous_block_hash,
        blockHeight: resp.block_height,
        time: resp.time,
        difficultyTarget: resp.difficulty_target,
        transactions: resp.transactions,
        coinbaseValue: resp.coinbase_value,
    };
}
