import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClipboardService} from 'ngx-clipboard';

export interface Data {
  hashid: string;
  url: string;
  created_at: string;
  copied: boolean;
}

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  link;
  shortLinks = [];

  constructor(private http: HttpClient, private clipboardService: ClipboardService) { }

  ngOnInit(): void {
  }

  short(): any {
    const url = {
      url: this.link,
    };

    this.http.post('https://rel.ink/api/links/', url).subscribe(data => {
      this.shortLinks.push({
        ...data,
        copied: false
      });
    });

    this.link = '';
  }

  copy(item): any {
    const text = 'https://rel.ink/' + item.hashid;
    this.clipboardService.copy(text);
    item.copied = true;
  }
}
