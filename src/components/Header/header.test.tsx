import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
    it('рендерить логотип', () => {
        render(<Header />)
        const logo = screen.getAllByAltText('logo')[0]
        expect(logo).toBeInTheDocument()
    })

    it('відкриває і закриває мобільне меню', () => {
        render(<Header />)

        // Кнопка відкриття меню
        const openBtn = screen.getByRole('button', { name: /open main menu/i })
        fireEvent.click(openBtn)

        const closeBtn = screen.getByRole('button', { name: /close menu/i })
        expect(closeBtn).toBeInTheDocument()

        fireEvent.click(closeBtn)
        expect(screen.queryByRole('button', { name: /close menu/i })).toBeNull()
    })
})
