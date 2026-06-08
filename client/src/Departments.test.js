import { render, screen } from '@testing-library/react';
import Departments from './Departments';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('renders the departments page with department data', () => {
  render(
    <Departments
      departments={[{ id: 1, name: 'Engineering' }]}
      setDepartments={() => {}}
      navBar={false}
      setNavBar={() => {}}
    />
  );

  expect(screen.getAllByText(/Departments/i).length).toBeGreaterThan(0);
});
