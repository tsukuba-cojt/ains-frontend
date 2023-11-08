export const ngramTokenize = (tokenizedWord: string, n: number): string[] => {
  let tokens = [];
  for (let i = n; i <= tokenizedWord.length; i++) {
    tokens.push(tokenizedWord.slice(i - n, i));
  }
  return tokens;
};
export const defaultnOrLessGramTokenize = (tokenizedWord: string, n: number): string[] => {
  let tokens: string[] = [];
  for (let i = 1; i <= n; i++) {
    const igramTokens = ngramTokenize(tokenizedWord, i);
    if (igramTokens != null) {
      tokens.concat(igramTokens);
    }
  }
  return tokens;
};
