'use client';
import { useEffect, useState } from 'react';
import styles from './checkout.module.css';

export default function CheckoutPage() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(storedCart);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Замовлення:', { ...formData, cartItems });
        alert('Замовлення відправлено!');
        localStorage.removeItem('cart');
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Ваше замовлення</h1>

            <div className={styles.orderList}>
                {cartItems.map((item, idx) => (
                    <div key={idx} className={styles.item}>
                        <img src={item.image} alt={item.name} className={styles.img} />
                        <div>
                            <strong>{item.name}</strong>
                            <div>Кількість: {item.quantity}</div>
                            <div>Ціна: {item.price * item.quantity} грн</div>
                        </div>
                    </div>
                ))}
                <div className={styles.total}>Сума: {totalPrice} грн</div>
            </div>

            <p className={styles.note}>
                <strong>ВАЖЛИВО!</strong> Замовлення на цілі торти приймаємо за 48 або 72 години до потрібної дати. Якщо ви обрали доставку кур’єром, будь ласка, перевірте <a href="https://www.google.com/maps" target="_blank">на цій карті</a> зону доставки.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
                <label>Ваше ім’я та прізвище</label>
                <input type="text" name="name" required onChange={handleChange} />

                <label>Ваша електронна пошта</label>
                <input type="email" name="email" required onChange={handleChange} />

                <label>Ваш номер телефону</label>
                <input type="tel" name="phone" required onChange={handleChange} />

                <button type="submit">Оформити замовлення</button>
            </form>
        </div>
    );
}
