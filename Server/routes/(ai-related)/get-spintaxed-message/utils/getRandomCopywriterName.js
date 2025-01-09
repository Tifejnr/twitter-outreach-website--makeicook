const mostPopularWriters = [
  "William Shakespeare",
  "J.K. Rowling",
  "Stephen King",
  "Agatha Christie",
  "Charles Dickens",
  "Jane Austen",
  "Mark Twain",
  "George Orwell",
  "Leo Tolstoy",
  "J.R.R. Tolkien",
  "Ernest Hemingway",
  "Gabriel García Márquez",
  "John Steinbeck",
  "Victor Hugo",
  "Fyodor Dostoevsky",
  "Dr. Seuss",
  "Virginia Woolf",
  "C.S. Lewis",
  "Dan Brown",
  "Harper Lee",
  "Suzanne Collins",
  "Emily Brontë",
  "J.D. Salinger",
  "Herman Melville",
  "Edgar Allan Poe",
  "Dante Alighieri",
  "Oscar Wilde",
  "Arthur Conan Doyle",
  "R.L. Stine",
  "Brian Tracy",
];

export default function getRandomCopywriterName(lastPickedName) {
  let randomName;
  do {
    const randomIndex = Math.floor(Math.random() * mostPopularWriters.length);
    randomName = mostPopularWriters[randomIndex];
  } while (randomName === lastPickedName); // Ensure it's not the same as the last picked name
  return randomName;
}
