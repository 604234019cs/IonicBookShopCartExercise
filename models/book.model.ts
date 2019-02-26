export interface Book {
    bookid: number;
    price:number;
    title: string;
    isbn: string;
    pageCount: number;
    publishedDate: string;
    thumbnailUrl: string;
    shortDescription: string;
    author: string;
    category: string;
  }  
/*
  export const bookInitialState = {
    bookid: -1,
    title: "",
    isbn: "",
    pageCount: 0,
    publishedDate: new Date("01-01-1999"),
    thumbnailUrl: "https://firebasestorage.googleapis.com/v0/b/comscibookshop.appspot.com/o/na.jpg?alt=media&token=a9b845aa-f95f-4680-a56b-6c805683f0f6",
    shortDescription: "",
    author: "",
    category: "Internet",
   }
   */