import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {MainPageComponent} from './main-page/main-page.component';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {ProductApiService} from './services/product-api.service';
import {MapContentComponent} from './map-content-component/map-content-component.component';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import {SimpleNotificationsModule} from "angular2-notifications";


@NgModule({
    declarations: [
        AppComponent,
        MapContentComponent,
        MainPageComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD6y7_AcyjZ3GKaqtPd5DFGyxrKGdamSx4'
        }),
        SimpleNotificationsModule.forRoot(),
        AgmJsMarkerClustererModule
    ],
    providers: [ProductApiService, GoogleMapsAPIWrapper],
    bootstrap: [AppComponent]
})
export class AppModule {
}
