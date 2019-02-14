////////////////////////////////
//
//   Copyright 2018 Battelle Energy Alliance, LLC
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all
//  copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//  SOFTWARE.
//
////////////////////////////////
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AnalysisService } from '../services/analysis.service';
import { ReportService } from '../services/report.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'rapp-executive',
  templateUrl: './executive.component.html',
  styleUrls: ['./executive.component.scss'
  ]
})
export class ExecutiveComponent implements OnInit, AfterViewInit {
  response: any;

  chartPercentCompliance: Chart;
  chartStandardsSummary: Chart;
  chartStandardResultsByCategory: Chart;
  responseResultsByCategory: any;


  constructor(private reportSvc: ReportService, private analysisSvc: AnalysisService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Executive Summary - CSET");

    this.reportSvc.getReport('executive').subscribe(
      (r: any) => {
        this.response = r;
      },
      error => console.log('Executive report load Error: ' + (<Error>error).message)
    );
  }

  ngAfterViewInit() {

    // Populate charts
    this.analysisSvc.getDashboard().subscribe(x => {
      this.chartPercentCompliance = this.analysisSvc.buildPercentComplianceChart('canvasCompliance', x);
    });

    this.analysisSvc.getStandardsSummaryOverall().subscribe(x => {
      this.chartStandardsSummary = this.analysisSvc.buildStandardsSummary('canvasStandardsSummary', x);
    });

    this.analysisSvc.getStandardsResultsByCategory().subscribe(x => {
      this.responseResultsByCategory = x;
      this.chartStandardResultsByCategory = this.analysisSvc.buildStandardResultsByCategoryChart('chartStandardResultsByCategory', x);
    });
  }
}