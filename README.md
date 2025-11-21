# Md. Asif - Portfolio & Personal Website

Welcome to my professional portfolio and personal website built with cutting-edge web technologies. This is a fully-featured, high-performance web application showcasing my expertise as a Frontend & Full-Stack Developer.

## 🎯 About

I'm **Md. Asif**, a Frontend & Full-Stack Software Engineer with 5+ years of experience specializing in:

- **React.js & Next.js** - Building modern, performant web applications
- **TypeScript** - Type-safe JavaScript development
- **Full-Stack Development** - From UI to backend APIs
- **Web Performance** - Optimizing for speed and user experience
- **UI/UX Development** - Creating beautiful, accessible interfaces
- **REST & GraphQL APIs** - Building and integrating APIs
- **AWS & DevOps** - Cloud deployment and CI/CD pipelines

### Portfolio Highlights

- **Website**: [muhammadasif.me](https://muhammadasif.me)
- **Expertise**: Frontend Development, Full-Stack Solutions, Web Performance Optimization
- **Focus Areas**: React, Next.js, TypeScript, Tailwind CSS, GSAP Animations, and Modern Web Standards

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (v9 or higher) - Used as the package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mdasif-me/mdasif.git
cd mdasif
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables (if needed):

```bash
cp .env.example .env.local
```

### Development

Run the development server with Turbopack for faster builds:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

The application auto-updates as you edit files. Start by modifying `src/app/page.tsx`.

### Production Build

```bash
pnpm build
pnpm start
```

### Other Commands

- **Format Code**: `pnpm format` - Formats code using Prettier
- **Lint**: `pnpm lint` - Run ESLint to check code quality
- **Build Check**: `pnpm build:check` - Run Prettier check and build

## 🏗️ Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout with navigation, reviews, FAQ, and contact
│   ├── page.tsx      # Home page
│   ├── about/        # About page
│   ├── contact/      # Contact page
│   ├── projects/     # Projects portfolio
│   └── services/     # Services page
├── components/       # Reusable React components
│   ├── ui/           # Base UI components (buttons, carousels, etc.)
│   ├── navigation/   # Navigation components
│   └── constants/    # Component-related constants
├── features/         # Feature-specific components and logic
│   ├── about/        # About section components
│   ├── contact/      # Contact form and social links
│   ├── experiences/  # Work experience timeline
│   ├── faq/          # FAQ section
│   ├── home/         # Home page hero and sections
│   ├── projects/     # Projects showcase
│   ├── reviews/      # Client reviews/testimonials
│   └── services/     # Services showcase
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── styles/           # Global and module CSS
├── types/            # TypeScript type definitions
└── utils/            # Helper utilities
config/               # Site configuration and metadata
```

## 🛠️ Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Advanced animations
- **Motion** - Framer Motion animations
- **Embla Carousel** - Carousel component

### Styling & UI

- **Tailwind CSS v4** - Modern utility CSS
- **PostCSS** - CSS transformation
- **Radix UI** - Headless UI components
- **CVA (Class Variance Authority)** - Component variants

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Lint-staged** - Stage file linting
- **TypeScript** - Type checking

## 📱 Features

- ✨ **Modern Design** - Beautiful, responsive UI with smooth animations
- ⚡ **High Performance** - Optimized with Turbopack for faster builds
- 🔍 **SEO Optimized** - Comprehensive metadata and structured data
- 📱 **Responsive Design** - Works seamlessly on all devices
- ♿ **Accessibility** - Built with a11y best practices
- 🎨 **Smooth Animations** - GSAP and Motion animations
- 📊 **Sections Include**:
  - Hero section with animated title
  - About/Bio section
  - Services showcase
  - Portfolio/Projects display
  - Work experiences timeline
  - Client reviews/testimonials
  - FAQ section
  - Contact form and social links

## 🔍 SEO & Metadata

The site includes comprehensive SEO configuration:

- Metadata for all pages (home, about, services, projects)
- Open Graph tags for social sharing
- Twitter Card integration
- Structured data markup
- Sitemap and robots.txt
- Google and Bing site verification

## 🌐 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel Platform](https://vercel.com) from the Next.js creators:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Your site will be live after deployment

For more details, check [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

### Other Platforms

You can also deploy to:

- **Netlify** - Supports Next.js
- **AWS Amplify** - Full AWS integration
- **Docker** - Containerized deployment

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
NEXT_PUBLIC_CONTACT_PHONE=+1234567890
```

## 🚀 Performance Optimizations

- **Image Optimization** - Automatic WebP/AVIF format conversion
- **Code Splitting** - Automatic route-based splitting
- **CSS Optimization** - Tailwind CSS purging unused styles
- **Font Optimization** - Using next/font for Google Fonts
- **Caching** - Strategic HTTP caching headers
- **Security Headers** - CSP, X-Frame-Options, etc.

## 🤝 Contributing

This is a personal portfolio project. While contributions are not expected, feedback and suggestions are always welcome!

## 📞 Contact

- **Email**: contact@muhammadasif.me
- **Website**: [muhammadasif.me](https://muhammadasif.me)
- **GitHub**: [@mdasif-me](https://github.com/mdasif-me)
- **Twitter**: [@mdasif-me](https://twitter.com/mdasif-me)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com) - For utility-first CSS
- [GSAP](https://greensock.com/gsap/) - For professional animations
- [Vercel](https://vercel.com) - For deployment platform
- All open-source libraries and communities that made this possible

---

**Built with ❤️ by Md. Asif**
