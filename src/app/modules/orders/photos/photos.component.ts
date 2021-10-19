import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Order } from '@data/schema/order';
import { environment } from '@env';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  @Input() order: Order = null;
  @Input() index: number = 0;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    //this.cd.detectChanges();
    console.log('photo comp loaded');
  }

  getPhotoURL(val: File) {
    const photoPath = String(val).replace(/\\/g, '/').replace('uploads', '');
    const serverPath = environment.api_url.replace('/api', '');
    return serverPath + photoPath;
  }

  toMatrix = (arr, width) =>
    arr.reduce(
      (rows, key, index) =>
        (index % width == 0
          ? rows.push([key])
          : rows[rows.length - 1].push(key)) && rows,
      []
    );
}
