import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return '_next_image_stub_';
  },
}));
