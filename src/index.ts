/**
 * snarkOS.js
 * snarkOS JavaScript API
 */
import {
    RequestManager,
    HTTPTransport,
    Client as OpenRPCClient,
} from "@open-rpc/client-js";

import { getNodeInfo, NodeInfo } from "./endpoints/getNodeInfo";
import { getConnectionCount } from "./endpoints/getConnectionCount";
import { getNodeStats, NodeStats } from "./endpoints/getNodeStats";
import { getPeerInfo } from "./endpoints/getPeerInfo";
import { getBlockTemplate, BlockTemplate } from "./endpoints/getBlockTemplate";
import { getBlockHash } from "./endpoints/getBlockHash";
import { getBlockCount } from "./endpoints/getBlockCount";
import { getBlock, Block } from "./endpoints/getBlock";
import { getBestBlockHash } from "./endpoints/getBestBlockHash";
import { getRawTransaction } from "./endpoints/getRawTransaction";
import {
    getTransactionInfo,
    TransactionInfo,
} from "./endpoints/getTransactionInfo";
import { decodeRawTransaction } from "./endpoints/decodeRawTransaction";

/**
 * snarkOS client constructor
 */
export class Client {
    private rpcClient: OpenRPCClient;

    constructor(url: string) {
        // Setup new client using HTTPTransport
        // We may add function to setup other transport mechanism in the future
        const transport = new HTTPTransport(url);
        this.rpcClient = new OpenRPCClient(new RequestManager([transport]));
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

    /**
     * getPeerInfo returns the node's connected peers.
     */
    public async getPeerInfo(): Promise<Array<string>> {
        return await getPeerInfo(this.rpcClient);
    }

    /**
     * getBlockTemplate returns the current mempool and consensus information
     * known by this node.
     */
    public async getBlockTemplate(): Promise<BlockTemplate> {
        return await getBlockTemplate(this.rpcClient);
    }

    /**
     * getBlockHash returns the block hash of a block at the given block
     * height in the best valid chain.
     */
    public async getBlockHash(blockHeight: number): Promise<string> {
        return await getBlockHash(this.rpcClient, blockHeight);
    }

    /**
     * getBlockCount returns the number of blocks in the best valid chain.
     */
    public async getBlockCount(): Promise<number> {
        return await getBlockCount(this.rpcClient);
    }

    /**
     * getBlock returns information about a block from a block hash.
     */
    public async getBlock(blockHash: string): Promise<Block> {
        return await getBlock(this.rpcClient, blockHash);
    }

    /**
     * getBestBlockHash returns the block hash of the head of the best valid chain.
     */
    public async getBestBlockHash(): Promise<string> {
        return await getBestBlockHash(this.rpcClient);
    }

    /**
     * getRawTransaction returns hex encoded bytes of a transaction from its
     * transaction id.
     */
    public async getRawTransaction(transactionID: string): Promise<string> {
        return await getRawTransaction(this.rpcClient, transactionID);
    }

    /**
     * getTransactionInfo returns information about a transaction from a transaction id.
     */
    public async getTransactionInfo(
        transactionID: string
    ): Promise<TransactionInfo> {
        return await getTransactionInfo(this.rpcClient, transactionID);
    }

    /**
     * decodeRawTransaction returns information about a transaction from serialized
     * transaction bytes.
     */
    public async decodeRawTransaction(
        transactionHex: string
    ): Promise<TransactionInfo> {
        return await decodeRawTransaction(this.rpcClient, transactionHex);
    }
}
