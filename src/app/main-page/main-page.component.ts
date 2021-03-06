import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ProductApiService} from '../services/product-api.service';
import {NgbTooltip, NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css'],
    providers: [NgbTooltipConfig]
})
export class MainPageComponent implements OnInit {

    // Initial Map Values Germany As Center Country
    @ViewChild('tooltip') public tooltip: NgbTooltip;
    @Input() lat = 50.7074946;
    @Input() lng = 10.5339133;
    @Input() zoom = 7;

    // Initial Values
    locations: any[] = [];
    singleLocation: any[] = [];
    historyKeywords: any[] = [];
    map: any;
    infoWindowOpened = null;
    viewMode: any = 'list';
    isActive: boolean;
    model = '';
    cities: any;
    notFound: string;
    results: any;
    searchEnabled = false;
    cityAvailable: any = ['Munich', 'Stuttgart'];

    constructor(public config: NgbTooltipConfig, public api: ProductApiService, private _service: NotificationsService) {
        config.placement = 'bottom';
    }

    ngOnInit() {
    }

    // Load Api of Map (Child View)
    loadAPIWrapper(map) {
        this.map = map;
    }

    // clean search
    cleanInput() {
        this.model = '';
        this.isActive = false;
    }

    // When Marker Clicked
    markerClicked = (markerObj, infoWindow) => {
        this.lat = markerObj.lat;
        this.lng = markerObj.lng;
        this.zoom = 15;
        this.singleLocation = [];
        this.singleLocation.push(markerObj);
        this.viewMode = 'single';
        this.isActive = true;
        if (this.infoWindowOpened === infoWindow) {
            return;
        }

        if (this.infoWindowOpened !== null) {
            this.infoWindowOpened.close();
        }

        this.infoWindowOpened = infoWindow;

    };

    // Search Function
    setFilteredItems() {
        const found = this.cityAvailable.filter((city) => {
            return city.toLowerCase().indexOf(this.model.toLowerCase()) > -1;
        });
        this.searchEnabled = false;
        found.length > 0 ? this.cities = found : '' ;
        this.model.length <= 1 ? this.cities = null : '';
        this.model.length >= 2 && found.length === 0 ? this.notFound = 'Sorry The City Not Found' : this.notFound = '';
        this.tooltip.open();
    }

    // When City Selected
    selected(city) {
        this.model = city;
        this.searchEnabled = true;
        this.cities = null;
    }

    // Call The Api For The Selected City
    searchForThatCity() {
        this.api.getItemStores(this.model).subscribe(data => {
            if (this.historyKeywords.indexOf(this.model) === -1) {
                if (data['getResult']['0'].ResultGroups['0'].LocalStores.length > 0) {
                    this.results = data['getResult']['0'].ResultGroups['0'];
                    this.lat = parseFloat(this.results.ResultGroupHeader.RequestGeoLocation.Lat);
                    this.lng = parseFloat(this.results.ResultGroupHeader.RequestGeoLocation.Lng);
                    this.zoom = 12;
                    for (let i = 0; i < this.results.LocalStores.length; i++) {
                        const obj = {
                            'id': this.results.LocalStores[i].Id,
                            'name': this.results.LocalStores[i].Name,
                            'phone': this.results.LocalStores[i].ContactInfo[0].Phone,
                            'email': this.results.LocalStores[i].ContactInfo[0].Email,
                            'website': this.results.LocalStores[i].ContactInfo[0].Website,
                            'lng': parseFloat(this.results.LocalStores[i].GeoInfo[0].Lng),
                            'lat': parseFloat(this.results.LocalStores[i].GeoInfo[0].Lat),
                            'street': this.results.LocalStores[i].AddressInfo[0].Street,
                            'postcode': this.results.LocalStores[i].AddressInfo[0].Postcode,
                            'city': this.results.LocalStores[i].AddressInfo[0].City,
                            'storeType': this.results.LocalStores[i].AddressInfo[0].StoreType,
                            'OpenHours': this.results.LocalStores[i].OpeningHours.length > 0 ? data['getResult'][0].ResultGroups[0].LocalStores[i].OpeningHours[0].Opentime : null
                        };
                        this.locations.push(obj);
                        this.searchEnabled = false;
                        this.historyKeywords.push(this.model);
                    }
                }
                else {
                    this._service.info('This city is not available');
                }
            }
        }), err => {
            this._service.info('Sorry , server is down');
            console.log(err);
        };
    }

    // When Clicked on Store From The List
    findStore(item) {
        this.lat = item.lat;
        this.lng = item.lng;
        this.zoom = 15;
        this.markerClicked(item, null);
    }


}
