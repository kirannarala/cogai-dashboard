

import axios from 'axios';
import { config } from '../constants'
import moment from "moment";



const url = config.url.API_URL;



const appManager = {
    
    interval: 60, // time interval for previous stats in seconds
    time_difference: 24, // number of hours
    lastTime: 24, // 24hours format
    time_zone: 'Asia/kolkata',

    
    getListOfZonesByName: (searchText) => {
        const source = url + "/api/zones/search?term="+searchText;
        return new Promise((resolve, reject) => {
            axios.get(source)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    getListOfCamerasByName: (searchText) => {
        const source = url + "/api/cameras/search?term="+searchText;
        return new Promise((resolve, reject) => {
            axios.get(source)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    getUnreadNotifications: (user_id, lastReadTime) =>{
        const source = lastReadTime !== null ? url + "/api/notifications/listunread?user_id="+user_id+"&after="+lastReadTime
        : url + "/api/notifications/listunread?user_id="+user_id;
  
        return new Promise((resolve, reject) => {
            axios.get(source)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    createNotificationSettings(object) {
    const source = url + "/api/notificationsettings/create";

    var data = {
      user_id: object.user_id,
      filters: {
        min_num_of_violations: object.filters.min,
        max_num_of_violations: object.filters.max,
      },
      action: object.action,
      zones: object.zones
    };

    return new Promise((resolve, reject) => {
      axios
        .post(source, data)
        .then(function(response) {
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  updateNotificationSettings(id, action, filters, zones) {
    const source = url + "/api/notificationsettings/update";
    var data = {
      notification_settings_id: id,
      data: {
        action: action,
        filters: filters,
        zones: zones
      },
    };
    return new Promise((resolve, reject) => {
      axios
        .post(source, data)
        .then(function(response) {
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  deleteNotificationSettings(id) {
    const source = url + "/api/notificationsettings/delete";
    var data = {
      notification_settings_id: id,
    };
    return new Promise((resolve, reject) => {
      axios
        .post(source, data)
        .then(function(response) {
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
    getNotificationSettingsList: () => {
        const source = url + '/api/notificationsettings/list';
        return new Promise((resolve, reject) => {
            axios.get(source)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    getNotificationsList: (limit, offset) =>{
        const source = url + '/api/notifications/list?limit='+limit+'&offset='+offset;
        return new Promise((resolve, reject) => {
            axios.get(source)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    deleteCamera: (camera_id) => {
        const data = {
            "camera_id": camera_id
        }; 
        const source = url + '/api/cameras/delete';
        return new Promise((resolve, reject) => {
            axios.post(source, data)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    createCamera: (cameraDetails) => {
        const source = url + '/api/cameras/create';
        const data = cameraDetails;
        return new Promise((resolve, reject) => {
            axios.post(source, data)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    updateCameraDetails: (cameraDetails) => {
        const source = url + '/api/cameras/update';
        const data = cameraDetails;
        return new Promise((resolve, reject) => {
            axios.post(source, data)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    getCameraDetails: (camera_id) => {
        const source = url + '/api/cameras/'+camera_id;
        return new Promise((resolve, reject) => {
            axios.get(source)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    getCameraList: (zone_id) =>{
        const source =zone_id === undefined ?  url + '/api/cameras/list' :  url + '/api/cameras/list?zone_id='+zone_id ;
        return new Promise((resolve, reject) => {
            axios.get(source)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    getFormattedTime: (time) => {
        var formattedTime = new Date().toLocaleString("en-US", {timeZone: appManager.time_zone});
        // return encodeURIComponent((new Date(formattedTime)).toISOString());
        return (new Date(formattedTime)).toISOString();
    },
     getZoneTodayStats: async (time, zone_id) => {
        // const time_ = appManager.getFormattedTime(time);
        const time_ = time.toISOString();
        const source = url + '/api/rawstats/getlatest?after='+time_+'&zone_id='+zone_id;
        return await new Promise((resolve, reject) => {
            axios.get(source)
                .then(function (response) {
                    resolve(response.data);
                    console.log(response.data.length);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    getZonePreviousStats: (timezone, zone_id, interval, from_time, to_time) => {
        // const fromTime = appManager.getFormattedTime(from_time);
        // const toTime = appManager.getFormattedTime(to_time);
        // const fromTime = from_time.toISOString();
        // const toTime = to_time.toISOString();
        const source = url + '/api/rawstats/listprevious?timezone='+timezone+'&zone_id='+zone_id+'&interval='+interval+'&from_time='+from_time+'&to_time='+to_time;
         return new Promise((resolve, reject) => {
            axios.get(source)
                .then(function (response) {
                    resolve(response.data);
                    console.log(response.data.length);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    getInitials: (name) => {
        if(name){
            var names = name.split(' ');
            if(names.length > 1){
                return names[0].substring(0, 1).toUpperCase() + names[1].substring(0, 1).toUpperCase();
            }
            else{
                return names.substring(0, 1).toUpperCase();
            }
        }
        return;
    },
    createZone(zone_data){
        const source = url + '/api/zones/create';
        const data_ = zone_data;
        return new Promise((resolve, reject) => {
            axios.post(source, data_)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    deleteZone(zone_id){
        const source = url + '/api/zones/delete';
        const data_ = {
            "zone_id": zone_id
        };
        return new Promise((resolve, reject) => {
            axios.post(source, data_)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    getZoneDetails(zoneId){
        const source = url + '/api/zones/'+zoneId;
        return new Promise((resolve, reject) => {
            axios.get(source)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    updateZoneDetails(zone_data){
        const source = url + '/api/zones/update';
        const data_ = zone_data;
        return new Promise((resolve, reject) => {
            axios.post(source, data_)
                .then(function (response) {
                    resolve(response.data);
                    console.log(response);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    getZoneList(){
        const source = url + '/api/zones/list';
        return new Promise((resolve, reject) => {
            axios.get(source)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    getDashboardAnalytics(){
        const source = url + '/api/dashboard/simple';
        return new Promise((resolve, reject) => {
            axios.get(source)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    register: (user) => {
        const source = url + '/api/users/register';
        var data = {
            first_name: user.first_name ? user.first_name : '',
            last_name: user.last_name ? user.last_name : '',
            persona: user.persona ? user.persona : '',
            email: user.email ? user.email : '',
            password: user.password ? user.password : '',
            mobile_number: user.mobile_number ? user.mobile_number : '',
            last_login_at: user.last_login_at ? user.last_login_at : '',
        };
        return new Promise((resolve, reject) => {
            axios.post(source, data)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    getUserDetails: (id) => {
    const source = url + '/api/users/'+id+'/profile/';
    return new Promise((resolve, reject) => {
        axios.get(source)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject({ error });
            });
    })
    },
    login: (email, password) => {
        const source = url + '/api/users/login';
        var data = {
            email: email,
            password: password
        };
        return new Promise((resolve, reject) => {
            axios.post(source, data)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject({ error });
                });
        })
    },
    getUserList: () => {
        const source = url + '/api/users/list';
        return new Promise((resolve, reject) => {
            //const lookupData = localStorage.getItem('lookupData');
            // if (!lookupData) {
            axios.get(source)
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (error) {
                    reject({ error })
                });
            // } else {
            //     resolve(JSON.parse(lookupData));
            // }
        })
    },
    updateUser: (user, task) => {
        const source = url + '/api/users/update';
        if(task == 'update_popup_notification_time'){
            details = user;
        }
        else{
            var details = {
                user_id: user.user_id,
                data: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    persona: user.persona,
                    email: user.email,
                    mobile_number: user.mobile_number,
                    last_login_at: user.last_login_at
                }
            };
        }
        return new Promise((resolve, reject) => {
            axios.post(source, details)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
        })
    },
    deleteUser: (id) => {
        const source = url + '/api/users/delete';
        var data = {
            user_id: id,
        }
        return new Promise((resolve, reject) => {
            axios.post(source, data)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
        })
    },
    digits(number) {
        return number < 10 ? '0' + number : number;
    },
    getDateString(Date_){
        var DateObj = new Date(Date_);
        return (appManager.digits(parseInt(DateObj.getMonth()) + 1)+'/'+appManager.digits(parseInt(DateObj.getDate()))+'/'+DateObj.getFullYear());
    },
    getFromTime(time){
        var from_time = time;
        from_time.setHours(appManager.lastTime - appManager.time_difference);
        from_time.setMinutes(0);
        from_time.setSeconds(0);
        from_time= from_time.toISOString();
        return from_time;
    },
    getToTime(time){
        var to_time = time;
        to_time.setHours(appManager.lastTime);
        to_time.setMinutes(0);
        to_time.setSeconds(0);
        to_time= to_time.toISOString();
        return to_time;
    },
    getNotificationSentTime(time){
        var notificationTime = new Date(time);
        console.log(notificationTime);
        var clock = appManager.getDifferenceTime(notificationTime.getHours(), notificationTime.getMinutes());
        console.log('minutes: '+clock.getMinutes());
        if(clock.getHours() > 0){
            return clock.getHours()+' hours ago';
        }
        else if(clock.getHours() <= 0 && clock.getMinutes() > 10){
            return clock.getMinutes()+ ' mins ago';
        }
        else{
            return 'few minutes ago'
        }
    },
    getDifferenceTime(h, m){
        var presentTime = new Date();
        presentTime.setHours(presentTime.getHours()-h);
        presentTime.setMinutes(presentTime.getMinutes()-m);
        return presentTime;
    }
    // state_list: [
    //     {
    //         "@context": [
    //           "http://www.w3.org/ns/anno.jsonld",
    //           "http://iiif.io/api/presentation//context.json"
    //         ],
    //         "id": "https://example.org/iiif/book1/manifest",
    //         "type": "Manifest",
    //         "label": { "en": [ "Image 1" ] },
    //         "items": [
    //           {
    //             "id": "https://example.org/iiif/book1/canvas/p1",
    //             "type": "Canvas",
    //             "height": 1800,
    //             "width": 1200,
    //             "items": [
    //               {
    //                 "id": "https://example.org/iiif/book1/page/p1/1",
    //                 "type": "AnnotationPage",
    //                 "items": [
    //                   {
    //                     "id": "https://example.org/iiif/book1/annotation/p0001-image",
    //                     "type": "Annotation",
    //                     "motivation": "painting",
    //                     "body": {
    //                       "id": "http://iiif.io/api/presentation/2.1/example/fixtures/resources/page1-full.png",
    //                       "type": "Image",
    //                       "format": "image/png",
    //                       "height": 1800,
    //                       "width": 1200
    //                     },
    //                     "target": "https://example.org/iiif/book1/canvas/p1"
    //                   }
    //                 ]
    //               }
    //             ]
    //           }    
    //         ]
    //     }
    // ]
}

export default appManager;