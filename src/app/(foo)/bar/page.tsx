import styles from './page.module.css';

export default function Page() {
    return <>
        <h2 className={styles.foo}>bar</h2>
        <p>urlは、http://localhost:3000/bar</p>
    </>;
}