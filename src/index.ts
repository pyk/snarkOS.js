/**
 * snarkOS.js
 * snarkOS JavaScript API
 */
import {
    RequestManager,
    HTTPTransport,
    Client as OpenRPCCLient,
} from "@open-rpc/client-js";

/**
 * NodeInfo is a {@link getNodeInfo} response object.
 *
 * [snarkOS official doc](https://github.com/AleoHQ/snarkOS/blob/staging/rpc/documentation/public_endpoints/getnodeinfo.md)
 */
interface NodeInfo {
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

/**
 * snarkOS client constructor
 */
export class Client {
    private rpcClient: OpenRPCCLient;

    constructor(url: string) {
        // Setup new client using HTTPTransport
        // We may add function to setup other transport mechanism in the future
        const transport = new HTTPTransport(url);
        this.rpcClient = new OpenRPCCLient(new RequestManager([transport]));
    }

    /**
     * getNodeInfo returns information about the node.
     */
    public async getNodeInfo(): Promise<NodeInfo> {
        const result = await this.rpcClient.request({
            method: "getnodeinfo",
            params: [],
        });

        return {
            isBootnode: result.is_bootnode,
            isMiner: result.is_miner,
            isSyncing: result.is_syncing,
            launched: result.launched,
            listeningAddress: result.listening_addr,
            version: result.version,
        };
    }
}
