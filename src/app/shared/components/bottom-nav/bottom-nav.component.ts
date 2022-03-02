import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {
  pageYoffset: number = 0;
  showButtonTop: boolean = false;

  @HostListener('window:scroll', ['$event']) onScroll(){
    this.pageYoffset = window.pageYOffset;
 }

 @HostListener('window:scroll', ['$event'])
  handleScroll(){
    const windowScroll = window.pageYOffset;
    this.showButtonTop = windowScroll >= 300;
  }

  constructor(private router: Router, private scroll: ViewportScroller) { }

  ngOnInit(): void {
  }

  goToNew(){
    this.router.navigate(['new']);
  }

  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
}

}
