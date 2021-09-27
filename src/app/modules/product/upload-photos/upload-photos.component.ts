import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
  ImageCroppedEvent,
  base64ToFile,
  ImageCropperComponent,
} from 'ngx-image-cropper';
import { Observable } from 'rxjs';
//import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.scss'],
})
export class UploadPhotosComponent implements OnInit {
  selectedFiles?: Blob;
  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  imgChangeEvt: any = '';
  cropImgPreview: any = '';

  @Input() height: number;
  @Input() width: number;
  @Input() price: number;

  @ViewChild('openModal', { static: true }) openModal: ElementRef;
  @ViewChild('closeModal', { static: true }) closeModal: ElementRef;
  @ViewChild('cropper', { static: true })
  private cropper: ImageCropperComponent;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    //this.imageInfos = this.uploadService.getFiles();
  }

  selectFiles(files: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = files;

    // console.log(this.selectedFiles);
    // console.log(this.selectedFiles[0]);
    if (this.selectedFiles) {
      // const numberOfFiles = this.selectedFiles.length;
      // for (let i = 0; i < numberOfFiles; i++) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previews.push(e.target.result);
      };

      reader.readAsDataURL(this.selectedFiles);
      // }
    }
  }

  onFileChange(event: any): void {
    console.log('fileChanged');
    this.openModal.nativeElement.click();
    this.imgChangeEvt = event;
    this.cd.detectChanges();
  }

  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
    this.selectFiles(base64ToFile(this.cropImgPreview));
    console.log('IMage gropped');
  }

  cropPhoto() {
    this.cropper.crop();
    this.closeModal.nativeElement.click();
  }

  imgLoad() {
    // display cropper tool
  }

  initCropper() {
    // init cropper
  }

  imgFailed() {
    // error msg
  }

  // upload(idx: number, file: File): void {
  //   this.progressInfos[idx] = { value: 0, fileName: file.name };

  //   if (file) {
  //     this.uploadService.upload(file).subscribe(
  //       (event: any) => {
  //         if (event.type === HttpEventType.UploadProgress) {
  //           this.progressInfos[idx].value = Math.round(
  //             (100 * event.loaded) / event.total
  //           );
  //         } else if (event instanceof HttpResponse) {
  //           const msg = 'Uploaded the file successfully: ' + file.name;
  //           this.message.push(msg);
  //           this.imageInfos = this.uploadService.getFiles();
  //         }
  //       },
  //       (err: any) => {
  //         this.progressInfos[idx].value = 0;
  //         const msg = 'Could not upload the file: ' + file.name;
  //         this.message.push(msg);
  //       }
  //     );
  //   }
  // }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      // for (let i = 0; i < this.selectedFiles.length; i++) {
      //   this.upload(i, this.selectedFiles[i]);
      // }
    }
  }
}
