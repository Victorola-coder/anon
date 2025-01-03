# Anon - v1.0

## Description

Anon is a modern web application designed for anonymous messaging and interactions. The platform enables users to create personalized inboxes where they can receive anonymous messages, create polls, and engage with daily prompts. Built with Next.js and TypeScript, the application emphasizes privacy while delivering a smooth user experience.

### Key Features

- Anonymous messaging system with temporary message options
- Interactive polls and themed prompts
- Customizable user profiles and inboxes
- Dark mode with custom color theming
- Progressive Web App (PWA) capabilities
- Responsive design optimized for all devices

## Contribution Rules and Setup

### Contribution Guidelines

1. **Code Structure**:

   - Follow the established directory structure:
     - `(auth)` - Authentication related components
     - `(dashboard)` - Protected dashboard routes
     - `components` - Reusable UI components
     - `lib` - Utilities and configurations
   - Maintain clear separation between components, pages, and utilities

2. **Naming Conventions**:

   - Use PascalCase for component names
   - Use smallcase for general file naming
   - Use camelCase for variables and some file names
   - Ensure file names clearly reflect their purpose

3. **Styling**:

   - Use Tailwind CSS exclusively for styling
   - Follow the custom color scheme:
     - Background: `#0a192f` (Dark Navy)
     - Primary Accent: `#64ffda` (Teal)
     - Text Primary: `#ccd6f6` (Light Lavender)
     - Text Secondary: `#8892b0` (Muted Blue-gray)
   - Maintain consistent spacing and component styling

4. **Documentation**:

   - Add JSDoc comments for component props and complex functions
   - Keep the README updated with new features or configuration changes
   - Document any new environment variables or dependencies

5. **Testing**:

   - Write unit tests using Jest and React Testing Library
   - Ensure all tests pass before submitting pull requests
   - Include test cases for error handling and edge cases

6. **Version Control**:

   - Use descriptive commit messages
   - Keep pull requests focused and concise
   - Resolve conflicts before requesting reviews

7. **Communication**:

   - Discuss major changes with the team before implementation
   - Document breaking changes clearly
   - Keep pull request discussions professional and constructive

8. **Design Implementation**:
   - Pay attention to spacing, typography, and animations
   - Ensure responsive behavior matches design specifications
   - Follow the pattern already, i created a good amount of resuable components around.

### Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/victorola-coder/anon.git
   cd anon
   ```

2. **Install Dependencies**:

   ```bash
   bun install
   ```

3. **Environment Setup**:
   Create a `.env.local` file with the following variables:

   ```env
        ENV
   ```

4. **Development Server**:

   ```bash
   bun dev
   ```

5. **Build for Production**:

   ```bash
   bun build
   ```

6. **Type Checking**:

   ```bash
   bun type-check
   ```

7. **Linting**:
   ```bash
   bun lint
   ```

### Tech Stack

- **Icons**: Lucide
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Font**: Montserrat (Google Fonts)
- **Framework**: Next.js 15 (App Router)

By following these guidelines, we ensure that the Anon project maintains its high standards of code quality and user experience. Thank you for contributing!
