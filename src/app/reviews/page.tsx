'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './reviews.module.css'


interface Review {
    _id: string
    name: string
    text: string
    image: string
}

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([])

    useEffect(() => {
        fetch('/api/reviews')
            .then((res) => res.json())
            .then(setReviews)
    }, [])

    return (
        <div className={styles.container}>

            <div className={styles.grid}>
                {reviews.map((review) => (
                    <div key={review._id} className={styles.card}>
                        <Image
                            src={review.image}
                            alt={review.name}
                            width={300}
                            height={300}
                            className={styles.image}
                        />
                        <div className={styles.info}>
                            <h2>{review.name}</h2>
                            <p>{review.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}