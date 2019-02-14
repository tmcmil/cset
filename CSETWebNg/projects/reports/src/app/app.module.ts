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
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExecutiveComponent } from './executive/executive.component';
import { SitesummaryComponent } from './sitesummary/sitesummary.component';
import { SecurityplanComponent } from './securityplan/securityplan.component';
import { DetailComponent } from './detail/detail.component';
import { DiscoveryTearoutsComponent } from './discovery-tearouts/discovery-tearouts.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReportService } from './services/report.service';
import { ConfigService } from './services/config.service';
import { AnalysisService } from './services/analysis.service';
import { createCustomElement } from '@angular/elements';
import { EvalAgainstComponent } from './eval-against/eval-against.component';
import { timer } from 'rxjs';
import { JwtParser } from '../../../../src/app/helpers/jwt-parser';
import { AuthenticationService } from '../../../../src/app/services/authentication.service';
import { JwtInterceptor } from '../../../../src/app/helpers/jwt.interceptor';
import { RedirectComponent } from './redirect/redirect.component';

@NgModule({
  declarations: [
    AppComponent,
    ExecutiveComponent,
    SitesummaryComponent,
    SecurityplanComponent,
    DetailComponent,
    DiscoveryTearoutsComponent,
    EvalAgainstComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configSvc: ConfigService) => () => configSvc.loadConfig(),
      deps: [ConfigService],
      multi: true
    },
    AuthenticationService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },
    ReportService,
    AnalysisService
  ],
  entryComponents: [
    EvalAgainstComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector,
    private http: HttpClient) {
    const against = createCustomElement(EvalAgainstComponent, {
      injector
    });
    customElements.define('eval-against', against);
  }
}