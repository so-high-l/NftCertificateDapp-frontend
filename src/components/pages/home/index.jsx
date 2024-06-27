import { useState } from "react";
import WalletSection from "./wallet-section";
import styles from "./styles.module.css";
import { useWallet } from "@/hooks/useWallet";
import InfoSection from "./info-section";
import MintSection from "./mint-section";
import VerifyNftSection from "./verifyNft-section";

export default function Home() {
    const { walletConnectionStatus } = useWallet();

    const [verifyNftTabActive, setVerifyNftTabActive] = useState(false);
    return (
        <div className={styles.home}>
            <section  className={styles.col1}>
            <WalletSection  />

            {
                walletConnectionStatus === 'connected' ?
                (
                    <div>
                        <button onClick={()=> {setVerifyNftTabActive(false)}} className={styles.navBtn} >Mint NFTs</button>
                        <button onClick={()=> {setVerifyNftTabActive(true)}} className={styles.navBtn} >Verify NFTs</button>
                    </div>
                ) : (
                    null
                )
            }
            </section>

            <section  className={styles.col2}>
                {walletConnectionStatus === "connected"
                    ? 
                        !verifyNftTabActive ? <MintSection /> : <VerifyNftSection />
                    
                    : <InfoSection />
                }
            </section>
        </div>
    )
}
