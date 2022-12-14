import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
// import { Observable } from 'rxjs';
import { BlogpostService } from "../blogpost.service";
import { Blogpost } from "../models/blogpost";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  // blogposts$: Observable<Blogpost[]>;
  allBlogposts: Blogpost[];
  errorFromServer = '';

  constructor(private blogpostService: BlogpostService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/auth']);
    }

    // this.blogposts$ = this.blogpostService.getBlogposts();
    this.blogpostService.getBlogposts().subscribe((data) => {
      this.refresh(data);
    });

    this.blogpostService.handleBlogpostCreated().subscribe((data) => {
      console.log("AdminComponent received ", data);
      this.refresh(data);
    });
  }

  deleteBlogposts(selectedOptions) {
    const ids = selectedOptions.map((so) => so.value);

    if (ids.length === 1) {
      this.blogpostService.deleteSingleBlogpost(ids[0]).subscribe(
        (data) => {
          this.refresh(data);
        },
        (err) => this.handleError(err)
      );
    } else {
      return this.blogpostService.deleteBlogposts(ids).subscribe(
        (data) => {
          this.refresh(data);
        },
        (err) => this.handleError(err)
      );
    }
  }

  refresh(data) {
    this.blogpostService.getBlogposts().subscribe((data) => {
      this.allBlogposts = data;
    });
  }

  handleError(error) {
    this.errorFromServer = `Error ${error.status} - ${error.statusText}`;
    console.error(error);
  }

  logout() {
    this.authService.logout().subscribe(data => {
      console.log(data);
      this.router.navigate(['/auth']);
    }, err => console.error(err)
    )
  }
}
