import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.postsService.createAndStorePost(postData);
    this.fetchPosts();
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe((posts) => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }
}
