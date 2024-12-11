let provider;
let signer;

// Connect to MetaMask
document.getElementById("connectWallet").addEventListener("click", async () => {
    if (!window.ethereum) {
        alert("MetaMask is not installed. Please install it to use this DApp.");
        return;
    }

    provider = new ethers.BrowserProvider(window.ethereum);

    try {
        const accounts = await provider.send("eth_requestAccounts", []);
        const account = accounts[0];

        // Await the signer initialization
        signer = await provider.getSigner();

        console.log("Signer initialized:", signer);

        document.getElementById("accountInfo").textContent = `Connected Account: ${account}`;
        const balance = await provider.getBalance(account);
        document.getElementById("balance").textContent = `Balance: ${ethers.formatEther(balance)} ETH`;
    } catch (error) {
        console.error(error);
        alert("Failed to connect wallet!");
    }
});

//SendETH
document.getElementById("sendETH").addEventListener("click", async () => {
    if (!signer) {
        alert("Please connect your wallet first.");
        return;
    }

    const recipient = document.getElementById("recipient").value;
    const amount = document.getElementById("amount").value;

    if (!recipient || !amount) {
        alert("Please fill in all fields.");
        return;
    }

    if (!ethers.isAddress(recipient)) {
        alert("Invalid recipient address!");
        return;
    }

    if (parseFloat(amount) <= 0) {
        alert("Amount must be greater than zero!");
        return;
    }

    try {
        const signerAddress = await signer.getAddress(); // Get the signer's address
        const balance = await provider.getBalance(signerAddress); // Fetch the balance as a bigint

        const feeData = await provider.getFeeData();
        const gasPrice = feeData.gasPrice; // Current gas price as a bigint
        const valueInWei = ethers.parseEther(amount); // Parse ETH to Wei as a bigint
        const gasLimit = 21000n; // Gas limit as a bigint

        // Calculate the total cost (value + gas fee) using bigint arithmetic
        const totalCost = valueInWei + (gasPrice * gasLimit);

        if (balance < totalCost) {
            alert("Insufficient funds to cover the transaction and gas fees.");
            return;
        }

        // Indicate transaction is being sent
        document.getElementById("status").textContent = "Transaction pending...";

        // Send the transaction
        const tx = await signer.sendTransaction({
            to: recipient,
            value: valueInWei,
            gasLimit: Number(gasLimit), // Convert bigint to a regular number
        });

        console.log("Transaction sent:", tx);
        document.getElementById("status").textContent = `Transaction sent! Hash: ${tx.hash}`;

        await tx.wait(); // Wait for confirmation
        document.getElementById("status").textContent = "Transaction confirmed!";
    } catch (error) {
        console.error("Transaction failed:", error);
        alert(`Transaction failed: ${error.reason || error.message}`);
    }

});
