import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../../interfaces/photo';

@Component({
  selector: 'app-member-gallery',
  templateUrl: './member-gallery.component.html',
  styleUrls: ['./member-gallery.component.css']
})
export class MemberGalleryComponent implements OnInit {
  @Input() photos: Photo[];

  currentPhoto = 0;

  constructor() { }

  ngOnInit(): void {
    console.log(this.photos);
  }

  switchToNextPhoto(): void {
    this.currentPhoto = this.currentPhoto + 1 >= this.photos.length
      ? 0
      : this.currentPhoto + 1;
  }

  switchToPrevPhoto(): void {
    this.currentPhoto = this.currentPhoto - 1 < 0
      ? this.photos.length - 1
      : this.currentPhoto - 1;
  }
}
