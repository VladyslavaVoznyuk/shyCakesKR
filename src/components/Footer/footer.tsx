import Image from "next/image";


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-white border-t border-gray-300">
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="grid grid-cols-1 gap-18 lg:grid-cols-3">
            <div>
              <div className="text-teal-600 flex align-bottom">
                <Image src="/images/logo-big.png" width={220} height={220} alt='logo' />
              </div>

              <p className="mt-8 text-xl font-bold text-[#000]">
                Щоб звя`затись зі мною
              </p>

              <ul className="mt-8 flex gap-6">
                <a href="https://www.instagram.com/shy__cakes/" target='_blank' rel="noreferrer">
                  <span className="sr-only">Instagram</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#90e0ef" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                  </svg>
                </a>
                <a href="https://t.me/elin_pak" target='_blank' rel="noreferrer">
                  <span className="sr-only">Telegram</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#90e0ef" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                  </svg>
                </a>
                <a href="tel:+380 63 678 7525" target='_blank' rel="noreferrer">
                  <span className="sr-only">Telephon</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#90e0ef" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                  </svg>
                </a>

              </ul>
            </div>

            <div className="w-full grid gap-1 grid-cols-1 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3 text-center">
              <div>
                <p className="text-xl font-bold text-[#90e0ef]">Каталог</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a href="/mousse-cakes/" className="text-gray-700 transition hover:opacity-75"> Мусові торти </a>
                  </li>

                  <li>
                    <a href="/biscuit-cakes/" className="text-gray-700 transition hover:opacity-75"> Бісквітні торти </a>
                  </li>

                  <li>
                    <a href="/macarons/" className="text-gray-700 transition hover:opacity-75"> Macarons </a>
                  </li>

                  <li>
                    <a href="/eskimo/" className="text-gray-700 transition hover:opacity-75"> Ескімо </a>
                  </li>

                  <li>
                    <a href="/cake-pops/" className="text-gray-700 transition hover:opacity-75"> Cake-pops </a>
                  </li>

                  <li>
                    <a href="/gift-sets/" className="text-gray-700 transition hover:opacity-75"> Подарункові набори </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xl font-bold text-[#90e0ef]">Інформація</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Про мене </a>
                  </li>

                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Оплата та доставка </a>
                  </li>

                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Контакти </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xl font-bold text-[#90e0ef]">Shy Cakes</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Каталог </a>
                  </li>

                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Відгуки </a>
                  </li>

                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Портфоліо </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-500 pt-[25px]">&copy; {currentYear} Shy Cakes. Всі права захищені</p>
        </div>
      </footer>
    </>
  )
}