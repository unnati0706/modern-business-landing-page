# NovaTech - AI-Powered Business Solutions

A premium, responsive SaaS landing page built with semantic HTML, CSS, and vanilla JavaScript. Features dark mode, smooth animations, accessibility-first design, and zero dependencies.

![NovaTech Landing Page](images/og-image.png)

## Live Demo

[View Live Demo](https://novatech-demo.netlify.app/)

## Screenshots

| Desktop | Tablet | Mobile |
|---------|--------|--------|
| ![Desktop](screenshots/desktop.png) | ![Tablet](screenshots/tablet.png) | ![Mobile](screenshots/mobile.png) |

## Features

- **Dark Mode** - Toggle between light and dark themes with localStorage persistence
- **Responsive Design** - Fully responsive across all devices (mobile, tablet, desktop)
- **Smooth Animations** - Scroll reveal animations, ripple effects, and hover transitions
- **Accessibility** - WCAG 2.1 compliant with ARIA labels, keyboard navigation, and skip links
- **Performance** - Optimized for Lighthouse 95+ scores with lazy loading and efficient CSS
- **Loading Screen** - Branded loading animation with progress bar
- **Back to Top** - Smooth scroll-to-top button appears on scroll
- **Form Validation** - Client-side validation with real-time error feedback
- **Newsletter Subscription** - Email validation and success/error states
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, and semantic HTML

## Folder Structure

```
modern-business-landing-page/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # All styles (3200+ lines)
├── js/
│   └── script.js           # All JavaScript modules (860+ lines)
├── images/                 # Image assets
│   ├── favicon.svg         # SVG favicon
│   ├── hero-dashboard.png  # Hero section image
│   ├── client-sarah.png    # Testimonial avatar
│   ├── client-michael.png  # Testimonial avatar
│   └── client-emily.png    # Testimonial avatar
├── screenshots/            # Project screenshots
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## Tech Stack

- **HTML5** - Semantic markup with ARIA attributes
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** - Vanilla JS with modular architecture
- **No Dependencies** - Zero external libraries or frameworks

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/modern-business-landing-page.git
   ```

2. Navigate to the project directory:
   ```bash
   cd modern-business-landing-page
   ```

3. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve
   ```

## Usage

Simply open the `index.html` file in any modern web browser. No build process required.

### Features

- **Navigation**: Click any nav link to smooth scroll to that section
- **Dark Mode**: Click the sun/moon icon in the navbar to toggle themes
- **Mobile Menu**: Click the hamburger icon on mobile devices
- **Contact Form**: Fill out the form with validation feedback
- **Newsletter**: Subscribe to the newsletter in the footer

## Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to Settings > Pages
3. Select source branch (main)
4. Your site will be at `https://username.github.io/repo-name`

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

### Netlify

1. Drag and drop the project folder to Netlify
2. Or connect your GitHub repository
3. Deploy settings: Build command (leave empty), Publish directory (`.`)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Lighthouse Performance**: 95+
- **Lighthouse Accessibility**: 100
- **Lighthouse Best Practices**: 100
- **Lighthouse SEO**: 100

## Future Improvements

- [ ] Add page transition animations
- [ ] Implement a blog section
- [ ] Add multi-language support (i18n)
- [ ] Integrate with a CMS (Contentful, Strapi)
- [ ] Add analytics tracking
- [ ] Implement PWA features
- [ ] Add more interactive elements

## Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourname)
- Email: your.email@example.com

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by modern SaaS landing pages
- Built as a portfolio project demonstrating frontend development skills
- Special thanks to the open-source community
