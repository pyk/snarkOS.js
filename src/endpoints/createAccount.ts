// Docs:
// https://github.com/AleoHQ/snarkOS/blob/staging/rpc/documentation/private_endpoints/createaccount.md
import { Client as OpenRPCClient } from "@open-rpc/client-js";

export interface Account {
    // An Aleo account private key
    privateKey: string;
    // An Aleo account address
    address: string;
    // An Aleo account view key
    viewKey: string;
}

export async function createAccount(
    rpcClient: OpenRPCClient
): Promise<Account> {
    const resp = await rpcClient.request({
        method: "createaccount",
        params: [],
    });

    return {
        privateKey: resp.private_key,
        address: resp.address,
        viewKey: resp.view_key,
    };
}
