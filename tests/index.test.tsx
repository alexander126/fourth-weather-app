import { render } from '@testing-library/react-native';

import App from '@/app/index';

describe('<App/>', () => {
  test('App renders correctly', () => {
    render(<App />);
  });
});
