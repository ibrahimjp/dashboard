# Healthcare Dashboard

A modern, responsive healthcare dashboard built with React and TailwindCSS, featuring multiple pages and reusable components.

## Features

- **Responsive Design**: Optimized for desktop and tablet devices
- **Component-Based Architecture**: Reusable UI components for consistency
- **Modern UI/UX**: Clean, professional design with proper accessibility
- **Multiple Pages**: Dashboard and additional healthcare management pages
- **TailwindCSS**: Utility-first CSS framework for rapid development

## Project Structure

```
dashboard/
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── Button.jsx         # Button component with variants
│   │   │   ├── Card.jsx           # Card component with sections
│   │   │   ├── Table.jsx          # Table component with styling
│   │   │   ├── Badge.jsx          # Status badge component
│   │   │   └── StatCard.jsx       # Statistics card component
│   │   ├── Sidebar.jsx            # Navigation sidebar
│   │   ├── Header.jsx             # Top header with search
│   │   ├── InfoCards.jsx          # Dashboard info cards
│   │   ├── HospitalSurvey.jsx     # Survey chart component
│   │   ├── IncomeCharts.jsx       # Income charts component
│   │   └── AppointmentActivity.jsx # Appointments table
│   ├── pages/
│   │   └── NewPage.jsx            # Additional healthcare page
│   ├── assets/                    # Images and SVG assets
│   ├── App.jsx                    # Main app with routing
│   ├── DashboardPage.jsx          # Main dashboard page
│   └── main.jsx                   # App entry point
├── public/
├── tailwind.config.js             # TailwindCSS configuration
├── postcss.config.cjs             # PostCSS configuration
└── package.json
```

## Components

### UI Components

#### Button
```jsx
<Button variant="primary" size="md" className="w-full">
  Click Me
</Button>
```

**Variants**: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `outline`
**Sizes**: `sm`, `md`, `lg`

#### Card
```jsx
<Card>
  <Card.Header>
    <h3>Card Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Card content goes here</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

#### Table
```jsx
<Table>
  <Table.Head>
    <tr>
      <Table.Header>Column 1</Table.Header>
      <Table.Header>Column 2</Table.Header>
    </tr>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Data 1</Table.Cell>
      <Table.Cell>Data 2</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

#### Badge
```jsx
<Badge variant="success">Confirmed</Badge>
```

**Variants**: `default`, `primary`, `success`, `warning`, `danger`, `info`

#### StatCard
```jsx
<StatCard
  title="Total Patients"
  value="2,847"
  icon={<PatientIcon />}
  iconBgColor="bg-blue-500"
/>
```

## Getting Started

### Prerequisites
- Node.js 18+ (20.19+ recommended for Vite)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

## Usage

### Navigation
The app includes a top navigation bar with links to:
- **Original Dashboard**: The main healthcare dashboard with sidebar navigation
- **New Page**: Additional healthcare management page

### Responsive Design
- **Desktop**: Full layout with sidebar and main content
- **Tablet**: Responsive grid layouts that adapt to screen size
- **Mobile**: Stacked layouts for smaller screens

### Customization

#### Colors
The app uses TailwindCSS color classes. You can customize colors in `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          700: '#1d4ed8',
        }
      }
    }
  }
}
```

#### Components
All UI components are located in `src/components/ui/` and can be easily modified or extended.

## Accessibility Features

- Semantic HTML structure
- ARIA labels for interactive elements
- Proper heading hierarchy
- Keyboard navigation support
- Screen reader friendly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- **React**: 19.1.1
- **React Router**: For navigation
- **TailwindCSS**: 3.4.0 for styling
- **Vite**: For build tooling and development server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please open an issue in the repository.
