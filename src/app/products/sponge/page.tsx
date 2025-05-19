'use client';
import Image from 'next/image';
import styles from './product.module.css';
import Link from "next/link";

export default function SpongeProductPage() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>Бісквітні торти</h1>
            <div className={styles.product}>
                <Image
                    src="/public/images/portfolio/portfolio-16.png"
                    alt="Шоко"
                    width={500}
                    height={500}
                    className={styles.image}
                />
                <div className={styles.info}>
                    <h2>Три шоколади</h2>
                    <p>Шоколадно-кавові бісквіти, крем-чіз з вершками, шматочки банану, солодка карамель.</p>
                    <p className={styles.price}>730 ₴ / кг</p>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link href="/auth" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Замовити
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
