import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {
  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widtype: string;
  widget: any;
  widgetExists: boolean;
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private router: Router) { }

  ngOnInit() {
    this.widgetExists = false;
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.websiteId = params['websiteId'];
          this.pageId = params['pageId'];
          this.widgetId = params['widgetId'];
          this.widtype = params['widtype'];
        //  this.widget = this.widgetService.findWidgetById(this.wgid);

          this.widgetService.findWidgetById(this.widgetId).subscribe((widget: any) => {
            if (widget.toString() !== 'undefined') {
              this.widget = widget;
              this.widgetExists = true;
            } else {
              this.widgetExists = false;
            }
            if (widget !== null) {
              this.widget = widget;
              this.widgetExists = true;
            } else {
              this.widgetExists = false;
            }
          });
        }
      );
  }
  // createUpdateWidget() {
  //   if (this.widgetExists === true) {
  //   this.widgetService.updateWidget(this.widgetId, this.widget)
  //     .subscribe((widgets: any) => {
  //       this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
  //     });
  // } else {
  //     this.widgetService.createWidget(this.pageId, this.widget)
  //       .subscribe((widgets: any) => {
  //         this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
  //       });
  //   }
  // }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId)
      .subscribe((widgets: any) => {
        this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
      });
  }
}
