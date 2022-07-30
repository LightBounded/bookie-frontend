export default interface Book {
  [key: string]: string | File | FileList
  id: string
  title: string
  author: string
  genre: string
  image: string | File | FileList
}
