'use client';
import PageBannerSimple from '@/components/PageBannerSimple/pagebannersimple';
import Image from 'next/image';
import Link from 'next/link';
import styles from './catalog.module.css';
import useProducts from '@/hooks/useProducts';

export default function CatalogPage() {
    const products = useProducts();

    return (
        <div>
            <PageBannerSimple
                currentPage="Каталог"
                title="Каталог"
                text="У нашому каталозі ви знайдете мусові та бісквітні торти на будь-який смак..."
                image="/images/cataloge-banner.jpg"
            />
            <section className={styles.catalog}>
                {products.map((product: any) => (
                    <div key={product._id} className={styles.card}>
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={500}
                            height={500}
                            className={styles.image}
                        />
                        <h2>{product.title}</h2>
                        <Link href={`/products/${product.slug}`} className={styles.button}>
                            Перейти
                        </Link>

                    </div>
                ))}
            </section>
        </div>
    );
}
