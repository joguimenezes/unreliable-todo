import transformToLowerCase from "../../../utils/helpers/transformToLowerCase";

describe('transformToLowerCase test', () => {
  it('should transform text to lower case', () => {
    const text = 'TEST';
    const expectedText = 'test';
    const formattedText = transformToLowerCase(text);
    
    expect(formattedText).toBe(expectedText);
  });
});