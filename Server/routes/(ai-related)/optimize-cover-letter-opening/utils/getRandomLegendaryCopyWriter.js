export default function getRandomLegendaryCopyWriter() {
  const copywriters = [
    "Claude Hopkins",
    "John Caples",
    "David Ogilvy",
    "Rosser Reeves",
    "Eugene Schwartz",
    "Bill Bernbach",
    "Leo Burnett",
    "Gary Halbert",
    "Dan Kennedy",
    "Jay Abraham",
  ];
  const randomIndex = Math.floor(Math.random() * copywriters.length);
  return copywriters[randomIndex];
}
