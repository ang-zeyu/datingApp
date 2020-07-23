import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Photo } from '../../interfaces/photo';
import { FileUploader } from 'ng2-file-upload';
import { FileUploadService } from '../../services/file-upload/file-upload.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';

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

  constructor(authService: AuthService) {
    this.uploader = new FileUploader({
      url: environment.userApiBaseUrl + authService.username + '/photos',
      authToken: authService.isLoggedIn() ? `Bearer ${localStorage.getItem('tok')}` : undefined,
    });
    this.uploader.onAfterAddingFile = file => file.withCredentials = false;
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
}
