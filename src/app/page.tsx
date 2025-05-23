import PageBanner from '@/components/PageBanner/pagebannner';

export default function Home() {
  return (
    <div className="">
      <PageBanner />
    </div>
  );
}
//тестова помилка
/*
'use client'
import * as Sentry from '@sentry/nextjs'

export default function Home() {
    const throwError = () => {
        throw new Error('Тестова помилка для Sentry')
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Головна сторінка</h1>
            <button
                onClick={throwError}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
                Згенерувати помилку
            </button>
        </div>
    )
}
*/
