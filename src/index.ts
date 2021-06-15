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
        const resp = await this.rpcClient.request({
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

    /**
     * getConnectionCount returns the number of connected peers this node has.
     */
    public async getConnectionCount(): Promise<number> {
        const resp = await this.rpcClient.request({
            method: "getconnectioncount",
            params: [],
        });

        return resp;
    }
}
