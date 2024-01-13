import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly FIREBASE_URL: string =
    'https://angular-http-example-421ed-default-rtdb.europe-west1.firebasedatabase.app/posts.json';

  constructor(private http: HttpClient) {}

  createAndStorePost(postData: Post) {
    return this.http.post(this.FIREBASE_URL, postData);
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>(this.FIREBASE_URL).pipe(
      map((responseData) => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      })
    );
  }

  deletePosts() {
    return this.http.delete(this.FIREBASE_URL);
  }
}
