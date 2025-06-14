import styles from './style.module.css'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Next App",
  description: "Generated by about next app",
};

export default function AboutLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
      <nav>About NavBar</nav>
      <main className={styles.main}>
        {children}
      </main>
      </>
    );
}