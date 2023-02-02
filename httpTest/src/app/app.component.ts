import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.module';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  loadedPosts:Post[] = [];
  isFetching = false;
  error = null;
  private errorSub:Subscription;

  constructor(private http: HttpClient,private postsService:PostsService) {}

  ngOnInit() {
    //this.fetchPosts();

    
    this.onFetchPosts();

    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.isFetching = false;
      this.error = errorMessage;
    });//error message
  }

  onCreatePost(postData:Post) {//post
    // Send Http request
    //console.log(postData);
    /*this.http.post<{name:string}>('https://ng-complete-guide-7d282-default-rtdb.firebaseio.com/posts.json',
    postData).subscribe(responseData => {
      console.log(responseData);
    });*/

    this.postsService.createAndStorePost(postData.title,postData.content);
  }

  onFetchPosts() {//get
    // Send Http request
    //this.fetchPosts();

    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    },errorrr => { //error message
      this.isFetching = false;
        this.error = errorrr.error.error +' / '+ errorrr.message + ' / ' + errorrr.status;
        console.log(errorrr);
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(()=>{
      this.loadedPosts = [];//Empty Array
    });
  }

  private fetchPosts(){//get
    this.isFetching = true;
    /*this.http
    .get<{[key:string]:Post}// ["djfdhjdkd1":{title:'' content:''},"djfdhjdkd2":{title:'' content:''}] >
    ('https://ng-complete-guide-7d282-default-rtdb.firebaseio.com/posts.json')
    .pipe(
      map((responseData) => { //push data to array
      const postsArray:Post[] = [];
      for (const key in responseData){
        if(responseData.hasOwnProperty(key)){
          postsArray.push({...responseData[key],id:key});
        }
      }
      return postsArray;
    })).subscribe(posts => {
    //...  
    //console.log(posts);
      this.isFetching = false;
      this.loadedPosts = posts;
    })*/
  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
