export default function getFirst3Letters(coachCodeRaw: string) {
  const coachCodeSplited = coachCodeRaw.split("");
  const coachCodeMatched = `${coachCodeSplited[0]}${coachCodeSplited[1]}${coachCodeSplited[2]}`;
  return coachCodeMatched;
}
