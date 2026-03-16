import { render } from '@testing-library/react-native';

import App from '@/app/index';

jest.mock('@expo/vector-icons', () => ({
  Feather: () => null,
  MaterialCommunityIcons: () => null,
}));

describe('<App/>', () => {
  test('App renders correctly', () => {
    render(<App />);
  });
});
