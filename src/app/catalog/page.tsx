import PageBannerSimple from '@/components/PageBannerSimple/pagebannersimple';
import Image from 'next/image';
import Link from 'next/link';
import styles from './catalog.module.css';

const products = [
    {
        title: 'Мусові торти',
        image: '/images/portfolio/portfolio-16.png',
        link: '/products/mousse',
    },
    {
        title: 'Бісквітні торти',
        image: '/images/portfolio/portfolio-4.jpg',
        link: '/products/sponge',
    },
    {
        title: 'Macarons',
        image: '/images/portfolio/portfolio-3.jpg',
        link: '/products/macarons',
    },
    {
        title: 'Cake-pops',
        image: '/images/portfolio/portfolio-14.png',
        link: '/products/cupcakes',
    },
    {
        title: 'Тістечка',
        image: '/images/portfolio/portfolio-9.jpg',
        link: '/products/pastries',
    },
    {
        title: 'Подарункові набори',
        image: '/images/portfolio/portfolio-13.png',
        link: '/products/kids',
    },
];

export default function CatalogPage() {
    return (
        <div>
            <PageBannerSimple
                currentPage="Каталог"
                title="Каталог"
                text="У нашому каталозі ви знайдете мусові та бісквітні торти на будь-який смак — від ніжної класики до креативних новинок. Також пропонуємо кейк попси, ескімо-десерти та яскраві макаронси — ідеальні для свят чи подарунків. Обирайте серед готових подарункових наборів або створіть власний солодкий мікс!"
                image="/images/cataloge-banner.jpg"
            />

            <section className={styles.catalog}>
                {products.map((product) => (
                    <div key={product.title} className={styles.card}>
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={500}
                            height={500}
                            className={styles.image}
                        />
                        <h2>{product.title}</h2>
                        <Link href={product.link} className={styles.button}>
                            Перейти
                        </Link>
                    </div>
                ))}
            </section>
        </div>
    );
}
