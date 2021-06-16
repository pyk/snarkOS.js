// Docs:
// https://github.com/AleoHQ/snarkOS/blob/staging/rpc/documentation/public_endpoints/getnodeinfo.md
import { Client as OpenRPCClient } from "@open-rpc/client-js";

/**
 * NodeInfo is a {@link getNodeInfo} response object.
 *
 * [snarkOS official doc](https://github.com/AleoHQ/snarkOS/blob/staging/rpc/documentation/public_endpoints/getnodeinfo.md)
 */
export interface NodeInfo {
    // 	Flag indicating if the node is a bootnode
    isBootnode: boolean;
    // Flag indicating if the node is a miner
    isMiner: boolean;
    // Flag indicating if the node currently syncing
    isSyncing: boolean;
    // The timestamp of when the node was launched
    launched: Date;
    // The configured listening address of the node
    listeningAddress: string;
    // The version of the client binary
    version: string;
}

export async function getNodeInfo(rpcClient: OpenRPCClient): Promise<NodeInfo> {
    const resp = await rpcClient.request({
        method: "getnodeinfo",
        params: [],
    });

    return {
        isBootnode: resp.is_bootnode,
        isMiner: resp.is_miner,
        isSyncing: resp.is_syncing,
        launched: resp.launched,
        listeningAddress: resp.listening_addr,
        version: resp.version,
    };
}
