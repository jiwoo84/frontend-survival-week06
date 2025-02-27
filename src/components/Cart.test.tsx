import { render, screen } from '@testing-library/react';
import Cart from './Cart';
import Food from '../types/Food';
import fixtures from '../../fixtures';

const context = describe;

const state: { menu: Food[]} = {
  menu: [],
};

jest.mock('../hooks/useCartStore', () => () => [state]);

describe('Cart', () => {
  it('render Cart', () => {
    render(<Cart />);

    screen.getByText(/주문 갯수/);
    screen.getByText(/예상 금액/);
  });

  context('without selected menu', () => {
    beforeEach(() => {
      state.menu = [];
    });

    it('renders zero count', () => {
      render(<Cart />);

      screen.getByText(/0개/);
    });

    context('with selected menu', () => {
      beforeEach(() => {
        state.menu = fixtures.foods;
      });

      it('renders selected food list and count', () => {
        render(<Cart />);

        fixtures.foods.forEach((food) => {
          screen.getByText(new RegExp(food.name));
        });

        screen.getByText(/2개/);
      });
    });
  });
});
