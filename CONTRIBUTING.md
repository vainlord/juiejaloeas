# Contributing to Bakehouse POS System

Thank you for considering contributing to this project! 🎉

## Development Workflow

1. **Fork & Clone**
   ```bash
   git clone https://github.com/vainlord/juiejaloeas.git
   cd juiejaloeas
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Quality Checks**
   
   Backend:
   ```bash
   cd backend
   composer test
   ./vendor/bin/phpstan analyse
   ```
   
   Frontend:
   ```bash
   cd frontend
   npm run lint
   npm run type-check
   npm run build
   ```

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```
   
   Use conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation
   - `style:` - Formatting
   - `refactor:` - Code restructuring
   - `test:` - Adding tests
   - `chore:` - Maintenance

6. **Push & Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   
   Then create a Pull Request on GitHub.

## Code Style

### PHP (Backend)
- Follow PSR-12 coding standard
- Use type hints
- Write descriptive method names
- Add PHPDoc blocks for public methods

### TypeScript (Frontend)
- Use TypeScript for all new files
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused

## Testing

- Write unit tests for business logic
- Add integration tests for API endpoints
- Test UI components with user interactions

## Questions?

Open an issue or reach out to the maintainers.

Happy coding! 🚀
