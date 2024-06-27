import styles from "./styles.module.css";

export default function InfoSection() {
    return (
        <div className={styles.infoSection}>
            <div className={styles.infoSectionInner}>
                <h2 className={styles.heading}>
                    Important Information for Developers
                </h2>

                <hr className={styles.divider} />

                <ul className={styles.list}>
                    {/** Blockchain running */}
                    <li className={styles.listItem}>
                        <h3 className={styles.heading}>
                            1. Test net blockchain
                        </h3>

                        <p className={styles.text}>
                            The smart contract is deployed to the Amoy and zkEVM testnets at address <u>0xaD657dd1c0D298fB2eEE157A297c398F45b35023</u>.
                        </p>
                    </li>

                    {/** Frontend running */}
                    <li className={styles.listItem}>
                        <h3 className={styles.heading}>
                            2. This UI is for test only 
                        </h3>

                        <p className={styles.text}>
                            The mint functionnality should be restricted and called from the backend of Hire3 app and should be callable by the owner only.
                            The owner can issue NFT certificates to students without their intercation. (As for now, can be changed later...) 
                        </p>
                    </li>

                    {/** Modify Frontend */}
                    <li className={styles.listItem}>
                        <h3 className={styles.heading}>
                            3. Modifying frontend
                        </h3>

                        <p className={styles.text}>
                            To start modifying the frontend, edit <code>./frontend/src/pages/index.tsx</code>.
                        </p>
                    </li>

                   
                </ul>
            </div>
        </div>
    )
}
