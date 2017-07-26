import { MtlshippingPage } from './app.po';

describe('mtlshipping App', () => {
  let page: MtlshippingPage;

  beforeEach(() => {
    page = new MtlshippingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
