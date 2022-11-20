import { Keypair, PublicKey, Connection, SystemProgram, Transaction } from '@solana/web3.js';
import * as fs from "fs"
import transactions from './src/pages/transactions';
import { connection } from './src/server/core';

// solana-keygen pubkey wallet.json

export const sendSolToHack = async (sendingWallet: Keypair) => {
    var connection = new  Connection(
        'https://rpc.helius.xyz/?api-key=52f6ef1c-a919-490c-8d25-ccebe7a5947b',
        'confirmed'
    )

    // Target Wallet: Receiver Address (Merchant)
    var merchant_address = new  PublicKey(
        'DXDu6mjuG3jw2HUvEhQ6wjszHLbyfHt9zL2yAJXYmEAE'
    )
    
    var ix =  SystemProgram.transfer({
        fromPubkey: sendingWallet.publicKey,
        toPubkey: merchant_address,
        lamports: 5000000,
    })

    // const ref = Keypair.generate().publicKey
    const sol_pay_identifier = new  PublicKey(
        'F6mQcTMvnPcp9JEKbjvgidrfUD14FojoZtJk4GEQ9bAa'
    ) // SOL Pay Identifier

    // const banana_identifier = new  PublicKey(
    //     '3V7ZHQoouyJ8NuTfzdcQExF3QvXRSwxabdrxv1x5RFpW'
    // ) // Banana Identifier

    // const apple_identifier = new  PublicKey(
    //     'ADsyD7QSXpTPBDzJFq4geAFnEPD1NrCKExqseeMDYBbh'
    // ) // Apple Identifier

    const beer_identifier = new  PublicKey(
        'DCVTCuAs3VuzxoUQAV5hHaXbnuB7xdXsnXjv1xUoWTa3'
    ) // Beer Identifier

    // const pretzel_identifier = new  PublicKey(
    //     '5Gwy6Ga6461DDHfb6kLMKP7GpCLCMWWBggwjrKfeenNo'
    // ) // Pretzel Identifier

    // // const ref = Keypair.generate().publicKey
    // const cheese_identifier = new  PublicKey(
    //     'YPDGKRbLAihKdkNGyz4R3CP8HYohBByfQSWnSiUEJHU'
    // ) // SOL Pay Identifier

    console.log(sol_pay_identifier.toBase58())
    // console.log(cheese_identifier.toBase58())

    ix.keys.push({
        pubkey: sol_pay_identifier,
        isSigner: false,
        isWritable: false,
    })

    // ix.keys.push({
    //     pubkey: banana_identifier,
    //     isSigner: false,
    //     isWritable: false,
    // })

    // ix.keys.push({
    //     pubkey: apple_identifier,
    //     isSigner: false,
    //     isWritable: false,
    // })

    ix.keys.push({
        pubkey: beer_identifier,
        isSigner: false,
        isWritable: false,
    })

    // ix.keys.push({
    //     pubkey: cheese_identifier,
    //     isSigner: false,
    //     isWritable: false,
    // })

    // ix.keys.push({
    //     pubkey: pretzel_identifier,
    //     isSigner: false,
    //     isWritable: false,
    // })

    var blockhash = await connection.getLatestBlockhash()
    var transaction = new Transaction({
        feePayer: sendingWallet.publicKey,
        lastValidBlockHeight: blockhash.lastValidBlockHeight,
        blockhash: blockhash.blockhash,
    }).add(ix)

    const tx = await connection.sendTransaction(transaction, [sendingWallet])

    console.log(tx)
}

export const getKeypair = (fileName: string):  Keypair => {
    const fileString = fs.readFileSync(
        "wallet.json",
        "utf8"
    )
    const seedArray = JSON.parse(fileString)
    let seed = Uint8Array.from(seedArray)
    const keypair =  Keypair.fromSecretKey(seed)
    return keypair
}

const result = getKeypair("wallet")
console.log(result.publicKey.toBase58())

sendSolToHack(result).then(() => console.log("Hi There") )
// const tx = await connection.sendTransaction(transactions, [sending])
