import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//import Charts
import StackedColumnChart from "./StackedColumnChart";
import violationData from "../../assets/data/violation_data.json";
import moment from "moment";
import { connect } from "react-redux";
import { store } from "../../redux/store";
import DatePicker from '../../components/uielements/datePicker';
import appManager from "../appManager";
import Spin from '../../helpers/spin.style';
import Chart from "react-apexcharts";

var lastUpdatedTime;
var subTime = 30, tenMinCount, PreviousTotalViolations = 0, firstCount = false, presentTime;
var previous_date = new Date();
var initialTime = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const ApexChart = (props) => {
  const [reports, setreports] = useState([
    { title: "Zones", iconClass: "bxs-buildings", description: "3" },
    { title: "Cameras", iconClass: "bx-camera-movie", description: "10" },
    { title: "Average People", iconClass: "bx-user-circle", description: "25" },
  ]);
  const [time, setTime] = useState([
    { title: "Previous", linkto: "#", isActive: false },
    { title: "Today", linkto: "#", isActive: true },
  ]);
  const [options, setOptions] = useState();
  const [loader, setLoader] = useState(false);
  const [PreviousDate, setPreviousDate] = useState(moment(previous_date));
  const [series, setSeries] = useState();
  const [selectedVideos, setSelectedVideos] = useState(
    "https://cog-ai.s3.amazonaws.com/ent2.mp4?autoplay=1"
  );
  const [currentTime, setCurrentTime] = useState(new Date());
  const [realTimecnt, setRealTimecnt] = useState(0);

  store.dispatch({
    type: "TEN_MINS_VIOLATIONS",
    payload: {
      violations_10min: 0
    },
  });
  function chartAttributes(
    no_of_people,
    crossings,
    interactions,
    violationsTime,
    videoLinks,
    xaxis,
    total_people,
    yaxis,
  ) {
    store.dispatch({
      type: "VIDEO_LINKS",
      payload: {
        video_links: videoLinks
      }
    })
    const loptions = {
      chart: {
        height: 359,
        type: "bar",
        stacked: !0,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 300,
          animateGradually: {
            enabled: true,
            delay: 100
          },
          dynamicAnimation: {
            enabled: true,
            speed: 100
          }
        },
        toolbar: {
          show: 1,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
          },
          autoSelected: 'zoom'
        },
        zoom: {
          enabled: true,
        },
        events: {
          dataPointSelection: (event, chartContext, config) => {
            store.dispatch({
              type: "SELECTEDSTAT",
              payload: {
                violations: config.w.globals.initialSeries.filter(series_ => series_.name === "Violations")[0].data[config.dataPointIndex][1],
                video: props.video_links[config.dataPointIndex],
              },
            });
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: !1,
          columnWidth: "20%",
        },
      },
      dataLabels: {
        enabled: !1,
      },
      stroke: {
        width: [1, 2]
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
      yaxis: yaxis,
      colors: ["#FB4E4E", "#FEB019"],
      legend: {
        position: "bottom",
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        shared: true,
        followCursor: true,
      },
    };
    if (time[0].isActive && !time[1].isActive) {
      setSeries([
        { name: "Violations", type: 'bar', data: interactions },
      ]);
    }
    else {
      setSeries([
        { name: "Violations", type: 'bar', data: interactions },

        { name: "Cumulative number of people", type: 'line', data: total_people },
      ]);
    }
    setOptions(loptions);
  }
  var xaxis = [],
    yaxis = [],
    realTime_no_of_people = [],
    total_people = [],
    violationsTime = [],
    videoLinks = [],
    liveInteractions = [],
    liveTimeCrossings = [],
    realTimeInteractions = [],
    realTimeViolations = [],
    realTimeCrossings = [];

  useEffect(() => {
    if (time[0].isActive && !time[1].isActive) {
      setRealTimecnt(0);
      setLoader(true);
      let fromTime = appManager.getFromTime(new Date(PreviousDate)), toTime = appManager.getToTime(new Date(PreviousDate));
      var previousViolationData = [],
        xaxis = [],
        yaxis = [],
        no_of_people = [],
        violationsTime = [],
        videoLinks = [],
        total_people = [];
      let cnt = 0;
      appManager.getZonePreviousStats(appManager.time_zone, props.current_zone, appManager.interval, fromTime, toTime).then((data) => {
        data.length > 0 && data.forEach(data_ => {
          previousViolationData.push(data_);
        })
        previousViolationData && previousViolationData.forEach((violation, key) => {
          realTimeCrossings.push(violation.stats.crossings);
          var time = new Date(violation.from_time);
          realTimeInteractions.push([time.getTime(), violation.stats.violations]);
          no_of_people.push([time.getTime(), violation.stats.people]);
          videoLinks.push(violation.video_link);
          xaxis.push(time);
          violationsTime.push(time);
          cnt += 1;
        });
        yaxis = [
          {
            seriesName: 'Violations',
            decimalsInFloat: 1,
            title: {
              text: "Violations",
              style: {
                color: '#FB4E4E',
              }
            },
            max: function (max) { return getMax(realTimeInteractions) + getMax(no_of_people) < 10 ? 10 : getMax(realTimeInteractions) + getMax(no_of_people) },

            axisBorder: {
              show: true,
              color: '#bfc8e2'
            },
            labels: {
              style: {
                colors: '#bfc8e2',
              }
            },
          },
        ];
        setLoader(false);
        chartAttributes(
          no_of_people,
          realTimeCrossings,
          realTimeInteractions,
          violationsTime,
          videoLinks,
          xaxis,
          [],
          yaxis
        );
      });

    } else if (!time[0].isActive && time[1].isActive) {
      store.dispatch({
      type: "TOTAL_VIOLATIONS",
      payload: {
        total_violation_today: 0
      },
    });
      firstCount = true
      lastUpdatedTime = new Date();
      lastUpdatedTime.setMinutes(lastUpdatedTime.getMinutes() - subTime);
      tenMinCount = lastUpdatedTime;
      var lastTenMinsTime = lastUpdatedTime;
      // initialTime = new Date();
      // initialTime.setMinutes(initialTime.getMinutes() - 10);
      setLoader(true);
      // var cnt = 1;
      lastTenMinsTime = new Date(lastTenMinsTime.setMinutes(lastTenMinsTime.getMinutes() - (subTime - 10)));
      appManager.getZoneTodayStats(lastTenMinsTime, props.current_zone).then((data) => {
        if(data.length > 0)
        PreviousTotalViolations = data[data.length - 1].stats.total_violations;
      });
      getSeries();
      const interval = setInterval(() => {
        // cnt++;
        getSeries();
      }, 10 * 1000);
      return () => clearInterval(interval);
    }
  }, [props.zonesettings, currentTime]);
  function timeDiffInMin(from_, to_) { 
    var dif = (to_ - from_); 
    return Math.round((dif/1000)/60); 
  }
  function getMax(array) {
    return Math.max.apply(Math, array.map(function (o) { return o[1]; }))
  }
  function getSeries() {
    realTimeViolations = [];
    presentTime = new Date();
    appManager.getZoneTodayStats(lastUpdatedTime, props.current_zone).then((data) => {
      data.length > 0 && data.forEach((data_, key) => {
        realTimeViolations.push(data_);
      })
      if (data.length > 0) {
        store.dispatch({
          type: "TOTAL_VIOLATIONS",
          payload: {
            total_violation_today: data[data.length - 1].stats.total_violations
          },
        });
        //last 10 minutes data to show at the top
        if((timeDiffInMin(tenMinCount, presentTime) >= 1) || firstCount){
          firstCount = false;
          tenMinCount = lastUpdatedTime;
          store.dispatch({
            type: "TEN_MINS_VIOLATIONS",
            payload: {
              violations_10min: PreviousTotalViolations === 0 ? data[data.length - 1].stats.total_violations : data[data.length - 1].stats.total_violations - PreviousTotalViolations
            },
          });
          PreviousTotalViolations = data[data.length - 1].stats.total_violations;
        }
        realTimeViolations.forEach((violation, key) => {
          liveTimeCrossings.push(violation.stats.crossings);
          var time = new Date(violation.from_time);
          liveInteractions.push([time.getTime(), violation.stats.violations]);
          lastUpdatedTime = (new Date(violation.to_time) > lastUpdatedTime) ? new Date(violation.to_time) : lastUpdatedTime;
          realTime_no_of_people.push([time.getTime(), violation.stats.people]);
          videoLinks.push(violation.video_link + '');
          xaxis.push(time);
          violationsTime.push(time);
          total_people.push([time.getTime(), violation.stats.total_people]);
        });
        yaxis = [
          {
            seriesName: 'Violations',
            decimalsInFloat: 1,
            title: {
              text: "Violations",
              style: {
                color: '#FB4E4E',
              }
            },
            max: function (max) { return getMax(liveInteractions) + getMax(realTime_no_of_people) < 10 ? 10 : getMax(liveInteractions) + getMax(realTime_no_of_people) },

            axisBorder: {
              show: true,
              color: '#bfc8e2'
            },
            labels: {
              style: {
                colors: '#bfc8e2',
              }
            },
          },
          {
            seriesName: 'Cumulative number of people',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#9ba3bb'
            },
            labels: {
              style: {
                colors: '#FEB019',
              }
            },
            title: {
              text: "Cumulative number of people",
              style: {
                color: '#bfc8e2',
              }
            }
          },
        ];
        if (xaxis.length > 100) {
          xaxis = xaxis.slice(xaxis.length - 100, xaxis.length);
          realTime_no_of_people = realTime_no_of_people.slice(realTime_no_of_people.length - 100, realTime_no_of_people.length);
          videoLinks = videoLinks.slice(videoLinks.length - 100, videoLinks.length);
          liveInteractions = liveInteractions.slice(liveInteractions.length - 100, liveInteractions.length);
          violationsTime = violationsTime.slice(violationsTime.length - 100, violationsTime.length);
          total_people = total_people.slice(total_people.length - 100, total_people.length);
        }
      }

      setLoader(false);
      chartAttributes(
        realTime_no_of_people,
        liveTimeCrossings,
        liveInteractions,
        violationsTime,
        videoLinks,
        xaxis,
        total_people,
        yaxis,
      );
    })
  }
  function onViewChange(key) {
    if (key === 0) {
      time[0].isActive = true;
      time[1].isActive = false;
    }
    if (key === 1) {
      time[0].isActive = false;
      time[1].isActive = true;
      setPreviousDate(moment(new Date()));
    }
    setTime((time) => time);
    setCurrentTime(new Date());
  }

  return (
    <Spin spinning={loader} size="large" style={{ minHeight: '450px' }}>
      <React.Fragment >
        <div className="float-sm-right chart_">
          <div className="previous_date_Wrappper">{monthNames[(new Date(PreviousDate)).getMonth()] + ' ' + (new Date(PreviousDate)).getDate() + ' ' + (new Date(PreviousDate)).getFullYear()}</div>
          <ul className="nav nav-pills">
            {time.map((mail, key) => (
              <li className="nav-item" key={"_li_" + key}>
                <Link
                  className={mail.isActive ? "nav-link active" : "nav-link"}
                  to={mail.linkto}
                  onClick={(event) => key === 1 ? onViewChange(key) : ''}
                >
                  {mail.title}{key === 0 ? <DatePicker
                    allowClear={false}
                    value={PreviousDate}
                    onChange={val => {
                      setPreviousDate(val);
                      onViewChange(key)
                    }}
                    format="MM DD YYYY"
                    disabledDate={(current) => { return moment().add(0, 'days') <= current }}
                    animateYearScrolling={true}
                  /> : ''}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <StackedColumnChart options={options} series={series} type="bar"/>
      </React.Fragment>
    </Spin>
  );
};



function mapStateToProps(state) {
  const { current_time, video_links } = state.DashboardAnalyticsReducer;
  const { current_zone } = state.ZonesReducer;
  return {
    current_time, current_zone, video_links
  };
}
export default connect(mapStateToProps)(ApexChart);
