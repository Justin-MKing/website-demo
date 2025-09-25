# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a modern, responsive portfolio website for Justin Michael King, an ML/AI Data Operator. The project is built with vanilla HTML5, CSS3, and JavaScript (ES6+), featuring animated backgrounds, smooth interactions, and mobile-first design.

## Architecture

### Frontend-Only Architecture
- **Single Page Application (SPA)**: Pure client-side implementation with no backend dependencies
- **Static Site**: Can be served directly from any web server or CDN
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with interactive features

### File Structure
```
website-demo/
├── index.html          # Main HTML file with semantic structure
├── css/
│   └── style.css       # Complete styling with CSS Grid, Flexbox, animations
├── js/
│   └── script.js       # All interactive functionality and animations
├── assets/             # Static assets (currently empty - ready for images)
└── README.md          # Comprehensive project documentation
```

### Core Components
1. **Navigation System**: Responsive navbar with mobile hamburger menu and smooth scrolling
2. **Hero Section**: Animated typing effect, social links, call-to-action buttons
3. **About Section**: Statistics counters with intersection observer animations
4. **Skills Section**: Animated progress bars triggered by scroll position
5. **Projects Section**: Card-based layout showcasing ML/AI projects
6. **Contact Section**: Functional form with client-side validation and notification system
7. **Background Animation**: Complex floating elements with parallax effects

### Key Features
- **Responsive Design**: Mobile-first approach with breakpoints at 480px, 768px, 1200px
- **Performance Optimized**: Intersection observers, throttled scroll events, lazy loading ready
- **Accessibility**: WCAG compliant with keyboard navigation and focus management
- **Animation System**: CSS-based animations with JavaScript triggers for optimal performance

## Development Commands

### Local Development
```bash
# Serve the website locally (use any method)
# Option 1: Python built-in server
python -m http.server 8000

# Option 2: Node.js http-server (if installed)
npx http-server -p 8000

# Option 3: Live Server extension in VSCode
# Right-click index.html -> "Open with Live Server"

# Option 4: Simply open in browser
start index.html  # Windows
open index.html   # macOS
```

### Testing and Validation
```bash
# Validate HTML (if html5validator is installed)
html5validator index.html

# Check CSS with stylelint (if configured)
stylelint css/style.css

# Run lighthouse for performance testing
lighthouse http://localhost:8000 --output html --output-path report.html
```

### Build and Deployment
```bash
# No build process required - static files ready for deployment
# Copy all files to your web server or deploy to:

# GitHub Pages - just push to gh-pages branch or enable Pages in settings
# Netlify - drag and drop the entire folder
# Vercel - import from GitHub repository

# For manual deployment, ensure these files are uploaded:
# - index.html (entry point)
# - css/style.css (all styles)
# - js/script.js (all functionality)
# - Any files in assets/ directory
```

## Code Patterns and Conventions

### CSS Architecture
- **CSS Custom Properties**: All colors and key values defined in `:root` for easy theming
- **Component-Based**: Each section has its own CSS block with prefixed classes
- **Mobile-First**: All media queries use `min-width` approach
- **Performance**: Hardware-accelerated animations using `transform` and `opacity`

### JavaScript Patterns
- **Event Delegation**: Efficient event handling for dynamic content
- **Intersection Observer**: Modern API for scroll-triggered animations instead of scroll listeners
- **Throttled Events**: Performance optimization for scroll and resize events
- **Modular Functions**: Each feature is encapsulated in its own function
- **Progressive Enhancement**: All features degrade gracefully if JavaScript fails

### Customization Guidelines
- **Personal Information**: Update content in `index.html` sections
- **Styling**: Modify CSS custom properties in `:root` for theme changes
- **Projects**: Update project data in `loadGitHubProjects()` function
- **Contact Integration**: Replace form handling in `contact-form` event listener

## Key Dependencies

### External Resources
- **Font Awesome 6.0.0**: Icon library loaded from CDN
- **Google Fonts (Poppins)**: Typography with weights 300, 400, 600, 700
- **No JavaScript Libraries**: Pure vanilla JS implementation

### Browser Support
- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Features Used**: CSS Grid, Flexbox, Intersection Observer, ES6+ syntax
- **Fallbacks**: Graceful degradation for older browsers

## Contact Form Integration

The contact form currently includes client-side validation and UI feedback. To make it functional:

### Options for Form Handling
1. **EmailJS**: Client-side email sending service
2. **Formspree**: Simple form handling with email notifications
3. **Netlify Forms**: Built-in form handling if hosted on Netlify
4. **Custom Backend**: Integrate with your own API endpoint

### Current Form Features
- Client-side validation for required fields and email format
- Success/error notification system
- Form reset after successful submission
- Accessible form structure with proper labels

## Performance Considerations

### Optimization Features
- **Critical Resource Preloading**: Fonts and icons preloaded for faster rendering
- **Throttled Scroll Events**: Prevents performance issues during scrolling
- **Intersection Observer**: Efficient animation triggering without constant scroll listeners
- **CSS Animations**: Hardware-accelerated transforms for smooth animations
- **Lazy Loading Ready**: Image observer implemented for future image assets

### Accessibility Features
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Focus Management**: Proper focus handling for mobile menu
- **Screen Reader Support**: ARIA labels and semantic structure
- **Color Contrast**: High contrast design following WCAG guidelines

## Future Enhancement Areas

### Planned Features (from README)
- Dark mode toggle implementation
- Blog section integration
- GitHub API integration for dynamic project loading
- Service Worker for PWA capabilities
- SEO optimization improvements
- Performance monitoring dashboard

### Development Tips
- Use browser dev tools for testing responsive design
- Test animations on lower-end devices for performance
- Validate accessibility with screen reader testing
- Monitor performance with Lighthouse audits
- Test form functionality with various input scenarios