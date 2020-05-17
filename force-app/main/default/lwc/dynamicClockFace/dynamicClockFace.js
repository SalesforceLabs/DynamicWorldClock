import {
    LightningElement,
    api,
    track,
    wire
} from 'lwc';
import TIME_ZONE from '@salesforce/i18n/timeZone';
import {
    getRecord
} from 'lightning/uiRecordApi';

const API_KEY = '<INSERT API KEY HERE>';

export default class dynamicClockFace extends LightningElement {
    @api recordId;
    @api showCard;
    @api icon;
    @api cardTitle;
    @api sourceTimeField;
    @api hideSystemTime;
    @api additionalTimeLocations;
    @track times = [];

    @wire(getRecord, {
        recordId: '$recordId',
        fields: '$sourceTimeField'
    })
    wiredRecord({
        error,
        data
    }) {
        if (error) {
            let message = 'Unknown error';
            if (Array.isArray(error.body)) {
                message = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                message = error.body.message;
            }
            console.log('Error: ', message);
        } else if (data) {
            //console.log('Data: ', data);
            let fieldName = this.sourceTimeField.split('.')[1];
            if (data.fields[fieldName].value != null) {
                this.callTimeZone(data.fields[fieldName].value);
            }
        }
    }

    async connectedCallback() {
        try {
            const timezone = TIME_ZONE.split('/')[1].replace(/_/g, ' ');
            if (!this.hideSystemTime) {
                await this.callTimeZone(timezone);
            }
            if (this.additionalTimeLocations != null) {
                let locations = this.additionalTimeLocations.trim().split(',');
                for (let singleLocation of locations) {
                    await this.callTimeZone(singleLocation);
                }
            }
        } catch (error) {
            console.log('Async Error', error);
        }
    }

    callTimeZone = async (theTimezone) => {
        try {
            await fetch(
                    'https://maps.googleapis.com/maps/api/geocode/json?' +
                    'address=' + theTimezone +
                    '&key=' + API_KEY, {
                        method: "GET"
                    })
                .then((geoResponse) => {
                    return geoResponse.json(); // returning the response in the form of JSON
                })
                .then((jsonGeoResponse) => {
                    //console.log('Geocode Response:' + JSON.stringify(jsonGeoResponse));
                    if (jsonGeoResponse.status == "OK") {
                        fetch(
                                'https://maps.googleapis.com/maps/api/timezone/json?' +
                                'location=' + jsonGeoResponse.results[0].geometry.location.lat + ',' + jsonGeoResponse.results[0].geometry.location.lng +
                                '&timestamp=' + Date.now().toString().substring(0, 10) +
                                '&key=' + API_KEY, {
                                    method: "GET"
                                })
                            .then((timeResponse) => {
                                return timeResponse.json(); // returning the response in the form of JSON
                            })
                            .then((jsonTimeResponse) => {
                                let parseObject = JSON.parse(JSON.stringify(jsonTimeResponse));
                                parseObject.timeZoneLabel = theTimezone;
                                //console.log('TimeZone parseObject:', parseObject);
                                this.times.push(parseObject);
                                this.times.sort(function (a, b) {
                                    return (a.dstOffset + a.rawOffset) - (b.dstOffset + b.rawOffset);
                                });
                            })
                            .catch(timeError => {
                                console.log('Timezone Error: ' + JSON.stringify(timeError));
                            });
                    }
                })
                .catch(geoError => {
                    console.log('Geocode Error: ' + JSON.stringify(geoError));
                });
        } catch (error) {
            console.log('Async Error', error);
        }
    }

    get timesExist() {
        if (this.times.length > 0) {
            return true;
        }
        return false;
    }
}