import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Photo } from '../../interfaces/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-member-gallery-edit',
  templateUrl: './member-gallery-edit.component.html',
  styleUrls: ['./member-gallery-edit.component.css']
})
export class MemberGalleryEditComponent implements OnInit {
  @Input() photos: Photo[];

  @ViewChild('dropZone') dropZone: ElementRef;

  uploader: FileUploader;
  hasBaseDropZoneOver = false;

  constructor(private authService: AuthService, private userService: UserService) {
    this.uploader = new FileUploader({
      url: environment.userApiBaseUrl + authService.username + '/photos',
      authToken: authService.isLoggedIn() ? `Bearer ${localStorage.getItem('tok')}` : undefined,
    });
    this.uploader.onAfterAddingFile = file => file.withCredentials = false;
    this.uploader.onSuccessItem = ((item, response) => {
      const photo: Photo = JSON.parse(response);
      this.photos.push(photo);
    });
  }

  ngOnInit(): void {
  }

  fileOverBase($event: any): void {
    if ($event) {
      this.dropZone.nativeElement.style = 'background-color: #f5a002; border: 1px solid white;';
    } else {
      this.dropZone.nativeElement.style = undefined;
    }
  }

  setPhotoAsMain(photo: Photo): void {
    this.userService.setUserMainPhoto(this.authService.username, photo.id).subscribe((response) => {
      alertifyjs.success('Set new main photo!');
      this.photos.find(p => p.isMain).isMain = false;
      this.photos.find(p => p.id === photo.id).isMain = true;
      this.authService.changeMainPhoto(photo.url);
    }, error => {
      alertifyjs.error('Could not set main photo!');
    });
  }
}
