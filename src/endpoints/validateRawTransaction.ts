// Docs:
// https://github.com/AleoHQ/snarkOS/blob/master/rpc/documentation/public_endpoints/decoderawtransaction.md
import { Client as OpenRPCClient } from "@open-rpc/client-js";

export async function validateRawTransaction(
    rpcClient: OpenRPCClient,
    transactionHex: string
): Promise<boolean> {
    const resp = await rpcClient.request({
        method: "validaterawtransaction",
        params: [transactionHex],
    });

    return resp;
}
