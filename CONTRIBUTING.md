# Contributing to VDeadline 🤝

Thank you for your interest in contributing to VDeadline! This document provides guidelines and instructions for contributing to the project.

## 🌟 Ways to Contribute

### 1. **Add Conference Data** 📊
- Add new conferences, workshops, or journals
- Update existing conference information
- Fix incorrect deadlines or details

### 2. **Improve Features** ⚡
- Enhance user interface and experience
- Add new filtering or search capabilities
- Improve performance and accessibility

### 3. **Fix Bugs** 🐛
- Report and fix issues
- Improve error handling
- Enhance cross-browser compatibility

### 4. **Documentation** 📚
- Improve README and documentation
- Add code comments
- Create tutorials or guides

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git
- A GitHub account

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/VDEADLINE.git
   cd VDEADLINE
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/vunifyLTD/VDEADLINE.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Verify setup**
   - Open http://localhost:5173
   - Ensure the site loads correctly

## 📊 Adding Conference Data

### File Structure
Conference data is organized by research area in `src/data/2025/`:

```
src/data/2025/
├── ai.json          # AI/ML conferences
├── systems.json     # Systems conferences
├── software.json    # Software engineering
├── theory.json      # Theoretical CS
├── hci.json         # Human-Computer Interaction
├── data.json        # Data management
├── security.json    # Security & privacy
├── graphics.json    # Computer graphics
├── bio.json         # Bioinformatics
├── robotics.json    # Robotics
└── quantum.json     # Quantum computing
```

### Conference Data Format

```typescript
{
  "id": "unique-conference-id",
  "name": "Full Conference Name",
  "acronym": "CONF",
  "deadline": "2025-03-15T23:59:59.000Z",
  "date": "2025-07-15 to 2025-07-18",
  "location": "City, Country",
  "website": "https://conference-website.org",
  "areas": ["Research Area 1", "Research Area 2"],
  "description": "Brief description of the conference",
  "paperSubmission": "2025-03-15",
  "notificationDate": "2025-05-20",
  "finalVersion": "2025-06-15",
  "ranking": "A*",
  "proceedings": "ACM",
  "year": 2025,
  "cycle": "2025",
  "categories": ["category-id"],
  "subcategories": ["subcategory-id"],
  "type": "conference"
}
```

### Required Fields
- `id` - Unique identifier (format: `area-number`, e.g., `ai-1`)
- `name` - Full conference name
- `acronym` - Conference abbreviation
- `deadline` - Submission deadline in ISO format
- `website` - Official conference website
- `categories` - Array of category IDs
- `subcategories` - Array of subcategory IDs
- `type` - One of: `conference`, `workshop`, `journal`

### Optional Fields
- `date` - Conference dates (format: "YYYY-MM-DD to YYYY-MM-DD")
- `location` - Conference location
- `areas` - Research areas covered
- `description` - Brief description
- `paperSubmission` - Paper submission deadline
- `notificationDate` - Notification date
- `finalVersion` - Camera-ready deadline
- `ranking` - Conference ranking (A*, A, B, C)
- `proceedings` - Where proceedings are published
- `year` - Conference year
- `cycle` - Submission cycle information

### Category and Subcategory IDs

Refer to `src/data/categories.ts` for valid category and subcategory IDs:

```typescript
// Example categories
'ai' -> ['ai-ml', 'ai-nlp', 'ai-vision', 'ai-robotics', 'ai-kr']
'systems' -> ['sys-os', 'sys-dist', 'sys-cloud', 'sys-net', 'sys-arch']
'security' -> ['sec-crypto', 'sec-systems', 'sec-network', 'sec-privacy']
// ... see full list in categories.ts
```

### Adding a New Conference

1. **Choose the appropriate file** based on research area
2. **Add to the conferences array**:
   ```json
   {
     "conferences": [
       // ... existing conferences
       {
         "id": "ai-25",
         "name": "International Conference on Amazing AI",
         "acronym": "ICAAI",
         "deadline": "2025-04-01T23:59:59.000Z",
         "date": "2025-08-15 to 2025-08-18",
         "location": "San Francisco, CA, USA",
         "website": "https://icaai2025.org",
         "areas": ["Artificial Intelligence", "Machine Learning"],
         "description": "Premier conference on amazing AI research",
         "paperSubmission": "2025-04-01",
         "notificationDate": "2025-06-15",
         "finalVersion": "2025-07-15",
         "ranking": "A*",
         "proceedings": "ACM",
         "year": 2025,
         "cycle": "2025",
         "categories": ["ai"],
         "subcategories": ["ai-ml"],
         "type": "conference"
       }
     ]
   }
   ```

3. **Ensure unique ID** - Use the next available number for the area
4. **Validate JSON** - Ensure proper JSON formatting
5. **Test locally** - Verify the conference appears correctly

## 🔧 Code Contributions

### Branch Naming Convention
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `data/conference-name` - Conference data additions

