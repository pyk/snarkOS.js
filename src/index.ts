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

/**
 * Connection statistics of the node
 */
interface NodeConnectionStats {
    // The number of connection requests the node has received
    allAccepted: number;
    // The number of connection requests the node has made
    allInitiated: number;
    // The number of connection requests the node has rejected
    allRejected: number;
    // The number of currently connected peers
    connectedPeers: number;
    // The number of currently connecting peers
    connectingPeers: number;
    // The number of known disconnected peers
    disconnectedPeers: number;
}

/**
 * Handshakes statistics of the node
 */
interface NodeHandshakesStats {
    // The number of failed handshakes as the initiator
    failuresInit: number;
    // The number of failed handshakes as the responder
    failuresResp: number;
    // The number of successful handshakes as the initiator
    successesInit: number;
    // The number of successful handshakes as the responder
    successesResp: number;
    // The number of handshake timeouts as the initiator
    timeoutsInit: number;
    // The number of handshake timeouts as the responder
    timeoutsResp: number;
}

/**
 * Inbound statistics of the node
 */
interface NodeInboundStats {
    // The number of successfully processed inbound messages
    allSuccesses: number;
    // The number of inbound messages that couldn't be processed
    allFailures: number;
    // The number of all received Block messages
    blocks: number;
    // The number of all received GetBlocks messages
    getBlocks: number;
    // The number of all received GetMemoryPool messages
    getMemoryPool: number;
    // The number of all received GetPeers messages
    getPeers: number;
    // The number of all received GetSync messages
    getSync: number;
    // The number of all received MemoryPool messages
    memoryPool: number;
    // The number of all received Peers messages
    peers: number;
    // The number of all received Ping messages
    pings: number;
    // The number of all received Pong messages
    pongs: number;
    // The number of all received Sync messages
    syncs: number;
    // The number of all received SyncBlock messages
    syncBlocks: number;
    // The number of all received Transaction messages
    transactions: number;
    // The number of all received Unknown messages
    unknown: number;
}

/**
 * Miscellaneous statistics of the node
 */
interface NodeMiscStats {
    // The current block height of the node
    blockHeight: number;
    // The number of blocks the node has mined
    blocksMined: number;
    // The number of duplicate blocks received
    duplicateBlocks: number;
    // The number of duplicate sync blocks received
    duplicateSyncBlocks: number;
}

/**
 * Outbound statistics of the node
 */
interface NodeOutboundStats {
    // The number of successfully sent messages
    allSuccesses: number;
    // The number of failures to send messages
    allFailures: number;
}

/**
 * Queues statistics of the node
 */
interface NodeQueuesStats {
    // The number of messages queued in the common inbound channel
    inbound: number;
    // The number of messages queued in the individual outbound channels
    outbound: number;
}

/**
 * NodeStats is a {@link getNodeStats} response object.
 *
 * [snarkOS official doc](https://github.com/AleoHQ/snarkOS/blob/staging/rpc/documentation/public_endpoints/getnodestats.md)
 */
export interface NodeStats {
    // Connection statistics
    connections: NodeConnectionStats;
    // Handshakes statistics
    handshakes: NodeHandshakesStats;
    // Inbound statistics
    inbound: NodeInboundStats;
    // Miscellaneous statistics
    misc: NodeMiscStats;
    // Outbound statistics
    outbound: NodeOutboundStats;
    // Queues statistics
    queues: NodeQueuesStats;
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

    /**
     * getNodeStats returns statistics related to the node.
     */
    public async getNodeStats(): Promise<NodeStats> {
        const resp = await this.rpcClient.request({
            method: "getnodestats",
            params: [],
        });

        return {
            connections: {
                allAccepted: resp.connections.all_accepted,
                allInitiated: resp.connections.all_initiated,
                allRejected: resp.connections.all_rejected,
                connectedPeers: resp.connections.connected_peers,
                connectingPeers: resp.connections.connecting_peers,
                disconnectedPeers: resp.connections.disconnected_peers,
            },
            handshakes: {
                failuresInit: resp.handshakes.failures_init,
                failuresResp: resp.handshakes.failures_resp,
                successesInit: resp.handshakes.successes_init,
                successesResp: resp.handshakes.successes_resp,
                timeoutsInit: resp.handshakes.timeouts_init,
                timeoutsResp: resp.handshakes.timeouts_resp,
            },
            inbound: {
                allSuccesses: resp.inbound.all_successes,
                allFailures: resp.inbound.all_failures,
                blocks: resp.inbound.blocks,
                getBlocks: resp.inbound.getblocks,
                getMemoryPool: resp.inbound.getmemorypool,
                getPeers: resp.inbound.getpeers,
                getSync: resp.inbound.getsync,
                memoryPool: resp.inbound.memorypool,
                peers: resp.inbound.peers,
                pings: resp.inbound.pings,
                pongs: resp.inbound.pongs,
                syncs: resp.inbound.syncs,
                syncBlocks: resp.inbound.syncblocks,
                transactions: resp.inbound.transactions,
                unknown: resp.inbound.unknown,
            },
            misc: {
                blockHeight: resp.misc.block_height,
                blocksMined: resp.misc.blocks_mined,
                duplicateBlocks: resp.misc.duplicate_blocks,
                duplicateSyncBlocks: resp.misc.duplicate_sync_blocks,
            },
            outbound: {
                allSuccesses: resp.outbound.all_successes,
                allFailures: resp.outbound.all_failures,
            },
            queues: {
                inbound: resp.queues.inbound,
                outbound: resp.queues.outbound,
            },
        };
    }
}
