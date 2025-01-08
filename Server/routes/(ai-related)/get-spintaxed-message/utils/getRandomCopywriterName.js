const greatCopywriters = [
  "David Ogilvy",
  "Dan Kennedy",
  "Gary Halbert",
  "Eugene Schwartz",
  "John Carlton",
  "Clayton Makepeace",
  "Bob Bly",
  "Joanna Wiebe",
  "Ann Handley",
  "Seth Godin",
  "Brian Clark",
  "Neil Patel",
  "Joe Sugarman",
  "Roy H. Williams",
  "Jay Abraham",
  "Drayton Bird",
  "Frank Kern",
  "Russell Brunson",
  "Marie Forleo",
  "Laura Belgray",
];

export default function getRandomCopywriterName() {
  const randomIndex = Math.floor(Math.random() * greatCopywriters.length);
  return greatCopywriters[randomIndex];
}
