import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/hooks/useWallet";
import styles from "./styles.module.css";
import { useSmartContract } from "@/hooks/useSmartContract";

export default function VerifyNftSection() {
    const { walletAddress, switchNetwork } = useWallet();
    const { getNftcertContract, deployedNetworkData } = useSmartContract();

    const [error, setError] = useState("");
    const [isMinting, setIsMinting] = useState(false);
    const [studentAddress, setStudentAddress] = useState("");
    const [tokensOfOwner, setTokensOfOwner] = useState([]);
    const [tokenData, setTokenData] = useState([]);

    const baseUrl = "https://fuchsia-genetic-beaver-264.mypinata.cloud/ipfs/";

    useEffect(() => {
        const fetchTokenData = async () => {
            const NftcertContract = getNftcertContract();
            const data = await Promise.all(tokensOfOwner.map(async (tokenId) => {
                const uri = await NftcertContract.tokenURI(tokenId);
                const ipfsHash = uri.replace("ipfs://", "");
                const response = await fetch(`${baseUrl}${ipfsHash}`);
                const jsonData = await response.json();
                return { tokenId, ...jsonData };
            }));
            setTokenData(data);
        };

        if (tokensOfOwner.length > 0) {
            fetchTokenData();
        }
    }, [tokensOfOwner, getNftcertContract]);

    const handleSearchClick = async () => {
        setError("");
        const NftcertContract = getNftcertContract();
        console.log(NftcertContract);
        try {
            setIsMinting(true);
            await switchNetwork(deployedNetworkData.chainId);

            const proxyResult = await NftcertContract.tokensOfOwner(studentAddress);
            setTokensOfOwner(proxyResult);
            
            setStudentAddress("");

        } catch (error) {
            console.error(error);
            setError("Failed to fetch NFT Certificateso of the student address provided");
        } finally {
            setIsMinting(false);
        }
    }

    return (
        <div className={styles.verifyNftSection}>
            <h1 className={styles.verifyNftSectionTitle}>Check student NFTs</h1>      
            <form className={styles.mintForm} onSubmit={(e) => {
                e.preventDefault();
                handleSearchClick();
            }}>
                <input type="text" className={styles.input} placeholder="Student address" onChange={(e) => setStudentAddress(e.target.value)} value={studentAddress}/>
                <button type="submit"  className={styles.btn}>Search</button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            {tokenData && tokenData.length > 0 && (
                <div>
                    <h2>Student Certificates:</h2>
                    <div className={styles.NftcertsContainer}>
                        {tokenData.map((data, index) => (
                            <div key={index} className={styles.NftcertContainer}>
                                <img src={baseUrl+data.image.replace("ipfs://", "")} alt="" />
                                <p className={styles.nftDataText}>Name: {data.name}</p>
                                <p className={styles.nftDataText}>Student name: {data.attributes[0].value}</p>
                                <p className={styles.nftDataText}>Score: {data.attributes[1].value}</p>
                                <p className={styles.nftDataText}>Aquisition date: {data.attributes[2].value}</p>
                                <p className={styles.nftDataText}>Description: {data.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
