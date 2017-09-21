import { EventFormsPage } from './app.po';

describe('event-forms App', () => {
  let page: EventFormsPage;

  beforeEach(() => {
    page = new EventFormsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
