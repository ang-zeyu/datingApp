import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../../interfaces/photo';
import { FileUploader } from 'ng2-file-upload';
import { FileUploadService } from '../../services/file-upload/file-upload.service';

@Component({
  selector: 'app-member-gallery-edit',
  templateUrl: './member-gallery-edit.component.html',
  styleUrls: ['./member-gallery-edit.component.css']
})
export class MemberGalleryEditComponent implements OnInit {
  @Input() photos: Photo[];

  uploader: FileUploader;
  hasBaseDropZoneOver = false;

  constructor(fileUploadService: FileUploadService) {
    this.uploader = fileUploadService.uploader;
  }

  ngOnInit(): void {
  }

  fileOverBase($event: any) {
    
  }
}