### Commit Message Format
```
type(scope): description

Examples:
feat(ui): add calendar view for conferences
fix(search): resolve filtering issue with rankings
docs(readme): update installation instructions
data(ai): add NeurIPS 2025 conference
```

### Code Style Guidelines

#### TypeScript/React
- Use TypeScript for all new code
- Follow existing component patterns
- Use functional components with hooks
- Implement proper error boundaries

#### CSS/Styling
- Use Tailwind CSS classes
- Follow the existing design system
- Ensure responsive design (mobile-first)
- Maintain accessibility standards

#### File Organization
- Keep components focused and single-purpose
- Use proper imports/exports
- Follow the existing folder structure
- Add proper TypeScript types

### Testing Your Changes

1. **Run the development server**
   ```bash
   npm run dev
   ```

2. **Test core functionality**
   - Search and filtering work correctly
   - Conference cards display properly
   - Deadlines show accurate countdowns
   - Mobile responsiveness

3. **Check for errors**
   ```bash
   npm run lint
   npm run build
   ```

4. **Validate JSON data**
   - Ensure all JSON files are valid
   - Check that new conferences appear
   - Verify filtering works with new data

## 📝 Pull Request Process

### Before Submitting
1. **Sync with upstream**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the guidelines above
   - Test thoroughly
   - Update documentation if needed

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat(area): description of changes"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

### Pull Request Template

When creating a PR, please include:

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Conference data addition
- [ ] Documentation update
- [ ] Performance improvement

## Conference Details (if applicable)
- Conference Name: 
- Acronym: 
- Deadline: 
- Website: 

## Testing
- [ ] Tested locally
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Filters work correctly

## Screenshots (if applicable)
Add screenshots of UI changes.

## Additional Notes
Any additional information or context.
```

### Review Process
1. **Automated checks** - GitHub Actions will run tests
2. **Manual review** - Maintainers will review your changes
3. **Feedback** - Address any requested changes
4. **Merge** - Once approved, your PR will be merged

## 🐛 Reporting Issues

### Bug Reports
Use the bug report template and include:
- **Description** - Clear description of the issue
- **Steps to reproduce** - Detailed steps
- **Expected behavior** - What should happen
- **Actual behavior** - What actually happens
- **Screenshots** - If applicable
- **Environment** - Browser, OS, device

### Feature Requests
Use the feature request template and include:
- **Problem description** - What problem does this solve?
- **Proposed solution** - How should it work?
- **Alternatives considered** - Other approaches
- **Additional context** - Mockups, examples, etc.

## 📋 Conference Data Guidelines

### Data Quality Standards
- **Accuracy** - All information must be accurate and up-to-date
- **Completeness** - Include as much relevant information as possible
- **Consistency** - Follow the established format and naming conventions
- **Verification** - Double-check all URLs and dates

### Sources for Conference Information
- Official conference websites
- Conference management systems (EasyChair, HotCRP)
- Academic society websites
- Previous year's information (with updates)

### Common Mistakes to Avoid
- Incorrect deadline timezones (use UTC)
- Broken or outdated website URLs
- Inconsistent location formatting
- Missing or incorrect category assignments
- Duplicate conference IDs

## 🎯 Priority Areas

We especially welcome contributions in these areas:

### High Priority
- **Missing conferences** - Major conferences not yet included
- **Deadline updates** - Keeping deadlines current
- **Mobile experience** - Improving mobile usability
- **Performance** - Optimizing load times and responsiveness

### Medium Priority
- **New features** - Calendar integration, notifications
- **UI improvements** - Better visual design and interactions
- **Accessibility** - Screen reader support, keyboard navigation
- **Internationalization** - Multi-language support

### Low Priority
- **Advanced filtering** - More sophisticated search options
- **Data visualization** - Charts and analytics
- **API development** - Public API for conference data
- **Browser extensions** - Chrome/Firefox extensions

## 🏆 Recognition

Contributors will be recognized in several ways:

- **GitHub Contributors** - Listed in the repository
- **Website Credits** - Featured on the VDeadline website
- **Social Media** - Highlighted on our social channels
- **Special Badges** - For significant contributions

## 📞 Getting Help

If you need help or have questions:

- **GitHub Discussions** - For general questions and ideas
- **GitHub Issues** - For specific bugs or feature requests
- **Email** - contribute@vdeadline.org
- **Discord** - Join our community server (link in README)

## 📜 Code of Conduct

Please note that this project is released with a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

## 🎉 Thank You!

Thank you for contributing to VDeadline! Your efforts help researchers worldwide stay informed about important deadlines and opportunities. Every contribution, no matter how small, makes a difference.

---

<div align="center">
  <p><strong>Happy Contributing! 🚀</strong></p>
  <p>
    <a href="https://github.com/vunifyLTD/VDEADLINE">Back to Repository</a> •
    <a href="https://vdeadline.org">Visit VDeadline</a>
  </p>
</div>