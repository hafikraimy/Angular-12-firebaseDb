import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/dataStorage.service';
import { Post } from '../services/post.model';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  loadedPosts: Post[] = [];
  currentRoute!: string;
  constructor(
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService)
    {}

  ngOnInit() {
    this.dataStorageService.getAnnouncements().subscribe((posts) => {
      this.loadedPosts = posts;
    })
  }

  onClearAnnouncement(announcementId: string) {
     this.dataStorageService.deleteAnnouncement(announcementId).subscribe(() => {
       //refresh page
      this.dataStorageService.getAnnouncements().subscribe((posts) => {
        this.loadedPosts = posts;
      })
     });
  }

}
