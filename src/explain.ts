export function explain (pattern: string | RegExp): string {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    const source = regex.source;

    const explanations: [RegExp, string][] = [
        [/^\^/, "Starts with"],
        [/\$$/, "Ends with"],
        [/\.\*/, "any number of any character"],
        [/\d\{5\}/, "exactly five digits"],
        [/\\d/, "a digit"],
        [/\\w/, "a word character (a-z, A-Z, 0-9, _)"],
        [/\\s/, "a whitespace character"],
        [/\+/, "one or more repetitions"],
        [/\?/, "zero or one (optional)"],
        [/\(\?:.*?\)/, "a non-capturing group"],
    ];

    const parts = explanations
        .filter(([regexMatch]) => regexMatch.test(source))
        .map(([, meaning]) => `- ${meaning}`);

    return parts.length > 0
        ? `This pattern includes:\n${parts.join("\n")}`
        : `This pattern: ${source}`;
}
