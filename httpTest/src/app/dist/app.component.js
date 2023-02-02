"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent(http, postsService) {
        this.http = http;
        this.postsService = postsService;
        this.loadedPosts = [];
        this.isFetching = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.fetchPosts();
    };
    AppComponent.prototype.onCreatePost = function (postData) {
        // Send Http request
        //console.log(postData);
        /*this.http.post<{name:string}>('https://ng-complete-guide-7d282-default-rtdb.firebaseio.com/posts.json',
        postData).subscribe(responseData => {
          console.log(responseData);
        });*/
        this.postsService.createAndStorePost(postData.title, postData.content);
    };
    AppComponent.prototype.onFetchPosts = function () {
        // Send Http request
        this.fetchPosts();
    };
    AppComponent.prototype.onClearPosts = function () {
        // Send Http request
    };
    AppComponent.prototype.fetchPosts = function () {
        this.isFetching = true;
        /*this.http
        .get<{[key:string]:Post}/* ["djfdhjdkd1":{title:'' content:''},"djfdhjdkd2":{title:'' content:''}] >
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
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
