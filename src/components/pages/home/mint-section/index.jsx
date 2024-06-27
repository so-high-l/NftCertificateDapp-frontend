import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/hooks/useWallet";

import styles from "./styles.module.css";
import { useSmartContract } from "@/hooks/useSmartContract";

export default function MintSection() {
    const { walletAddress, switchNetwork } = useWallet();
    const { getNftcertContract, deployedNetworkData } = useSmartContract();

    const [error, setError] = useState("");
    const [isMinting, setIsMinting] = useState(false);
    const [studentAddress, setStudentAddress] = useState("");
    const [studentNFTUri, setStudentNFTUri] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    /**
     * @description Handles minting NFT 
     */
    const onSend = async () => {
        setError("");
        const NftcertContract = getNftcertContract();
        try {
            setIsMinting(true);
            switchNetwork(deployedNetworkData.chainId);
            await (await NftcertContract.createCertificate(studentAddress, studentNFTUri)).wait();

            setStudentAddress("");
            setStudentNFTUri("");
            setError("NFT minted successfully");

        } catch (error) {
            console.error(error);
            setError("Failed to mint NFT");
        } finally {
            setIsMinting(false);
            setShowPopup(false);
        }
    }

    const handleMintClick = () => {
        setShowPopup(true);
    }

    const handleConfirmMint = () => {
        setShowPopup(false);
        onSend();
    }

    const handleCancelMint = () => {
        setShowPopup(false);
    }

    return (
        <div className={styles.mintSection}>
            <h1 className={styles.mintSectionTitle}>Mint NFT for student</h1>
            <form className={styles.mintForm} onSubmit={(e) => {
                e.preventDefault();
                handleMintClick();
            }}>
                <input 
                    className={styles.input}
                    type="text" 
                    placeholder="Student address. Exp: 0x0xeEA1Afbd4FC2Ec3D32fe68B30b1664A6BF0A6fE9"  
                    onChange={(e) => setStudentAddress(e.target.value)} disabled={isMinting}
                />
                <input 
                    className={styles.input}
                    type="text" 
                    placeholder="Student certificate IPFS URI. Exp: ipfs://QmS1Tcv3mnykBTYwUz2hAcCjvummqSZZ7a44fET4QvJrv7"
                    onChange={(e) => setStudentNFTUri(e.target.value)} disabled={isMinting}
                />
                <button type="submit" className={styles.btn} disabled={!studentAddress || !studentNFTUri || isMinting}>
                    Mint
                </button>
            </form>
            <pre className={styles.error}>
                {error}
            </pre>
            {showPopup && (
                <div className={styles.mask} onClick={handleCancelMint}></div>
            )}
            {showPopup && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <h2>Mint NFT Confirmation</h2>
                        <p>We are now minting an NFT to the address: <br /><br /> <strong>{studentAddress}</strong></p>
                        <p>With NFT metadata: <strong>{studentNFTUri}</strong></p>
                        <div className={styles.btns}>
                            <button className={styles.btn} onClick={handleConfirmMint}>Confirm</button>
                            <button className={styles.cancelBtn} onClick={handleCancelMint}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
