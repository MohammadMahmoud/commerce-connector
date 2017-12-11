import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';


@Injectable()
export class ProductApiService {

    constructor(private http: HttpClient) {
    }

    token1 = 'db7767892efcf347ef0ee66df1e3ce49d1dfa718';

    token2 = '1e7069cb5f45d06fb0222c45474294034b3c306d';

    productEAN = '00000010000038';

    getItemStores(city) {
        let url = 'https://api.commerce-connector.com/REST/2.0/LocalStore?token=' + this.token2 + '&Country=DE&Language=de' +
            '&O_ResultFields=Id%2CCustomId%2CustomPartnerweb%2CName%2CContactInfo%2CGeoInfo%2' +
            'CAddressInfo%2CStoreType%2CPriority%2CLogos%2CCurrency%2COpeningHours%2CPaymentOptions%2CShippingDefinitions%2CProductGroups%2CImages%2CEvents%2CCustomFields&' +
            'F_City%5BValue%5D=' + city + '&F_City%5BCompareOperator%5D=%3D&F_Ean=' + this.productEAN + '&F_SubId=microsite';
        return this.http.get(url)
            .map(res => res);
    }

}
