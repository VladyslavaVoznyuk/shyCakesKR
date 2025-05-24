import { render, screen } from '@testing-library/react';
import PageBannerSimple from './PageBannerSimple';

test('рендерить PageBannerSimple з правильним контентом', () => {
    const props = {
        currentPage: 'test',
        title: 'Test Title',
        text: 'Test text',
        image: '/test-image.jpg',
    };

    render(<PageBannerSimple {...props} />);

    const img = screen.getByAltText('Page Banner') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    // Перевіряємо, що в src є наш шлях, враховуючи кодування URL
    expect(img.src).toContain(encodeURIComponent(props.image));
});
