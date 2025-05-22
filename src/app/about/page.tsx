import PageBannerSimple from '@/components/PageBannerSimple/pagebannersimple';
import styles from './about.module.css';

export default function AboutPage() {
    return (
        <div className={styles.page}>
            <PageBannerSimple
                currentPage="Про мене"
                title='тест'
                text='тест'
                image="/images/cataloge-banner.jpg"
            />

            <section className={styles.section}>
                <div className={styles.row}>
                    <h2 className={styles.title}>Про мене</h2>
                    <p className={styles.text}>
                        Ласка запрошую до світу вишуканих десертів та тортів, що народжуються з любов'ю!
                        <br /><br />
                        Я - Аліна, майстер, який протягом декількох років вдосконалює свої навички у
                        кондитерському мистецтві. Постійно покращую як теоретичну, так і практичну базу своїх вмінь.
                        <br /><br />
                        Від елегантних тортів на пам'ятні дати до казкових маленьких десертів, які прикрасять кожен Ваш день.
                        <br /><br />
                        Приєднуйтесь до цієї захоплюючої подорожі світом смаків та ароматів, де кожен торт розповідає свою історію,
                        а кожен шматочок — це радість та задоволення.
                    </p>
                </div>

                <div className={styles.stats}>
                    <div className={styles.statBlock}>
                        <p className={styles.number}>100+</p>
                        <p className={styles.label}>Клієнтів</p>
                    </div>
                    <div className={styles.statBlock}>
                        <p className={styles.number}>2023</p>
                        <p className={styles.label}>Рік заснування</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
