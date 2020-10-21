import React from "react";
import ReactApexChart from "react-apexcharts";
import Spin from '../../helpers/spin.style';
import ReportsStyleWrapper from './reports.style';
import DatePicker from '../../components/uielements/datePicker';
import moment from "moment";
import { Button } from "antd";
import appManager from "../appManager";
import {connect} from "react-redux";
import { DateRangepicker } from '../../components/uielements/datePicker';
import { Row, Col } from "antd";
import basicStyle from "../../settings/basicStyle";
import Select, { SelectOption } from '../../components/uielements/select';
import './reports.css';


const RangePicker = DateRangepicker;
const Option = SelectOption;
const localeDatePicker = {
    lang: {
      placeholder: 'Select date',
      rangePlaceholder: ['Start date', 'End date'],
      today: 'Today',
      now: 'Now',
      backToToday: 'Back to today',
      ok: 'Ok',
      clear: 'Clear',
      month: 'Month',
      year: 'Year',
    //   timeSelect: 'Select time',
      dateSelect: 'Select date',
      monthSelect: 'Choose a month',
    //   yearSelect: 'Choose a year',
    //   decadeSelect: 'Choose a decade',
      yearFormat: 'YYYY',
      dateFormat: 'M/D/YYYY',
      dayFormat: 'D',
    //   dateTimeFormat: 'M/D/YYYY HH:mm:ss',
      monthFormat: 'MMMM',
      monthBeforeYear: true,
      previousMonth: 'Previous month (PageUp)',
    }
};
const maxSpan_ = {
    maxSpan:{
        "days": 7
    }
}
var previousDate = new Date();
previousDate.setDate(previousDate.getDate() - 2);
class Reports extends React.Component {
    constructor(props){
        super();
        this.state={
            start: moment(previousDate),
            end: moment(new Date()),
            current_zone: '',
            zoneList: [],
            Violationsoptions:{
                chart: {
                    height: 359,
                    type: "line",
                    toolbar: {
                        show: 1
                    },
                    dataLabels: {
                        enabled: !1
                    },
                    colors: ["#556ee6", "#34c38f", "#f1b44c"],
                    legend: {
                        position: "bottom"
                    },
                    noData: {
                        text: "No data",
                        align: 'center',
                        verticalAlign: 'middle',
                    },
                    fill: {
                        opacity: 1
                    },
                }, 
                stroke: {
                    width: [1]
                },
                xaxis: {
                    type: 'datetime',
                    labels: {
                    formatter: function (value, timestamp) {
                        var hours = new Date(timestamp).getHours(), minutes = new Date(timestamp).getMinutes(), seconds = new Date(timestamp).getSeconds();
                        const formattedTime = (hours > 9 ? hours : '0' + hours) + ':' + (minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds);
                        return formattedTime // The formatter function overrides format property
                    },
                    },
                },
            },
            Peopleoptions:{
                chart: {
                    height: 359,
                    type: "line",
                    toolbar: {
                        show: 1
                    },
                    zoom: {
                        enabled: !0
                    },
                    dataLabels: {
                        enabled: !1
                    },
                    colors : ["#FEB019", "#FB4E4E", "#FEB019"],
                    legend: {
                        position: "bottom"
                    },
                    fill: {
                        opacity: 1
                    },
                }, 
                stroke: {
                    width: [1]
                },
                xaxis: {
                    type: 'datetime',
                    labels: {
                    formatter: function (value, timestamp) {
                        var hours = new Date(timestamp).getHours(), minutes = new Date(timestamp).getMinutes(), seconds = new Date(timestamp).getSeconds();
                        const formattedTime = (hours > 9 ? hours : '0' + hours) + ':' + (minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds);
                        return formattedTime // The formatter function overrides format property
                    },
                    },
                },
            },
            Violationseries: [
                { name: "V(date)", type: 'line', data: [] },
              ],
            Peopleseries:[
                { name: "P(date)", type: 'line', data: [] },
            ],
            FromDate: moment(previousDate),
            ToDate: moment(new Date()),
            loader: false
        }
        this.getReports = this.getReports.bind(this);
    }
    componentDidMount(){
        this.getZoneList();
    }
    onChangeFromTimePicker = value => {
        this.setState({
            start: moment(value[0].toDate()),
            end: moment(value[1].toDate())
        })
    };
    setFromDate=(val)=>{
        this.setState({
            FromDate: val
        })
    }
    setToDate=(val)=>{
        this.setState({
            ToDate: val
        })
    }
    getReports=()=>{
        this.setState({
            loader: true
        })
        var violationsList =this.state.Violationseries;
        var peopleList =this.state.Peopleseries;
        var violationsPerDay= [];
        var violations = []
        var peoplePerDay= [];
        var people = []
        const from_time = appManager.getFromTime(new Date(this.state.start));
        const to_time = appManager.getToTime(new Date(this.state.end));
        var uniqueDate = null;
        var presentDate = new Date();
        presentDate = new Date(presentDate.setDate(presentDate.getDate() - 1));
        var previousDateForXaxis = null;
        appManager.getZonePreviousStats(appManager.time_zone, this.state.current_zone, appManager.interval, from_time, to_time).then((data) => {
            uniqueDate = data.length > 0 ? data[0].from_time : null;
            data.length > 0 && data.reduce((something, data_, index_, arr) => {
                var violationDate = new Date(data_.from_time); 
                console.log('date :'+ violationDate.getDate()+', time :'+ violationDate.getHours()+':'+violationDate.getMinutes());
                if (!(this.getDiffInDays(uniqueDate, violationDate))){ // if the date are different then push the complete array into main array
                    violations.push([violationsPerDay, 
                        previousDateForXaxis.getMonth()+1+'/'+previousDateForXaxis.getDate()+'/'+previousDateForXaxis.getFullYear()]);
                    uniqueDate = violationDate;
                    violationsPerDay = [];
                    people.push([peoplePerDay,  previousDateForXaxis.getMonth()+1+'/'+previousDateForXaxis.getDate()+'/'+previousDateForXaxis.getFullYear()]);
                    peoplePerDay =[];
                }
                else if(this.getDiffInDays(uniqueDate, violationDate)){ 
                    presentDate = new Date(presentDate.setHours(violationDate.getHours()));  
                    presentDate = new Date(presentDate.setMinutes(violationDate.getMinutes()));  
                    presentDate = new Date(presentDate.setSeconds(violationDate.getSeconds()));    //check if it is in the same date and push it to an array
                    violationsPerDay.push([presentDate.getTime(), data_.stats.violations]);
                    peoplePerDay.push([presentDate.getTime(), data_.stats.people]);
                    previousDateForXaxis = violationDate;
                }
                // violationsPerDay.push([violationDate.getTime(), data_.stats.violations]);
                if(index_ === arr.length - 1 && violationsPerDay.length > 0){
                    violations.push([violationsPerDay, 
                        previousDateForXaxis.getMonth()+1+'/'+previousDateForXaxis.getDate()+'/'+previousDateForXaxis.getFullYear()]);
                }
                if(index_ === arr.length - 1 && peoplePerDay.length > 0){
                    people.push([peoplePerDay, previousDateForXaxis.getMonth()+1+'/'+previousDateForXaxis.getDate()+'/'+previousDateForXaxis.getFullYear()]); 
                }
                // violations.push(data_.stats.violations);
                // return violationsPerDay; 
            }, [])
            var violationsList_ = [];
            var violationSeries_ = {};
              if(violations.length == 1){
                violationSeries_.name = "V ("+violations[0][1]+")";
                violationSeries_.type = "line";
                violationSeries_.data = violations[0][0];
                violationsList_.push(violationSeries_);
              }
              else{
                violations.map((violations_, index) =>{
                    violationSeries_.name = 'V ('+violations_[1]+")";
                    violationSeries_.type = "line";
                    violationSeries_.data = violations_[0];
                    violationsList_.push(violationSeries_);
                    violationSeries_ = {};
                })
              }  
              violationsList = violationsList_;
              var peopleSeries_ = {};
              var peopleList_ = [];
              if(people.length == 1){
                peopleSeries_.name = "P ("+people[0][1]+")";
                // peopleSeries_.type = "line";
                peopleSeries_.data = people[0][0];
                peopleList_.push(peopleSeries_);
              }
              else{
                people.map((people_, index) =>{
                    peopleSeries_.name = 'P ('+people_[1]+")";
                    // peopleSeries_.type = "line";
                    peopleSeries_.data = people_[0];
                    peopleList_.push(peopleSeries_);
                    peopleSeries_ = {};
                })
              }  
              peopleList = peopleList_;
    // list.selectedZone = e;
        this.setViolationSeries(violationsList);
        this.setPeopleSeries(peopleList);
        })
    }
    getDiffInDays=(d1, d2)=>{
        if(d1 && d2){
          var milliSecInDay = (new Date(d1)).getDate() ===  (new Date(d2)).getDate();
        return milliSecInDay;
      }
    }
    setPeopleSeries = (peopleList) => {
        var options =this.state.Peopleoptions;
        // options.xaxis= {
        //     labels: {             
        //       formatter: function(value, timestamp, index) {
        //         debugger; 
        //         return moment(new Date(timestamp)).format("hh:mm")
        //       }
        //     }
        //   }
        options.yaxis = [
          {
            showAlways: true,
            seriesName: 'People',
            decimalsInFloat: 1,
            title: {
                text: "People",
                style: {
                color: '#9ba3bb',
                }
            },
            // max: function (max) { return getMax(liveInteractions) + getMax(realTime_no_of_people) < 10 ? 10 : getMax(liveInteractions) + getMax(realTime_no_of_people) },
            axisBorder: {
                show: true,
                color: '#bfc8e2'
            },
            labels: {
                align:"center",
                style: {
                colors: '#bfc8e2',
                }
            },
            },
        ];
        var colors = [];
        peopleList.forEach((item) => colors.push(this.getRandomColor()));
        options.colors = colors;
        this.setState({
            Peopleseries: peopleList,
            Peopleoptions: options, 
            loader: false
        })
    }
    getRandomColor=()=>{
        var characters = "0123456789ABCDEF";
        var color = '#';
      
        for (var i = 0; i < 6; i++) {
          color += characters[this.getRandomNumber(3, 12)];
        }
        
        return color;
      }
    getRandomNumber=(low, high)=> {
        var r = Math.floor(Math.random() * (high - low + 1)) + low;
        return r;
    }
    setViolationSeries = (violationsList) => {
        var options = this.state.Violationsoptions;
        // options.xaxis= {
        //     labels: {             
        //       formatter: function(value, timestamp, index) {
        //         debugger; 
        //         return moment(new Date(timestamp)).format("hh:mm")
        //       }
        //     }
        //   }
        options.chart.toolbar = {
            export: {
            csv: {
                filename: 'cogai',
                columnDelimiter: ',',
                headerCategory: 'category',
                headerValue: 'value',
                dateFormatter(timestamp, x, y, z) {
                return new Date(timestamp).toDateString()
                }
            }
            },
        };
        options.yaxis = [
            {
                showAlways: true,
                seriesName: 'Violations',
                decimalsInFloat: 1,
                title: {
                  text: "Violations",
                  align: "left",
                  style: {
                    color: '#9ba3bb',
                  }
                },
                // max: function (max) { return getMax(liveInteractions) + getMax(realTime_no_of_people) < 10 ? 10 : getMax(liveInteractions) + getMax(realTime_no_of_people) },
    
                axisBorder: {
                  show: true,
                  color: '#bfc8e2'
                },
                labels: {
                  align:"center",
                  style: {
                    colors: '#bfc8e2',
                  }
                },
              },
        ];
        this.setState({
            Violationseries: violationsList,
            Violationsoptions: options,
            loader: false
        })
    }
    getZoneList = () => {
        this.setState({
            loader: true
        })
        if (this.props.zone_list.length > 0) {
            this.setState({
                zoneList: this.props.zone_list,
                zone: this.props.zone_list[0].zone_id,
                current_zone:  this.props.zone_list[0].zone_id
            }, () => {this.getReports()})
        }
        else {
            appManager.getZoneList().then(zones => {
                this.setState({
                    zoneList: zones,
                    zone: zones[0].zone_id,
                    current_zone:  zones[0].zone_id
                }, () => {this.getReports()})
            })
        }
    }
    onZoneChange=(e)=>{
        this.setState({
            current_zone: e
        })
    }
    render(){
        const { rowStyle, colStyle, gutter } = basicStyle;
        const {FromDate, ToDate, options, series, start, end, zoneList, zone} = this.state;
        return (
            <ReportsStyleWrapper>
            <div style={{ width: '100%' }}>
                <Spin spinning={this.state.loader} size="large">
                <div className="page_header">
                    <h4>Reports</h4>
                    <span>CogAi / Reports</span>
                </div>
                <div className="body_">
                    <div className="date_componentWrapper">
                        {/* <span className="date_text">From: </span>
                    <DatePicker
                    allowClear={false}
                    value={FromDate}
                    onChange={val => {
                      this.setFromDate(val);
                    }}
                    format="MM/DD/YYYY"
                    disabledDate={(current) => { return moment().add(0, 'days') <= current }}
                    animateYearScrolling={true}
                />
                  <span className="date_text">To:</span>
                    <DatePicker
                    allowClear={false}
                    value={ToDate}
                    onChange={val => {
                      this.setToDate(val);
                    }}
                    editableDateInputs
                    format="MM/DD/YYYY"
                    disabledDate={(current) => { return moment().add(0, 'days') <= current }}
                    animateYearScrolling={true}
                  /> */}
                  <div>
                  <RangePicker
                    singleDatePicker = {true}
                    locale={localeDatePicker}
                    disabledDate={(current) => { return moment().add(0, 'days') < current }}
                    value={[start, end]}
                    format="YYYY/MM/DD"
                    onChange={this.onChangeFromTimePicker}
                    // maxDate= {moment().subtract(13, 'days')}
                />
                  <Button type="primary" onClick={this.getReports}>Get Reports</Button>
                  </div>
                    <div>
                        <Select className="zone_dropdown" value={this.state.current_zone} name="zones" placeholder="Zones" onChange={this.onZoneChange}>
                            {zoneList.length > 0 && zoneList.map((zone, index) => {
                                return (
                                    <Option key={zone.zone_id}>{zone.zone_name}</Option>
                                )
                            }
                            )}
                        </Select>
                    </div>
                  </div>
                  
              <Row style={rowStyle} glutter={0} justify="start" >
                <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
                    <div className="graph_header">Violations</div>
                    <ReactApexChart
                        options={this.state.Violationsoptions}
                        series={this.state.Violationseries}
                        type="line"
                        key={JSON.stringify(this.state.Violationseries)}
                        height="359"
                    />
                </Col>
                <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
                    <div className="graph_header">Number of People</div>
                    <ReactApexChart
                        options={this.state.Peopleoptions}
                        series={this.state.Peopleseries}
                        type="line"
                        key={JSON.stringify(this.state.Peopleseries)}
                        height="359"
                    />
                    </Col>
                </Row>
                </div>
                </Spin>
            </div>
            </ReportsStyleWrapper>
        )
    }
}


function mapStateToProps(state) {
    const { zone_list } = state.ZonesReducer;
    return {
        zone_list,
    };
  }
  export default connect(mapStateToProps)(Reports);