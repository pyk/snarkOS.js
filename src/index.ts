/**
 * snarkOS.js
 * snarkOS JavaScript API
 */
import {
    RequestManager,
    HTTPTransport,
    Client as OpenRPCCLient,
} from "@open-rpc/client-js";

import { getNodeInfo, NodeInfo } from "./endpoints/getNodeInfo";
import { getConnectionCount } from "./endpoints/getConnectionCount";
import { getNodeStats, NodeStats } from "./endpoints/getNodeStats";

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
        return await getNodeInfo(this.rpcClient);
    }

    /**
     * getConnectionCount returns the number of connected peers this node has.
     */
    public async getConnectionCount(): Promise<number> {
        return await getConnectionCount(this.rpcClient);
    }

    /**
     * getNodeStats returns statistics related to the node.
     */
    public async getNodeStats(): Promise<NodeStats> {
        return await getNodeStats(this.rpcClient);
    }
}
