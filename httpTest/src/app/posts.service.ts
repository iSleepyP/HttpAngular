import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders,HttpParams,HttpEventType } from '@angular/common/http';
import { catchError, map,tap } from 'rxjs/operators'
import { Post } from "./post.module";
import { Subject,throwError } from "rxjs";

@Injectable({providedIn:'root'})
export class PostsService{
    error = new Subject<string>();

    constructor(private http:HttpClient){}

    createAndStorePost(title:string,content:string){
        //..
        const postData:Post = {title:title,content:content};
        this.http.post<{name:string}>('https://ng-complete-guide-7d282-default-rtdb.firebaseio.com/posts.json',
            postData,
            {
                observe:'response'
            }
            ).subscribe(responseData => {
                console.log(responseData);
        },error => {
            this.error.next(error.message);
        });
    }

    fetchPosts(){
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print','pretty');
        searchParams = searchParams.append('custom','key');
        //...
    return this.http
    .get<{[key:string]:Post}// ["djfdhjdkd1":{title:'' content:''},"djfdhjdkd2":{title:'' content:''}] tranfrom to JSON form
    >
    ('https://ng-complete-guide-7d282-default-rtdb.firebaseio.com/posts.json',
        {
            headers: new HttpHeaders({"Custom-Header":"Hello"}),//Header
            params: searchParams,
            responseType:'json'
        }
    )
    .pipe(
      map((responseData) => { //push data to array
      const postsArray:Post[] = [];
      for (const key in responseData){
        if(responseData.hasOwnProperty(key)){
          postsArray.push({...responseData[key],id:key});
             }
         }
      return postsArray;
            }),
                catchError(errorRes => {
                    //Send to analytics server
                    return throwError(errorRes);
                })
            );
    }

    deletePosts(){
        return this.http.delete('https://ng-complete-guide-7d282-default-rtdb.firebaseio.com/posts.json',
            {
                observe:'events',
                responseType:'text'
            }
        )
        .pipe(tap(event => {//extendtion
            console.log(event);
            if(event.type === HttpEventType.Sent){
                
            }
            if(event.type === HttpEventType.Response){
                console.log(event.body);
            }
        }));
    }
}