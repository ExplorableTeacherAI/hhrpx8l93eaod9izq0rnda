const greatestCommonDivisor = (a: number, b: number): number =>
    b === 0 ? a : greatestCommonDivisor(b, a % b);

/** Turn a probability that is a multiple of 0.05 into a tidy fraction such as 3/20 */
export const asFraction = (value: number, denominator = 20): string => {
    const numerator = Math.round(value * denominator);
    if (numerator === 0) return "0";
    const divisor = greatestCommonDivisor(numerator, denominator) || 1;
    const bottom = denominator / divisor;
    return bottom === 1 ? `${numerator / divisor}` : `${numerator / divisor}/${bottom}`;
};
