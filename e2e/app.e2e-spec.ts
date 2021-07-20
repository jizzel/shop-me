import { ShopMePage } from './app.po';

describe('shop-me App', () => {
  let page: ShopMePage;

  beforeEach(() => {
    page = new ShopMePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to shop-me app!');
  });
});
