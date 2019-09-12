////////////////////////////////
//
//   Copyright 2019 Battelle Energy Alliance, LLC
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
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AnalysisService } from '../services/analysis.service';
import { ReportService } from '../services/report.service';
import { Title } from '@angular/platform-browser';
import { AcetDashboard } from '../../../../../src/app/models/acet-dashboard.model';
import { ACETService } from '../../../../../src/app/services/acet.service';


@Component({
  selector: 'rapp-executive',
  templateUrl: './executive.component.html'
})
export class ExecutiveComponent implements OnInit, AfterViewInit {
  response: any;

  chartPercentCompliance: Chart;
  chartStandardsSummary: Chart;
  chartStandardResultsByCategory: Chart;
  responseResultsByCategory: any;


  // Charts for Components
  chartComponentSummary: Chart;
  chartComponentsTypes: Chart;
  warningCount = 0;
  complianceGraphs: any[] = [];
  chart1: Chart;

  numberOfStandards = -1;

  pageInitialized = false;

  acetDashboard: AcetDashboard;


  constructor(
    public reportSvc: ReportService,
    private analysisSvc: AnalysisService,
    private titleService: Title,
    public acetSvc: ACETService
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Executive Summary - CSET");

    this.reportSvc.getReport('executive').subscribe(
      (r: any) => {
        this.response = r;
      },
      error => console.log('Executive report load Error: ' + (<Error>error).message)
    );


    // Populate charts

    // Summary Percent Compliance
    this.analysisSvc.getDashboard().subscribe(x => {
      this.chartPercentCompliance = this.analysisSvc.buildPercentComplianceChart('canvasCompliance', x);
    });


    // Standards Summary (pie or stacked bar)
    this.analysisSvc.getStandardsSummary().subscribe(x => {
      this.chartStandardsSummary = this.analysisSvc.buildStandardsSummary('canvasStandardsSummary', x);
    });


    // create an array of discreet datasets for the green bar graphs
    this.analysisSvc.getStandardsResultsByCategory().subscribe(x => {
      this.responseResultsByCategory = x;

      // Standard Or Question Set (multi-bar graph)
      this.chartStandardResultsByCategory = this.analysisSvc.buildStandardResultsByCategoryChart('chartStandardResultsByCategory', x);

      // Set up arrays for green bar graphs
      this.numberOfStandards = !!x.dataSets ? x.dataSets.length : 0;
      if (!!x.dataSets) {
        x.dataSets.forEach(element => {
          this.complianceGraphs.push(element);
        });
      }
    });


    this.analysisSvc.getStandardsResultsByCategory().subscribe(x => {
      this.responseResultsByCategory = x;
      this.chartStandardResultsByCategory = this.analysisSvc.buildStandardResultsByCategoryChart('chartStandardResultsByCategory', x);
    });


    this.analysisSvc.getComponentsSummary().subscribe(x => {
      this.chartComponentSummary = this.analysisSvc.buildComponentsSummary('canvasComponentSummary', x);
    });


    this.analysisSvc.getComponentTypes().subscribe(x => {
      this.chartComponentsTypes = this.analysisSvc.buildComponentTypes('canvasComponentsTypes', x);
    });

    this.reportSvc.getACET().subscribe((x: boolean) => {
      this.reportSvc.hasACET = x;
    });

    // ACET-specific content
    this.acetSvc.getAcetDashboard().subscribe(
      (data: AcetDashboard) => {
        this.acetDashboard = data;

        for (let i = 0; i < this.acetDashboard.IRPs.length; i++) {
          this.acetDashboard.IRPs[i].Comment = this.acetSvc.interpretRiskLevel(this.acetDashboard.IRPs[i].RiskLevel);
        }
      },
      error => {
        console.log('Error getting all documents: ' + (<Error>error).name + (<Error>error).message);
        console.log('Error getting all documents: ' + (<Error>error).stack);
      });
  }

  /**
   *
   */
  ngAfterViewChecked() {
    if (this.pageInitialized) {
      return;
    }

    // There's probably a better way to do this ... we have to wait until the
    // complianceGraphs array has been built so that the template can bind to it.
    if (this.complianceGraphs.length === this.numberOfStandards && this.numberOfStandards >= 0) {
      this.pageInitialized = true;
    }

    // at this point the template should know how big the complianceGraphs array is
    let cg = 0;
    this.complianceGraphs.forEach(x => {
      this.chart1 = this.analysisSvc.buildRankedCategoriesChart("complianceGraph" + cg++, x);
    });
  }
}
