import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  uploader: FileUploader;

  constructor(authService: AuthService) {
    this.uploader = new FileUploader({
      url: environment.userApiBaseUrl + authService.username + '/photos',
      authToken: authService.isLoggedIn() ? `Bearer ${localStorage.getItem('tok')}` : undefined,
    });
    this.uploader.onAfterAddingFile = file => file.withCredentials = false;
  }
}
