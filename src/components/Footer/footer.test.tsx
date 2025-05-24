import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('рендерить основні секції', () => {
    render(<Footer />);
    const catalogs = screen.getAllByText('Каталог');
    expect(catalogs.length).toBeGreaterThan(0);
    expect(screen.getByText('Інформація')).toBeInTheDocument();
    expect(screen.getByText('Shy Cakes')).toBeInTheDocument();
});
